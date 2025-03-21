import os
import random
import requests
from flask import Flask, session, jsonify, request
from flask_session import Session
from flask_jwt_extended import JWTManager, create_access_token
from sqlalchemy import create_engine, text
from sqlalchemy.orm import scoped_session, sessionmaker
from google import genai


app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_TOKEN")
jwt = JWTManager(app)
gemini_key = os.getenv("GEMINI_API_KEY")
gemini_url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}'


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    type = data.get('type')
    id = random.randint(100000, 999999)

    print(username, email, password)

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    check_user_sql = text("""

    SELECT id, username, email, password FROM users
    WHERE email= :email
               
    """)

    new_user_insert_sql = text("""

    INSERT INTO 
    users (id, email, username, password, type) 
    VALUES (:id, :email, :username, :password, :type)
    RETURNING id, username, email, type
               
    """)

    with engine.connect() as conn:
        try:
            # Checking if user exist with the same email
            res_check_existing_user = conn.execute(
                check_user_sql, {'email': email})
            existing_user = res_check_existing_user.fetchone()

            if existing_user:
                return jsonify({"error": "Email is already registered"}), 400

            res_new_user = conn.execute(
                new_user_insert_sql, {'id': id, 'email': email, 'username': username, 'password': password, 'type': type})
            user = res_new_user.fetchone()
            conn.commit()

            return jsonify({"message": "User created successfully", "user": {"id": user[0], "username": user[1], "email": user[2]}})

        except Exception as e:
            return jsonify({"Error": str(e)}), 400
        finally:
            conn.close()


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Both email and password are required"}), 400

    sql = text("""

    SELECT id, username, email, password FROM users
    users WHERE email= :email AND password= :password
               
    """)

    with engine.connect() as conn:
        result = conn.execute(
            sql, {'email': email, 'password': password})
        user = result.fetchone()
        if user:
            access_token = create_access_token(identity=email)
            return jsonify({"message": "User login successful", "user": {"id": user[0], "username": user[1], "email": user[2], "access_token": access_token}})

    return jsonify({"Error": "Invalid credentials"}), 401
