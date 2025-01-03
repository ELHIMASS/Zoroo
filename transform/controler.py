from flask import Flask, request, render_template, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

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
def base():
    return redirect(url_for("home"))

@app.route("/home")
def home():
    if "username" in session:  # Vérifie si l'utilisateur est connecté
        return render_template("conected.html", username=session["username"])
    return render_template("pageAcceuil.html")

@app.route("/inscription", methods=["POST", "GET"])
def inscription():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm-password")

        # Vérification des mots de passe
        if password != confirm_password:
            flash("Les mots de passe ne correspondent pas.", "error")
            return redirect(url_for("inscription"))

        # Vérifier si le nom d'utilisateur ou l'email existe déjà
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            flash("Nom d'utilisateur ou email déjà utilisé.", "error")
            return redirect(url_for("inscription"))

        # Hachage du mot de passe et sauvegarde dans la base
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        flash("Inscription réussie ! Veuillez vous connecter.", "success")
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
            flash("Connexion réussie !", "success")
            return redirect(url_for("home"))
        else:
            flash("Nom d'utilisateur ou mot de passe incorrect.", "error")
            return redirect(url_for("connexion"))

    return render_template("connection.html")

@app.route("/logout")
def logout():
    session.clear()  # Supprime toutes les données de la session
    flash("Vous êtes déconnecté.", "info")
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
