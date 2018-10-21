import pprint
from flask import Flask, jsonify, request
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

@app.route("/")
def countdowns():
  countdowns = []
  now = datetime.now()
  for countdown in db.countdowns.find( { "happens_at": {"$gt": now} } ):
    countdown.pop("_id", None)
    countdowns.append(countdown)

  return jsonify(countdowns)

@app.route("/countdown/create", methods=['POST'])
def create():
  data = request.get_json()

  date = dateutil.parser.parse(data['date'])
  slug = data['name'].lower()
  slug = re.sub(r"[^a-zA-Z\d\s:]", "-", slug)

  countdown = {
    "name": data['name'],
    "slug": slug,
    "description": data['description'],
    "when": {
      "year": date.year,
      "month": date.month,
      "day": date.day,
      "hour": date.hour,
      "minute": date.minute
    }
  }
  db.countdowns.insert_one(countdown)

  return jsonify({"bob": "saget"})


@app.route("/countdowns/<slug>")
def countdown(slug):
  countdown = db.countdowns.find_one({"slug": slug})
  countdown.pop("_id", None)
  return jsonify(countdown)

if __name__ == "__main__":
  app.run(host='0.0.0.0')
