from json import load, dumps
from os import path, urandom
from flask import Flask, render_template, session, request, redirect, Response, flash
from flask_compress import Compress
from flask_talisman import Talisman
from datetime import datetime as dt
import translator

dirname = path.dirname(__file__)
certpath = path.join(dirname, "cert/")
langFile = open(path.join(dirname, "static/language.json"), encoding="utf-8")
languageJson = load(langFile)

app = Flask(__name__)
app.secret_key = urandom(24)

domain = "4sst.rmit"
port = "443"
server_name = f"{domain}:{port}"
app.config["SERVER_NAME"] = server_name
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

Compress(app)

Talisman(
    app,
    content_security_policy={
        "default-src": "'self'",
        "script-src": [
            "'unsafe-inline'",
            f"https://{domain}/static/prod/js/jquery.min.js",
            f"https://{domain}/static/prod/js/jquery.mobile.custom.min.js",
            f"https://{domain}/static/prod/js/index.js",
            f"https://{domain}/static/prod/js/vanilla-picker.min.js",
            f"https://{domain}/static/prod/js/service-worker.js",
            f"https://{domain}/service-worker.js",
        ],
        "style-src": [
            "'unsafe-inline'",
            f"https://{domain}/static/prod/css/template.css",
            f"https://{domain}/static/prod/css/fontawesome.min.css",
        ],
        "img-src": ["'self'", "data:"],
    },
)


matrixArr = [
    [68, 58, 0, 0, 26],
    [65, 61, 0, 0, 26],
    [62, 64, 0, 0, 26],
    [58, 68, 0, 0, 26],
    [54, 72, 0, 0, 26],
    [51, 75, 0, 0, 26],
    [48, 78, 0, 0, 26],
    [45, 26, 4, 51, 26],
    [41, 26, 8, 51, 26],
    [38, 26, 11, 51, 26],
    [35, 26, 14, 51, 26],
    [32, 26, 18, 51, 26],
    [29, 26, 20, 51, 26],
    [25, 25, 25, 51, 26],
    [21, 25, 29, 51, 26],
    [18, 25, 32, 51, 26],
    [15, 25, 35, 51, 26],
    [12, 25, 38, 51, 26],
    [9, 25, 41, 51, 26],
    [6, 25, 44, 51, 26],
    [3, 25, 47, 51, 26],
    [1, 151, 0, 0, 0],
    [1, 151, 0, 0, 0],
    [0, 152, 0, 0, 0],
    [1, 151, 0, 0, 0],
    [1, 151, 0, 0, 0],
    [1, 151, 0, 0, 0],
    [1, 151, 0, 0, 0],
    [1, 151, 0, 0, 0],
    [76, 51, 25, 0, 0],
    [76, 51, 25, 0, 0],
    [76, 51, 25, 0, 0],
    [76, 51, 25, 0, 0],
    [76, 51, 25, 0, 0],
    [76, 51, 25, 0, 0],
    [76, 51, 25, 0, 0],
    [76, 51, 25, 0, 0],
]


def sessionSetup():
    session.clear()
    session["theme"] = ""
    session["darkBtnInp"] = ""
    session["lang"] = "English"
    setLang(session["lang"])


def setLang(lang):
    session["selectedLang"] = languageJson["language"][lang]


# @app.after_request
# def http_header(resp):
#     resp.cache_control.max_age = 31536000
#     return resp


@app.before_request
def sessionCheck():
    try:
        _ = session["set"]
    except:
        sessionSetup()
        session["set"] = True


@app.route("/service-worker.js")
def serviceWorker():
    return app.send_static_file("prod/js/service-worker.js")


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/paint")
def paint():
    # ledy = 0.5 (cm/px) but using style="stroke:..." will default stroke-width to 1px, breaking the square size
    # xoffset, yoffset and ledy are magic numbers
    return render_template(
        "paint.html", xoffset=0.5, yoffset=1, xgap=0.192, ygap=2.22, ledx=0.5, ledy=1.281, matrixArr=matrixArr
    )


@app.route("/settings")
def settings():
    return render_template("settings.html")


@app.route("/help")
def help():
    return render_template("help.html")


@app.route("/offline")
def offline():
    return render_template("offline.html")


@app.route("/applyPaint", methods=["post"])
def applyPaint():
    try:
        ledDict = {}
        for k, v in request.form.items():
            if k.startswith("led") and v != "#000000":
                ledDict[k] = request.form[k]
        fname = "_".join([request.form["fileName"], dt.now().strftime("%Y%m%d%H%M%S")])
        with open(path.join("paintings", fname), "w") as f:
            f.write(dumps(ledDict))
        flash("PAINTING SAVED", "info")
        translator.translate(path.join("paintings", fname))
    except Exception as e:
        flash(f"AN ERROR OCURRED. SAVING FAILED", "error")

    return redirect("paint")


@app.route("/applySettings", methods=["get"])
def applySettings():
    if request.args.get("darkModeInp") == "on":
        session["theme"] = "dark"
        session["darkBtnInp"] = "checked"
    else:
        session["theme"] = ""
        session["darkBtnInp"] = ""

    userLang = request.args.get("languageInp")

    if userLang != session["lang"]:
        session["lang"] = userLang
        setLang(userLang)

    return redirect("/settings")


if __name__ == "__main__":
    app.run(ssl_context=(certpath + f"{domain}.pem", certpath + f"{domain}-key.pem"))
