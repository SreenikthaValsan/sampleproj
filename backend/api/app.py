from flask import (
    Flask,
    request,
    jsonify,
    Response,   
)
from flask_cors import CORS
import json
from bin.Application import Application

app = Flask(__name__)
CORS(app) 

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add("X-Content-Type-Options", "nosniff")
    return response

# input_payload = json.loads(request.data)
#     show_doc = input_payload.get("showDocuments", False)

@app.route("/getCalendarData", methods=["POST"])
def get_calendar_data():
    response = Application.get_calendar_data()
    return response

@app.route("/dashboardStats", methods=["POST"])
def dashboard_stats():
    input_payload = json.loads(request.data)
    print(input_payload)
    response = Application.dashboard_stats()
    return response

@app.route("/getTeamUsers", methods=["POST"])
def get_team_users():
    response = Application.get_team_users()
    return response

@app.route("/getCounts", methods=["POST"])
def get_counts():
    response = Application.get_counts()
    return response

@app.route("/listings/portalCounts", methods=["POST"])
def portal_counts():
    response = Application.portal_counts()
    return response

@app.route("/getListings", methods=["POST"])
def get_listings():
    response = Application.get_listings()
    return response

@app.route("/getLeads", methods=["POST"])
def get_leads():
    response = Application.get_leads()
    return response

@app.route("/communities/getList", methods=["POST"])
def get_list():
    response = Application.get_list()
    return response

@app.route("/getContacts", methods=["POST"])
def get_contacts():
    response = Application.get_contacts()
    return response






if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)