from flask import Flask,request,render_template,jsonify,session,redirect,url_for


app = Flask(__name__)

#app.secret_key = secrets.token_hex(32)# type: ignore
@app.route("/home")
def home():
    return render_template("pageAcceuil.html")

@app.route("/inscription")
def inscription():
    return render_template("inscription.html")

@app.route("/connexion")
def connection():
    return render_template("connection.html")


if __name__ == "__main__":
    app.run(debug=True)#,port:8080