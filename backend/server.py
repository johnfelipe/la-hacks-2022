from flask import Flask
import train

app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["John", "Mary", "Bob"]}

@app.route("/")
def index():
    return {"message": "Hello World"}

@app.route("/prediction")
def prediction():
    return {"percentage_seizure_occurrence": train.predict_label(2)}

if __name__ == "__main__":
    app.run(debug=True)