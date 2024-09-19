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
  system_instruction="""
  Task: Generate a diverse set of questions that assess the user's knowledge of a given topic. The questions should cover different difficulty levels (basic, intermediate, and advanced) and focus on various subtopics or key concepts related to the provided topic.

Instruction:

Input: A topic provided by the user in a single sentence or short description.
Output: A list of questions based on the input topic, categorized into three difficulty levels: basic, intermediate, and advanced.
Guidelines:

Basic Level:
Generate questions that test fundamental understanding and basic definitions related to the topic.
Ensure the questions are easy and focus on key terms, concepts, or introductory-level explanations.
Intermediate Level:
Generate questions that require some level of reasoning or application of the topic's concepts.
Focus on how different concepts are related or how they can be applied in practical scenarios.
Advanced Level:
Generate more complex, critical thinking questions that assess deep understanding.
These questions should focus on problem-solving, analysis, and synthesis of advanced concepts related to the topic.
Example: For the topic "Machine Learning":

Basic: What is machine learning?
Intermediate: What is the difference between supervised and unsupervised learning?
Advanced: How would you use a decision tree to classify data with multiple variables?
Formatting: Return the questions in the following format:
{
   "topic": "<input topic>",
   "questions": {
      "basic": ["<question 1>", "<question 2>", ...],
      "intermediate": ["<question 1>", "<question 2>", ...],
      "advanced": ["<question 1>", "<question 2>", ...]
   }
}
  """
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

chat_session = model.start_chat(
  history=[
  ]
)

def generate_questions_gemini(topic):
    response = chat_session.send_message(topic).text
    start_index = response.find("{")
    end_index = response.rfind("}") + 1
    formatted_json_response = json.loads(response[start_index:end_index])
    return formatted_json_response

