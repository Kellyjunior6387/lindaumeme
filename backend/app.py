from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from models import db, User, ConsumptionData, bcrypt
import requests

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

API_KEY = "YOUR_AT_API_KEY"
USERNAME = "YOUR_AT_USERNAME"
THRESHOLD = 400  # Overuse limit in Watts

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
    """
    if consumption > THRESHOLD:
        send_alert(user.phone_number, f"⚠️ Overuse Alert! Your consumption is {consumption}W.")
    """
    return jsonify({"message": "Data logged successfully"}), 201
"""
# Africa's Talking SMS API
def send_alert(phone, message):
    url = "https://api.africastalking.com/version1/messaging"
    headers = {"apiKey": API_KEY}
    data = {"username": USERNAME, "to": phone, "message": message}
    response = requests.post(url, headers=headers, data=data)
    return response.json()
"""
if __name__ == "__main__":
    app.run(debug=True)
