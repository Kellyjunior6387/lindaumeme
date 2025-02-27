from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from models import db, User, ConsumptionData, bcrypt
import requests, africastalking
import os
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

API_KEY = os.getenv("AT_API_KEY")
USERNAME = os.getenv("AT_USERNAME")
THRESHOLD = 800  # Overuse limit in Watts

CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

africastalking.initialize(
    USERNAME,
    API_KEY
    )
sms = africastalking.SMS
# Route to create a user
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    phone_number = data.get("phone_number")

    if not all([username, email, password, phone_number]):
        return jsonify({"error": "Missing fields"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(username=username, email=email, phone_number=phone_number)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Route to log power usage
@app.route("/data", methods=["POST"])
def log_consumption():
    data = request.json
    user_id = data.get("user_id")
    consumption = data.get("consumption_data")

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_entry = ConsumptionData(consumption_data=consumption, user_id=user_id)
    db.session.add(new_entry)
    db.session.commit()
    if consumption > THRESHOLD:
        send_alert(user.phone_number, f" Overuse Alert! Your consumption is {consumption - THRESHOLD}W above normal")
    
    return jsonify({"message": "Data logged successfully"}), 201
# Africa's Talking SMS API
def send_alert(phone, message):
    try:
        response = sms.send(
            message=message,
            recipients=[phone],
            sender_id="AFTKNG"  # your Alphanumeric sender ID
        )  

        return jsonify({"status": "success", "data": response}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred while sending SMS", "error": str(e)}), 500

# Route to get user logs
@app.route("/logs/<int:user_id>", methods=["GET"])
def get_logs(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    logs = ConsumptionData.query.filter_by(user_id=user_id).order_by(ConsumptionData.timestamp.desc()).limit(10).all()
    return jsonify([{"timestamp": log.timestamp, "consumption_value": log.consumption_data} for log in logs])

#route to send sms
@app.route('/send-sms', methods=['POST'])
def send_sms():
    data = request.get_json()
    phone_number = data.get("phoneNumber")

    if not phone_number:
        return jsonify({"message": "Phone number not found"}), 400

    try:
        response = sms.send(
            message="Hello from AfricasTalking!",
            recipients=[phone_number],
            sender_id="AFTKNG"  # your Alphanumeric sender ID
        )  

        return jsonify({"status": "success", "data": response}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred while sending SMS", "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
