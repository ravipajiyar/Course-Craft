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



def generate_expected_answers(topic, questions):
    system_instruction = f"""You are an expert on {topic}. Provide detailed and correct answers to the following questions:
    {questions}

        Formatting: Return the questions in the following format:
    {{
   "topic": "{topic},
   "questions": {{
      "basic": {{questions: ["<question 1>", "<question 2>", ...],
      expected_answers: ["<answer 1>", "<answer 2>", ...]
      }},
      "intermediate": {{questions:["<question 1>", "<question 2>", ...],
      expected_answers: ["<answer 1>", "<answer 2>", ...]
      }},
      "advanced": {{questions:["<question 1>", "<question 2>", ...],
      expected_answers: ["<answer 1>", "<answer 2>", ...]
      }}
        }}
    }}
    """
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction=system_instruction
        )

    chat_session = model.start_chat(
    history=[
    ]
    )


    response = chat_session.send_message(f"{questions}").text

    start_index = response.find("{")
    end_index = response.rfind("}") + 1
    formatted_json_response = json.loads(response[start_index:end_index])
    return formatted_json_response