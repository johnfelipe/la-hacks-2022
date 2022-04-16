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

@app.route("/eeg/random")
def random_data():
    return {
        "any": train.get_random_data(),
        "seizure": train.get_random_seizure_data(),
        "non_seizure": train.get_random_non_seizure_data()
    }

@app.route("/eeg/data")
def all_data():
    return {
        "seizure": train.get_all_seizure_data(),
        "non_seizure": train.get_all_non_seizure_data()
    }

if __name__ == "__main__":
    app.run(debug=True)