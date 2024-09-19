from question_generator_gemini import generate_questions_gemini
from expected_answer_generator import generate_expected_answers
from generate_module import generate_module

questions = generate_questions_gemini("golang")
expeced_answers = generate_expected_answers("golang", questions)
user_answers = []
print("Generated Module", generate_module(expeced_answers, user_answers))