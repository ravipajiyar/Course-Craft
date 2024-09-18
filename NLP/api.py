from flask import Flask, request, jsonify
from question_generator import generate_questions

app = Flask(__name__)

@app.route('/generate-questions', methods=['POST'])
def get_generated_questions():
    data = request.get_json()
    topic = data.get('topic')
    questions = generate_questions(topic)

    # Return the result in JSON format
    return questions
    # return jsonify(output['choices'][0]['text'])

if __name__ == '__main__':
    app.run(port=5000, debug=True)
