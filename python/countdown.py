import pprint
from flask import Flask
from flask import jsonify
from flask_cors import CORS
from pymongo import MongoClient

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

@app.route("/")
def countdowns():
  countdowns = []
  for countdown in db.countdowns.find():
    countdown.pop("_id", None)
    countdowns.append(countdown)

  return jsonify(countdowns)

@app.route("/countdowns/<slug>")
def countdown(slug):
  countdown = db.countdowns.find_one({"slug": slug})
  countdown.pop("_id", None)
  return jsonify(countdown)

if __name__ == "__main__":
  app.run(host='0.0.0.0')
