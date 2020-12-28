from os import path, urandom

from flask import Flask, render_template, session, request, redirect

dirname = path.dirname(__file__)
certpath = path.join(dirname, "cert/")

app = Flask(__name__)
app.secret_key = urandom(24)


@app.before_first_request
def firstSetup():
	session["theme"] = ""
	session["darkBtnInp"] = ""
	session["lang"] = "English"
	setLang(session["lang"])


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


def setLang(lang):
	pass


@app.route("/applySettings", methods=["post"])
def applySettings():
	try:
		_ = request.form["darkModeInp"]
		session["theme"] = "dark"
		session["darkBtnInp"] = "checked"
	except KeyError:
		session["theme"] = ""
		session["darkBtnInp"] = ""

	return redirect("/settings")

app.config["SERVER_NAME"] = "4sst.rmit:443"
app.run(debug=True, ssl_context=(certpath + "4sst.rmit.pem", certpath + "4sst.rmit-key.pem"))
