from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

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


# create the database file
with app.app_context():
    db.create_all()


# --------FOR HOME PAGE--------
@app.route("/")
def index():
    all_notes = Note.query.order_by(Note.id.desc()).all()
    return render_template("index.html", name="", notes=all_notes)


# --------FOR ADDING NOTE--------
@app.route("/add", methods=["POST"])
def add_note():
    content = request.form.get("content")
    if content:
        # create a new note object and save it to the database
        new_note = Note(
            content=content
        )  # wrap the content into the Note class (database) oject
        db.session.add(new_note)
        db.session.commit()
    return redirect("/")


# --------FOR DELETING NOTE--------
@app.route("/delete/<int:id>")
def delete_note(id):
    note_to_delete = Note.query.get_or_404(
        id
    )  # get the note by id or return 404 if not found
    try:
        db.session.delete(note_to_delete)
        db.session.commit()
        return redirect("/")
    except:
        return "Cannot delete the note. Please try again!"


# --------FOR UPDATING NOTE--------
@app.route("/update/<int:id>", methods=["GET", "POST"])
def update_note(id):
    note = Note.query.get_or_404(id)
    # if user change the note
    if request.method == "POST":
        note.content = request.form.get("content")
        try:
            db.session.commit()  # save
            return redirect("/")
        except:
            return "Cannot update the note. Please try again!"
    else:
        return render_template("update.html", name="Thien", note=note)


if __name__ == "__main__":
    app.run(debug=True)
