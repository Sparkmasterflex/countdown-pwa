import pprint
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from datetime import datetime
import dateutil.parser
import re

client = MongoClient('mongo', 27017)

db = client.countdown_development
count = db.countdowns.count()
if count == 0:
  sample_countdown = {
    "slug": "japan-trip",
    "name": "Japan Trip 2018",
    "description": "Jane and I are going to Japan with the guys. Tokyo, Osaka and Kyoto!",
    "when": {
      "year": 2018,
      "month": 10,
      "day": 29,
      "hour": 11,
      "minute": 5
    }
  }

  japan_cd_id = db.countdowns.insert_one(sample_countdown)


app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.before_request
def option_autoreply():
  """ Always reply 200 on OPTIONS request """

  if request.method == 'OPTIONS':
    resp = app.make_default_options_response()

    headers = None
    if 'ACCESS_CONTROL_REQUEST_HEADERS' in request.headers:
      headers = request.headers['ACCESS_CONTROL_REQUEST_HEADERS']

    h = resp.headers

    # Allow the origin which made the XHR
    h['Access-Control-Allow-Origin'] = request.headers['Origin']
    # Allow the actual method
    h['Access-Control-Allow-Methods'] = request.headers['Access-Control-Request-Method']
    # Allow for 10 seconds
    h['Access-Control-Max-Age'] = "10"

    # We also keep current headers
    if headers is not None:
      h['Access-Control-Allow-Headers'] = headers

    return resp

@app.after_request
def set_allow_origin(resp):
  """ Set origin for GET, POST, PUT, DELETE requests """

  h = resp.headers

  # Allow crossdomain for other HTTP Verbs
  if request.method != 'OPTIONS' and 'Origin' in request.headers:
      h['Access-Control-Allow-Origin'] = request.headers['Origin']

  return resp

class CountDown(Resource):
  @cross_origin()
  def get(self, slug = None):
    if slug:
      countdown = db.countdowns.find_one({"slug": slug})
      countdown.pop("_id", None)
      return jsonify(countdown)
    else:
      countdowns = []
      now = datetime.now()
      for countdown in db.countdowns.find( { "happens_at": {"$gt": now} } ):
        countdown.pop("_id", None)
        countdowns.append(countdown)

      return jsonify(countdowns)

  @cross_origin()
  def post(self):
    countdown = self.__build_data( request.get_json() )
    pprint.pprint(countdown)
    db.countdowns.insert_one( countdown )
    countdown.pop("_id", None)
    return jsonify(countdown)

  @cross_origin()
  def put(self, slug = None):
    cd = db.countdowns.find_one({"slug": slug})

    if slug and cd:
      countdown = self.__build_data( request.get_json() )
      db.countdowns.update_one( {'slug': countdown['slug']}, {'$set': countdown} )

      countdown.pop("_id", None)
      return jsonify(countdown)
    else:
      return jsonify({'fail': True})

  @cross_origin()
  def delete(self, slug = None):
    if slug:
      db.countdowns.delete_one({"slug": slug})
      return jsonify({"deleted": True})

  def __build_data(self, data):
    date = dateutil.parser.parse(data['date'])
    if 'slug' in data and data['slug'] != "":
      slug = data['slug']
    else:
      sl = data['name'].lower()
      slug = re.sub(r"[^a-zA-Z\d]", "-", sl)

    return {
      "name": data['name'],
      "slug": slug,
      "description": data['description'],
      "when": {
        "year": date.year,
        "month": date.month,
        "day": date.day,
        "hour": date.hour,
        "minute": date.minute
      },
      "happens_at": date
    }



api.add_resource(CountDown,
  '/',
  '/<string:slug>',
  '/create',
  '/<string:slug>/update',
  '/<string:slug>/delete'
)
# abort(404, message="Todo {} doesn't exist".format(todo_id))

# @app.route("/countdown/create", methods=['POST'])
# def create():

# @app.route("/countdowns/<slug>")
# def countdown(slug):

if __name__ == "__main__":
  app.run(host='0.0.0.0')
