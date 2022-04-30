from flask import Flask
from flask_cors import CORS
from flask import Flask, request, jsonify, make_response
import nltk
from rake_nltk import Rake

nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

@app.route('/keywords', methods=['POST'])
def extract():
    doc = request.json['text']
    num = request.json['keywords']
    rake = Rake()
    rake.extract_keywords_from_text(doc)
    rst = rake.get_ranked_phrases()[:int(num)]
    return make_response(jsonify(rst), 200)

if __name__ == '__main__':
    app.run(debug=True, port=5000)