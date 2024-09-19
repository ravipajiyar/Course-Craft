from flask import Flask, request, jsonify
from question_generator import generate_questions
from question_generator_gemini import generate_questions_gemini
from expected_answer_generator import generate_expected_answers
from generate_module import generate_module
from get_notes_on import get_notes_on
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

@app.route('/generate-module', methods=['POST'])
def generate_course_module():
    data = request.get_json()
    questions = data.get("questions")
    topic = data.get("topic")
    user_answers = data.get("answers")

    exceptd_answers = generate_expected_answers(topic, questions)

    module =  generate_module(exceptd_answers, user_answers)


    # start_index = module.find("{")
    # end_index = module.rfind("}")+1
    return jsonify(module)
@app.route('/get-notes', methods=['POST'])
def get_notes():
    data = request.get_json()
    topic = data.get("topic")
    notes  = get_notes_on(topic)
    return jsonify(notes)
    


if __name__ == '__main__':
    app.run(port=3001, debug=True)

# test this