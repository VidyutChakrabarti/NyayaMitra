from crewai import Agent
from tools import *
from langchain_google_genai import GoogleGenerativeAI
from dotenv import load_dotenv
import os

load_dotenv()

gemini_api_key = os.getenv('VITE_GEMINI_API_KEY')
gemini_model_name = os.getenv('VITE_MODEL')

gemini_model = GoogleGenerativeAI(model=gemini_model_name, google_api_key=gemini_api_key)

class Main_agents():
    def Parser(self):
        return Agent(
            role='Parser',
            goal='Parse simple text into json with appropriate keys.',
            backstory="""Structure your output into a json format with intuitive keys in camelcase.  
            """,
            max_iter=15,
            verbose=True,
            llm=gemini_model,
            allow_delegation=False
        )
