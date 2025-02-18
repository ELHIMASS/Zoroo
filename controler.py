from flask import Flask, request, render_template, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import json
import os

app = Flask(__name__)


app.secret_key = "super secret key" 
app.permanent_session_lifetime = timedelta(minutes=5)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/inscription'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Crée la base de données et la table si elles n'existent pas
with app.app_context():
    db.create_all()
class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    moto_name = db.Column(db.String(255), nullable=False)
    moto_id = db.Column(db.Integer, nullable=False)
    user = db.relationship('User', backref=db.backref('reservations', lazy=True))

# Crée la base de données et les tables
with app.app_context():
    db.create_all()

@app.route("/")
def s():
     return redirect(url_for("home"))

@app.route("/home")
def home():
    return render_template("pageAcceuil.html")

@app.route("/Contact")
def Contact():
    return render_template("PContact.html")

@app.route("/commentaire")
def Commentaire():
    return render_template("PCom.html")


@app.route("/inscription", methods=["POST", "GET"])
def inscription():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm-password")

       
        if password != confirm_password:
            return redirect(url_for("inscription"))

       
        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return redirect(url_for("inscription"))

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

        user = User.query.filter_by(username=username).first()
        if user and (user.password == password):
            session.permanent = True
            session["username"] = user.username
            return redirect(url_for("home"))
        else:
            return redirect(url_for("connexion"))

    return render_template("connection.html")

@app.route("/AboutUs")
def AboutUs():
    return render_template("pageAboutUs.html")


@app.route("/confirm")
def confirmer():
    return render_template("Pconf.html")

@app.route("/logout")
def logout():
    session.clear()  
    return redirect(url_for("home"))

@app.route('/catalogue', methods=['GET', 'POST'])
def catalogue():
    
    json_path = os.path.join(app.root_path, 'static/json/moto.json')

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

    return render_template("catalog.html", motos=filtered_motos)

@app.route('/moto_details', methods=['GET', 'POST'])
def moto_details():
    moto_id = request.args.get('id', type=int)

    # Charger les informations de la moto depuis le fichier JSON
    json_path = os.path.join(app.root_path, 'static/json/dascription.json')
    try:
        with open(json_path, 'r', encoding='utf-8') as file:
            motos_data = json.load(file)
    except FileNotFoundError:
        return "Fichier JSON introuvable.", 404
    except json.JSONDecodeError:
        return "Erreur de lecture du fichier JSON.", 500

    # Trouver la moto correspondante
    moto = next((m for m in motos_data if m['id'] == moto_id), None)

    if moto:
        # Si la méthode est POST, ajouter une réservation
        if request.method == 'POST':
            if 'username' in session:
                user = User.query.filter_by(username=session['username']).first()
                if user:
                    new_reservation = Reservation(user_id=user.id, moto_name=moto['name'], moto_id=moto['id'])
                    db.session.add(new_reservation)
                    db.session.commit()
                    flash("Moto réservée avec succès", "success")
                    return redirect(url_for('reservations'))
            else:
                flash("Veuillez vous connecter pour réserver.", "warning")
                return redirect(url_for('connexion'))

        return render_template('descript.html', moto=moto)
    else:
        return "Moto introuvable", 404


    
@app.route('/procesPayment', methods=['GET', 'POST'])
def process_payment():
    if request.method == 'POST':
        name = request.form.get('name')
        card_number = request.form.get('card_number')
        expiry_date = request.form.get('expiry_date')
        cvv = request.form.get('cvv')

        if not name or not card_number or not expiry_date or not cvv:
            return "Erreur : Tous les champs sont requis", 400

        if not card_number.isdigit() or len(card_number) != 16:
            return "Erreur : Numéro de carte invalide", 400

        if not cvv.isdigit() or len(cvv) != 3:
            return "Erreur : CVV invalide", 400

        return render_template('succes.html', name=name)

    return render_template('payment.html')

@app.route('/reservations')
def reservations():
    if 'username' not in session:
        return redirect(url_for('connexion'))
    
    user = User.query.filter_by(username=session['username']).first()
    if user:
        reservations = Reservation.query.filter_by(user_id=user.id).all()
        return render_template('reservations.html', reservations=reservations)
    else:
        return redirect(url_for('connexion'))


@app.route("/ChangerMDP", methods=["GET", "POST"])
def changer_mdp():
    # Vérifie si l'utilisateur est connecté
    if 'username' in session:
        return redirect(url_for('home'))

    if request.method == "POST":
        email = request.form.get("email")
        new_password = request.form.get("new-password")
        confirm_password = request.form.get("confirm-password")

        user = User.query.filter_by(email=email).first()

        if email != user.email:  
            return render_template("ChangerMDP.htmL")

        if new_password != confirm_password:
            return render_template("ChangerMDP.htmL")
        
        user.password = new_password
        db.session.commit()

        return redirect(url_for("home"))

    return render_template("ChangerMDP.htmL")

@app.route("/faq")
def faq():
    return render_template("faq.html")

if __name__ == "__main__":
    app.run(debug=True)
