from flask import Flask, render_template, request, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import timedelta
from datetime import datetime

app = Flask(__name__)
app.secret_key = "this_is_secret"

# --------FOR DATABASE--------
# create address to save database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# create a database object
db = SQLAlchemy(app)


# create a model for the note
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    date = db.Column(
        db.String(50), default=lambda: datetime.now().strftime("%H:%M - %d/%m/%Y")
    )


# create the database file
with app.app_context():
    db.create_all()


# --------FOR HOME PAGE--------
@app.route("/")
def index():
    # check if the name is already exist
    if "name" not in session:
        return redirect(url_for("welcome"))

    all_notes = Note.query.order_by(Note.id.desc()).all()
    return render_template("index.html", name=session["name"], notes=all_notes)


# --------FOR WELCOME PAGE--------
@app.route("/welcome", methods=["GET", "POST"])
def welcome():
    if request.method == "POST":
        name = request.form.get("user_name")
        if name:
            session.permanent = True
            app.permanent_session_lifetime = timedelta(
                days=30
            )  # save the name for 30 days
            session["name"] = name  # save the name in the session
            return redirect(url_for("index"))
    return render_template("welcome.html")


# --------FOR ADDING NOTE--------
@app.route("/add", methods=["POST"])
def add_note():
    # check if user enter their name yet
    if "name" not in session:
        return redirect(url_for("welcome"))

    content = request.form.get("content")
    if content:
        # create a new note object and save it to the database
        new_note = Note(
            content=content
        )  # wrap the content into the Note class (database) oject
        db.session.add(new_note)
        db.session.commit()
    return redirect(url_for("index"))


# --------FOR DELETING NOTE--------
@app.route("/delete/<int:id>")
def delete_note(id):
    # check if user enter their name yet
    if "name" not in session:
        return redirect(url_for("welcome"))

    note_to_delete = Note.query.get_or_404(
        id
    )  # get the note by id or return 404 if not found
    try:
        db.session.delete(note_to_delete)
        db.session.commit()
        return redirect(url_for("index"))
    except:
        return "Cannot delete the note. Please try again!"


# --------FOR UPDATING NOTE--------
@app.route("/update/<int:id>", methods=["GET", "POST"])
def update_note(id):
    # check if user enter their name yet
    if "name" not in session:
        return redirect(url_for("welcome"))

    note = Note.query.get_or_404(id)
    # if user change the note
    if request.method == "POST":
        note.content = request.form.get("content")
        note.date = datetime.now().strftime("%H:%M - %d/%m/%Y")
        try:
            db.session.commit()  # save
            return redirect(url_for("index"))
        except:
            return "Cannot update the note. Please try again!"
    else:
        return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
