from flask import Flask, request, jsonify
import os.path
import datetime
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar"]

def create_calendar_event(event_data):
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)

        with open("token.json", "w") as token:
            token.write(creds.to_json())

    service = build("calendar", "v3", credentials=creds)

    try:
        event = {
            "summary": event_data["summary"],
            "location": event_data.get("location", ""),
            "description": event_data.get("description", ""),
            "start": {"dateTime": event_data["startDateTime"], "timeZone": event_data["timeZone"]},
            "end": {"dateTime": event_data["endDateTime"], "timeZone": event_data["timeZone"]},
            "recurrence": event_data.get("recurrence", []),
            "attendees": event_data.get("attendees", []),
            "reminders": event_data.get("reminders", {})
        }

        event = service.events().insert(calendarId="primary", body=event).execute()
        return event.get("htmlLink")

    except HttpError as error:
        return str(error)

@app.route("/create-event", methods=["POST"])
def handle_create_event():
    event_data = request.json
    link = create_calendar_event(event_data)
    if link:
        return jsonify({"success": True, "eventLink": link}), 200
    else:
        return jsonify({"success": False, "error": "Failed to create event"}), 500

@app.route("/")
def index():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)
