import os
import google.generativeai as genai

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
  system_instruction="""Based on the answer given by a the user, evaluate the correctness of the answers and generate a course module to further for the topic.
    return in following fromat:
    {
    your_understanding: <users's understanding level>,
    modules: {
        module 1 name: [<topic 1>, <topic 2>, ... ],
        module 2 name: [<topic 1>, <topic 2>, ... ],
        ...
    }
    }

  """
  )


chat_session = model.start_chat(
  history=[
  ]
)


def evaluate(questions_expected_answers, user_answers):
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
    return response
