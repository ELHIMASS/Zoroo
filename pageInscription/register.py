from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
import sqlite3

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                       (username, email, password))
        conn.commit()
        return jsonify({"message": "Inscription réussie"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "Nom d'utilisateur ou email déjà utilisé"}), 400
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
