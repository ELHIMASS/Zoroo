from flask import Flask, request, render_template, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import json
import os

app = Flask(__name__)

# Configuration de l'application et de la base de données MySQL
app.secret_key = "super secret key"  # Remplacez par une clé sécurisée
app.permanent_session_lifetime = timedelta(minutes=5)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/inscription'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modèle de données pour la table `users`
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Crée la base de données et la table si elles n'existent pas
with app.app_context():
    db.create_all()

@app.route("/")
def s():
     return redirect(url_for("home"))

@app.route("/home")
def home():
    if "username" in session:  # Vérifie si l'utilisateur est connecté
        return render_template("conected.html", username=session["username"])
    return render_template("pageAcceuil.html")

@app.route("/Contact")
def Contact():
    if "username" in session:
        return render_template("PContactCon.html", username=session["username"])
    return render_template("PContact.html")

@app.route("/inscription", methods=["POST", "GET"])
def inscription():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm-password")

        # Vérification des mots de passe
        if password != confirm_password:
            return redirect(url_for("inscription"))

        # Vérifier si le nom d'utilisateur ou l'email existe déjà
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return redirect(url_for("inscription"))

        # Hachage du mot de passe et sauvegarde dans la base
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for("connexion"))

    return render_template("inscription.html")

@app.route("/connexion", methods=["POST", "GET"])
def connexion():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # Recherche de l'utilisateur dans la base
        user = User.query.filter_by(username=username).first()
        if user and (user.password == password):
            session["username"] = user.username
            return redirect(url_for("home"))
        else:
            return redirect(url_for("connexion"))

    return render_template("connection.html")

@app.route("/AboutUs")
def AboutUs():
    if "username" in session:  
        return render_template("AboutUsCon.html", username=session["username"])
    return render_template("pageAboutUs.html")

@app.route("/confirm")
def confirmer():
    
    return render_template("Pconf.html")

@app.route("/logout")
def logout():
    session.clear()  # Supprime toutes les données de la session
    return redirect(url_for("home"))

@app.route('/catalogue', methods=['GET', 'POST'])
def catalogue():
    # Chemin du fichier JSON
    json_path = os.path.join(app.root_path, 'static/json/moto.json')

    # Charger les données depuis le fichier JSON
    try:
        with open(json_path, 'r', encoding='utf-8') as file:
            motos = json.load(file)
    except FileNotFoundError:
        return "Fichier JSON introuvable.", 404
    except json.JSONDecodeError:
        return "Erreur de lecture du fichier JSON.", 500

    # Récupérer les paramètres de recherche
    moto_type = request.args.get('type', '').lower()
    search_query = request.args.get('search', '').lower()

    # Filtrer les motos en fonction des paramètres
    filtered_motos = [
        moto for moto in motos
        if (not moto_type or moto['type'].lower() == moto_type) and
           (not search_query or search_query in moto['name'].lower())
    ]

    # Rendre le template avec les motos filtrées
    return render_template('catalog.html', motos=filtered_motos)

@app.route('/moto_details')
def moto_details():
    # Récupérer l'ID de la moto depuis l'URL
    moto_id = request.args.get('id', type=int)

    json_path = os.path.join(app.root_path, 'static/json/dascription.json')

    # Charger les données depuis le fichier JSON
    try:
        with open(json_path, 'r', encoding='utf-8') as file:
            motos_data = json.load(file)
    except FileNotFoundError:
        return "Fichier JSON introuvable.", 404
    except json.JSONDecodeError:
        return "Erreur de lecture du fichier JSON.", 500

    # Trouver la moto par son ID
    moto = next((m for m in motos_data if m['id'] == moto_id), None)

    if moto:
        return render_template('descript.html', moto=moto)
    else:
        return "Moto introuvable", 404
    
    
@app.route('/processpayment', methods=['POST'])
def process_payment():
    # Récupérer les données du formulaire
    name = request.form['name']
    card_number = request.form['card_number']
    expiry_date = request.form['expiry_date']
    cvv = request.form['cvv']

    # Logique de traitement du paiement
    if not name or not card_number or not expiry_date or not cvv:
        return "Erreur : Tous les champs sont requis", 400

    # Simuler un succès (ajoutez votre logique de paiement ici)
    return render_template('succes.html', name=name)

if __name__ == '__main__':
    app.run(debug=True)


if __name__ == "__main__":
    app.run(debug=True)
