import os
import random
import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_session import Session
from sqlalchemy import create_engine, text
from sqlalchemy.orm import scoped_session, sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)

# Environment Variable Checks
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")
if not os.getenv("JWT_TOKEN"):
    raise RuntimeError("JWT_TOKEN is not set")

# Session Setup (optional)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# JWT Setup
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_TOKEN")
jwt = JWTManager(app)

# Database Setup
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
db = scoped_session(sessionmaker(bind=engine))

# Gemini API Key (optional for future AI use)
gemini_key = os.getenv("GEMINI_API_KEY")
gemini_url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}'


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")   # from React input
    email = data.get("email")
    password = data.get("password")
    print(name, email, password)

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    check_sql = text("SELECT email FROM users WHERE email = :email")
    insert_sql = text("""
        INSERT INTO users (email, username, password)
        VALUES (:email, :username, :password)
        RETURNING email, username, email
    """)

    with engine.connect() as conn:
        if conn.execute(check_sql, {"email": email}).fetchone():
            return jsonify({"error": "Email already registered"}), 400

        hashed_pw = generate_password_hash(password)

        try:
            result = conn.execute(insert_sql, {
                "email": email,
                "username": name,
                "password": hashed_pw,
            })
            user = result.fetchone()
            conn.commit()
            return jsonify({
                "message": "Registration successful",
                "user": {
                    "username": user[0],
                    "email": user[1],
                }
            }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    sql = text(
        "SELECT username, email, password FROM users WHERE email = :email")

    with engine.connect() as conn:
        user = conn.execute(sql, {"email": email}).fetchone()
        print(user)
        if user and check_password_hash(user[2], password):
            token = create_access_token(identity=email)
            print(user[0], user[1], user[2])
            return jsonify({
                "message": "Login successful",
                "user": {
                    "username": user[0],
                    "email": user[1],
                    "access_token": token
                }
            }), 200

    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/users", methods=["GET"])
def get_number_of_users():
    sql = text("SELECT * FROM users")
    with engine.connect() as conn:
        result = conn.execute(sql).fetchall()
        num_users = len([dict(row._mapping) for row in result])
        return jsonify(num_users), 200


def geocode_address(address):

    if not address:
        return jsonify({'error': 'Address is required'}), 400

    api_key = os.getenv('OPENCAGE_API_KEY')
    url = f'https://api.opencagedata.com/geocode/v1/json?q={address}&key={api_key}'

    try:
        response = requests.get(url)
        results = response.json().get('results')

        if not results:
            return jsonify({'error': 'No results found'}), 404

        coords = results[0]['geometry']
        print(coords)
        return json.dumps({
            'location': [coords['lat'], coords['lng']],
            'address': address
        })

    except Exception as e:
        print(e)
        return jsonify({'error': 'Geocoding failed', 'details': str(e)}), 500


@app.route("/donations", methods=["POST"])
def create_donation():
    data = request.get_json()
    donation_id = random.randint(100000, 999999)
    location = geocode_address(data.get("location"))

    print(location)

    get_user_sql = text("SELECT email FROM users WHERE email = :email")
    insert_sql = text("""
        INSERT INTO donations (donor, donation_id, type, title, location, description, pickup_time, is_booked, is_completed)
        VALUES (:donor, :donation_id, :type, :title, :location, :description, :pickup_time, :is_booked, :is_completed)
        RETURNING donor, donation_id, type, title, location, description, pickup_time, is_booked, is_completed
    """)
    '''Only add receiver once it is booked by them, so receiver is optional field'''
    with engine.connect() as conn:
        user = conn.execute(
            get_user_sql, {"email": data.get("donor")}).fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404

        try:
            result = conn.execute(insert_sql, {
                "donor": data.get("donor"),
                "donation_id": donation_id,
                "type": data.get("type"),
                "title": data.get("title"),
                "location": location,
                "description": data.get("description"),
                "pickup_time": data.get("pickupTime"),
                "is_booked": False,
                "is_completed": False
            })
            donation = result.fetchone()
            conn.commit()
            return jsonify(dict(donation._mapping)), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route("/donations", methods=["GET"])
def get_all_donations():
    sql = text("SELECT * FROM donations")
    with engine.connect() as conn:
        result = conn.execute(sql).fetchall()
        donations = [dict(row._mapping) for row in result]
        return jsonify(donations), 200


@app.route("/donations/<donation_id>", methods=["GET"])
def get_single_donation(donation_id):
    sql = text("SELECT * FROM donations WHERE donation_id = :id")
    with engine.connect() as conn:
        row = conn.execute(sql, {"id": donation_id}).fetchone()
        if row:
            return jsonify(dict(row._mapping)), 200
        return jsonify({"error": "Donation not found"}), 404


@app.route("/donations/<int:donation_id>", methods=["PUT"])
def update_donation(donation_id):
    data = request.get_json()
    sql = text("""
        UPDATE donations
        SET title = :title,
            location = :location,
            description = :description,
            pickup_time = :pickup_time
        WHERE donation_id = :id
        RETURNING *
    """)
    with engine.connect() as conn:
        try:
            result = conn.execute(sql, {
                "id": donation_id,
                "title": data.get("title"),
                "location": data.get("location"),
                "description": data.get("description"),
                "pickup_time": data.get("pickupTime"),
            })
            donation = result.fetchone()
            conn.commit()
            if donation:
                return jsonify(dict(donation._mapping)), 200
            else:
                return jsonify({"error": "Donation not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route("/donations/<int:donation_id>", methods=["DELETE"])
@jwt_required()
def delete_donation(donation_id):
    sql = text("DELETE FROM donations WHERE donation_id = :id RETURNING *")
    with engine.connect() as conn:
        result = conn.execute(sql, {"id": donation_id})
        deleted = result.fetchone()
        conn.commit()
        if deleted:
            return jsonify({"message": "Donation deleted"}), 200
        else:
            return jsonify({"error": "Donation not found"}), 404


@app.route("/receivers", methods=["POST"])
@jwt_required()
def create_receiver():
    data = request.get_json()
    user_email = get_jwt_identity()

    get_user_sql = text("SELECT id FROM users WHERE email = :email")
    insert_sql = text("""
        INSERT INTO receivers (donation_id, user_id, name, location, pickup_time)
        VALUES (:donation_id, :user_id, :name, :location, :pickup_time)
        RETURNING receiver_id, donation_id, user_id, name, location, pickup_time
    """)

    with engine.connect() as conn:
        user = conn.execute(get_user_sql, {"email": user_email}).fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404

        try:
            result = conn.execute(insert_sql, {
                "donation_id": data.get("donation_id"),
                "user_id": user[0],
                "name": data.get("name"),
                "location": data.get("location"),
                "pickup_time": data.get("pickup_time"),
            })
            receiver = result.fetchone()
            conn.commit()
            return jsonify(dict(receiver._mapping)), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route("/receivers", methods=["GET"])
@jwt_required()
def get_all_receivers():
    sql = text("SELECT * FROM receivers ORDER BY pickup_time DESC")
    with engine.connect() as conn:
        result = conn.execute(sql).fetchall()
        receivers = [dict(row._mapping) for row in result]
        return jsonify(receivers), 200


@app.route("/receivers/<int:receiver_id>", methods=["GET"])
@jwt_required()
def get_receiver(receiver_id):
    sql = text("SELECT * FROM receivers WHERE receiver_id = :id")
    with engine.connect() as conn:
        row = conn.execute(sql, {"id": receiver_id}).fetchone()
        if row:
            return jsonify(dict(row._mapping)), 200
        return jsonify({"error": "Receiver not found"}), 404


@app.route("/receivers/<int:receiver_id>", methods=["PUT"])
@jwt_required()
def update_receiver(receiver_id):
    data = request.get_json()
    sql = text("""
        UPDATE receivers
        SET name = :name,
            location = :location,
            pickup_time = :pickup_time
        WHERE receiver_id = :id
        RETURNING *
    """)
    with engine.connect() as conn:
        try:
            result = conn.execute(sql, {
                "id": receiver_id,
                "name": data.get("name"),
                "location": data.get("location"),
                "pickup_time": data.get("pickup_time"),
            })
            receiver = result.fetchone()
            conn.commit()
            if receiver:
                return jsonify(dict(receiver._mapping)), 200
            return jsonify({"error": "Receiver not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@app.route("/receivers/<int:receiver_id>", methods=["DELETE"])
@jwt_required()
def delete_receiver(receiver_id):
    sql = text("DELETE FROM receivers WHERE receiver_id = :id RETURNING *")
    with engine.connect() as conn:
        result = conn.execute(sql, {"id": receiver_id})
        deleted = result.fetchone()
        conn.commit()
        if deleted:
            return jsonify({"message": "Receiver deleted"}), 200
        return jsonify({"error": "Receiver not found"}), 404


if __name__ == "__main__":
    from sqlalchemy import MetaData, Table

    # # Optional: Create table if not exists (only for quick local testing)
    # metadata = MetaData()
    # metadata.reflect(bind=engine)
    # if "users" not in metadata.tables:
    #     with engine.connect() as conn:
    #         conn.execute(text("""
    #             CREATE TABLE users (
    #                 id SERIAL PRIMARY KEY,
    #                 email VARCHAR(255) UNIQUE NOT NULL,
    #                 username VARCHAR(255) NOT NULL,
    #                 password TEXT NOT NULL,
    #                 type VARCHAR(50) DEFAULT 'user'
    #             );
    #         """))
    #         conn.commit()

    app.run(debug=True)
