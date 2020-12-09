from flask import Flask, render_template
from os import path

dirname = path.dirname(__file__)
certpath = path.join(dirname, "cert/")

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/paint")
def paint():
    return render_template("paint.html")


@app.route("/settings")
def settings():
    return render_template("settings.html")


@app.route("/help")
def help():
    return render_template("help.html")


app.config["SERVER_NAME"] = "4sst.rmit:80"
app.run(debug=True, ssl_context=(certpath + "4sst.rmit.pem", certpath + "4sst.rmit-key.pem"))
