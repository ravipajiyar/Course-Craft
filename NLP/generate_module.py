import os
import google.generativeai as genai
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  system_instruction="""Based on the answer given by a the user, evaluate the correctness of the answers and generate a well structured course module based on user's understanding on the subject. If no answere is provided asume the user as a beginer on the subject.
    The course content should be incremental from basics to andvanced in that order(important).
    return in following fromat:
    {
    course_title: <title of course>,
    your_understanding: <users's understanding level>,
    modules: {
        <module name>: [<topic 1>, <topic 2>, ... ],
        <module name>: [<topic 1>, <topic 2>, ... ],
        ...
    }
    }

  """
  )


chat_session = model.start_chat(
  history=[
  ]
)


def generate_module(questions_expected_answers, user_answers):
    questions = []
    expected_answers = []
    # Parse the JSON formatted string into a dictionary
    # print(questions_expected_answers)
    # formatted = json.loads(questions_expected_answers)
    # Access the questions and answers using dictionary keys


    questions += questions_expected_answers['questions']['basic']['questions']
    questions += questions_expected_answers['questions']['intermediate']['questions']
    questions += questions_expected_answers['questions']['advanced']['questions']

    expected_answers += questions_expected_answers['questions']['basic']['expected_answers']
    expected_answers += questions_expected_answers['questions']['intermediate']['expected_answers']
    expected_answers += questions_expected_answers['questions']['advanced']['expected_answers']


    questions_expected_user_answer = f"""
        questions: {questions},
        expected_answers: {expected_answers},
        user_answer: {user_answers}
    """


    response = chat_session.send_message(questions_expected_user_answer).text
    print(response)

    start_index = response.find("{")
    end_index = response.rfind("}")+1

    response = response[start_index:end_index]


    json_response = json.loads(response)

    return json_response
