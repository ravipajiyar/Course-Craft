import os
import together
from together import Together
from dotenv import load_dotenv

load_dotenv()
# Set your Together AI API key directly
api_key = os.getenv("TOGETHER_API_KEY")
# Initialize the Together client
client = Together(api_key=api_key)


# Function to generate questions based on a topic
def generate_questions(topic):
    model = "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"
    system_instruction = """You are a helpful assistant designed to generate subjective questions based on a given topic. 
You should categorize the questions into three difficulty levels: basic, intermediate, and advanced. Each category should contain questions that match the difficulty level appropriately."""
    # Define the prompt for generating questions
    prompt = f""" {system_instruction}
    Generate 10 subjective questions on the basis of Difficulty level about the following topic: {topic}.
    response in this format:
    Formatting: Return the questions in the following format:
{{
   "topic": "<input topic>",
   "questions": {{
      "basic": ["<question 1>", "<question 2>", ...],
      "intermediate": ["<question 1>", "<question 2>", ...],
      "advanced": ["<question 1>", "<question 2>", ...]
   }}
}}
    \n"""

    # Generate the output using the LLM
    output = together.Complete.create(
        prompt=prompt,
        model=model,
        max_tokens=512,  # Adjust token limit as needed
        temperature=0.7,
        top_k=50,
        top_p=0.7,
        repetition_penalty=1,
        # Stop on new line to separate questions
        
    )

    # Print the generated questions
    questions = output['choices'][0]['text']
    print("Generated Questions:\n", questions)
    return questions

# Example usage
topic = "C++ Programming"
generate_questions(topic)