from flask import Flask, render_template


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


app.config["SERVER_NAME"] = "4sst.rmit"
app.run(debug=True, port=80)