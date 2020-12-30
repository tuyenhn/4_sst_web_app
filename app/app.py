from json import load
from os import path, urandom
from flask import Flask, render_template, session, request, redirect, Response
from flask_compress import Compress


dirname = path.dirname(__file__)
certpath = path.join(dirname, "cert/")
langFile = open(path.join(dirname, "static/language.json"), encoding="utf-8")
languageJson = load(langFile)

app = Flask(__name__)
app.secret_key = urandom(24)
app.config["SERVER_NAME"] = "4sst.rmit:443"
Compress(app)


@app.before_first_request
def sessionSetup():
    session["theme"] = ""
    session["darkBtnInp"] = ""
    session["lang"] = "English"
    setLang(session["lang"])


@app.after_request
def http_header(resp):
    resp.cache_control.max_age = 31536000
    return resp


@app.route("/service-worker.js")
def serviceWorker():
    return app.send_static_file("prod/js/service-worker.js")


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


@app.route("/offline")
def offline():
    return render_template("offline.html")


def setLang(lang):
    session["selectedLang"] = languageJson["language"][lang]


@app.route("/applySettings", methods=["post"])
def applySettings():
    try:
        _ = request.form["darkModeInp"]
        session["theme"] = "dark"
        session["darkBtnInp"] = "checked"
    except KeyError:
        session["theme"] = ""
        session["darkBtnInp"] = ""

    userLang = request.form["languageInp"]

    if userLang != session["lang"]:
        session["lang"] = userLang
        setLang(userLang)

    return redirect("/settings")


app.run(debug=True, ssl_context=(certpath + "4sst.rmit.pem", certpath + "4sst.rmit-key.pem"))
