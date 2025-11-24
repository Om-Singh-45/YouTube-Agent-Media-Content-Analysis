import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # API Keys (use placeholders or load from environment)
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', 'YOUR_OPENAI_API_KEY')
    GROQ_API_KEY = os.getenv('GROQ_API_KEY', 'YOUR_GROQ_API_KEY')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'YOUR_GEMINI_API_KEY')
    
    # Whisper configuration
    WHISPER_MODEL = os.getenv('WHISPER_MODEL', 'base')  # tiny, base, small, medium, large
    
    # YouTube configuration
    MAX_VIDEO_LENGTH = int(os.getenv('MAX_VIDEO_LENGTH', 3600))  # in seconds, default 1 hour
    
    # LLM Provider (openai, gemini, groq)
    LLM_PROVIDER = os.getenv('LLM_PROVIDER', 'openai').lower()
