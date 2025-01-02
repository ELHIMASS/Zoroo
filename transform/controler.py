from flask import Flask, request, render_template, session, redirect, url_for, flash
from datetime import timedelta

app = Flask(__name__)
app.secret_key = "super secret key"  # À remplacer par une clé sécurisée
app.permanent_session_lifetime = timedelta(minutes=5)

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

        # Sauvegarde des informations dans la session pour simuler un enregistrement
        session["username"] = username
        session["email"] = email
        session["password"] = password

        flash("Inscription réussie ! Veuillez vous connecter.", "success")
        return redirect(url_for("connexion"))  # Redirection vers connexion après inscription

    return render_template("inscription.html")

@app.route("/connexion", methods=["POST", "GET"])
def connexion():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # Vérifie si les informations correspondent à celles de la session
        if "username" in session and "password" in session:
            if username == session["username"] and password == session["password"]:
                flash("Connexion réussie !", "success")
                return redirect(url_for("home")) # render_template("pageAcceuil.html")   Redirection vers l'accueil après connexion
            else:
                flash("Nom d'utilisateur ou mot de passe incorrect.", "error")
        else:
            flash("Aucun compte n'est inscrit avec ces informations.", "error")
        return redirect(url_for("connexion"))

    return render_template("connection.html")

@app.route("/logout")
def logout():
    session.clear()  # Supprime toutes les données de la session
    flash("Vous êtes déconnecté.", "info")
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
