from question_generator_gemini import generate_questions_gemini
from expected_answer_generator import generate_expected_answers
from evaluate_answers import evaluate

questions = generate_questions_gemini("golang")
expeced_answers = generate_expected_answers("golang", questions)
user_answers = []
print("Generated Module", evaluate(expeced_answers, user_answers))