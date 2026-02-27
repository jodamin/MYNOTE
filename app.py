from flask import Flask, render_template, request, redirect, session, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import timedelta
from datetime import datetime

app = Flask(__name__)
app.secret_key = "this_is_secret"

# --------FOR DATABASE--------
# create address to save database
db_url = os.environ.get("DATABASE_URL", "sqlite:///database.db")
if db_url and db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if "sqlite" not in db_url and "sslmode" not in db_url:
    db_url += "&sslmode=require" if "?" in db_url else "?sslmode=require"

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# create a database object
db = SQLAlchemy(app)


# create a table name User, this table will link with Note table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    # a user can have many notes
    notes = db.relationship("Note", backref="owner", lazy=True)


# create a table name Note
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    date = db.Column(
        db.String(50), default=lambda: datetime.now().strftime("%H:%M - %d/%m/%Y")
    )
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


with app.app_context():
    db.create_all()


# --------FOR HOME PAGE--------
@app.route("/")
def index():
    # check if the user_id is already exist
    if "user_id" not in session:
        return redirect(url_for("welcome"))

    # all_notes = Note.query.order_by(Note.id.desc()).all()
    user_notes = (
        Note.query.filter_by(user_id=session["user_id"]).order_by(Note.id.desc()).all()
    )
    return render_template("index.html", name=session["name"], notes=user_notes)


# --------FOR WELCOME PAGE--------
@app.route("/welcome", methods=["GET", "POST"])
def welcome():
    if request.method == "POST":

        name = request.form.get("user_name")

        if name:
            new_user = User(username=name.strip())

            db.session.add(new_user)
            db.session.commit()

            session["user_id"] = new_user.id
            session["name"] = name

            flash(f"Welcome to MYNOTE ^^ ☁️✨")
            return redirect(url_for("index"))

    return render_template("welcome.html")


# --------FOR ADDING NOTE--------
@app.route("/add", methods=["POST"])
def add_note():
    # check if user enter their name yet
    if "user_id" not in session:
        return redirect(url_for("welcome"))

    content = request.form.get("content")
    if content:
        # create a new note object
        new_note = Note(
            content=content, user_id=session["user_id"]
        )  # wrap the new content into the Note class (database) oject
        db.session.add(new_note)
        db.session.commit()
        flash("Note added successfully ><! ☁️✨")
    return redirect(url_for("index"))


# --------FOR DELETING NOTE--------
@app.route("/delete/<int:id>")
def delete_note(id):
    # check if user enter their name yet
    if "user_id" not in session:
        return redirect(url_for("welcome"))

    note = Note.query.filter_by(
        id=id, user_id=session["user_id"]
    ).first_or_404()  # get the note by id or return 404 if not found
    try:
        db.session.delete(note)
        db.session.commit()
        return redirect(url_for("index"))
    except:
        flash("Cannot delete the note :< Please try again ><! ")
    return redirect(url_for("index"))


# --------FOR UPDATING NOTE--------
@app.route("/update/<int:id>", methods=["POST"])
def update_note(id):
    # check if user enter their name yet
    if "user_id" not in session:
        return redirect(url_for("welcome"))

    note = Note.query.filter_by(id=id, user_id=session["user_id"]).first_or_404()

    # if user change the note
    content = request.form.get("content")
    if content:
        note.content = content
        note.date = datetime.now().strftime("%H:%M - %d/%m/%Y")
        db.session.commit()
        flash("Note updated! ^^ ☁️✨")
    return redirect(url_for("index"))


# --------FOR CHANGING USERNAME--------
@app.route("/change_name", methods=["POST"])
def change_name():
    if "user_id" not in session:
        return redirect(url_for("welcome"))

    new_name = request.form.get("new_name").strip()
    if new_name:
        user = User.query.get(session["user_id"])
        if user:
            user.username = new_name
            session["name"] = new_name
            db.session.commit()
            flash("Name changed! ~.~ 💙")

    return redirect(url_for("index"))


@app.route("/healthcheck")
def healthcheck():
    return "OK", 200


# --------run--------
if __name__ == "__main__":
    # if not using in Render, use local (5000)
    port = int(os.environ.get("PORT", 5000))

    # For local: host is 127.0.0.1
    # If Render: host is 0.0.0.0
    host = "0.0.0.0" if os.environ.get("RENDER") else "127.0.0.1"

    app.run(host=host, port=port, debug=True)

# haizz~~
