from flask import Flask, request, jsonify
from question_generator import generate_questions
from question_generator_gemini import generate_questions_gemini
import json

app = Flask(__name__)

@app.route('/generate-questions', methods=['POST'])
def get_generated_questions():

    data = request.get_json()
    topic = data.get('topic')
    questions = generate_questions_gemini(topic)
    # print(questions)

    # response = json.loads(questions)
    return jsonify(questions)

if __name__ == '__main__':
    app.run(port=3001, debug=True)
