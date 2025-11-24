import logging
import json
from config import Config
import os

# Conditional imports based on provider
try:
    import openai
except ImportError:
    openai = None

try:
    import google.generativeai as genai
except ImportError:
    genai = None

try:
    from groq import Groq
except ImportError:
    Groq = None

logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self):
        """
        Initialize LLM service with configuration.
        """
        self.config = Config()
        self.provider = self.config.LLM_PROVIDER
        
        # Log the provider and API key for debugging
        logger.info(f"LLM Provider: {self.provider}")
        
        # Check all possible sources of API key
        env_gemini_key = os.getenv('GEMINI_API_KEY')
        config_gemini_key = self.config.GEMINI_API_KEY
        
        logger.info(f"Environment GEMINI_API_KEY: {env_gemini_key[:10] if env_gemini_key else 'NOT_SET'}")
        logger.info(f"Config GEMINI_API_KEY: {config_gemini_key[:10] if config_gemini_key else 'NOT_SET'}")
        
        # Initialize the appropriate client based on provider
        if self.provider == 'openai' and self.config.OPENAI_API_KEY != 'YOUR_OPENAI_API_KEY':
            if openai:
                self.openai_client = openai.OpenAI(api_key=self.config.OPENAI_API_KEY)
                logger.info("OpenAI client initialized")
            else:
                logger.warning("OpenAI library not installed")
                self.openai_client = None
        elif self.provider == 'gemini':
            # For Gemini, check both config and environment variable
            gemini_key = self.config.GEMINI_API_KEY
            if gemini_key == 'YOUR_GEMINI_API_KEY':
                gemini_key = os.getenv('GEMINI_API_KEY', 'YOUR_GEMINI_API_KEY')
            
            logger.info(f"Using Gemini API Key: {gemini_key[:10] if gemini_key != 'YOUR_GEMINI_API_KEY' else 'NOT_SET'}")
            
            if gemini_key != 'YOUR_GEMINI_API_KEY' and genai:
                try:
                    genai.configure(api_key=gemini_key)
                    # Use gemini-flash-latest which is more commonly available
                    self.gemini_model = genai.GenerativeModel('gemini-flash-latest')
                    logger.info("Gemini client initialized successfully")
                except Exception as e:
                    logger.error(f"Failed to initialize Gemini client: {e}")
                    self.gemini_model = None
            else:
                logger.warning("Google Generative AI library not installed or API key not set")
                self.gemini_model = None
        elif self.provider == 'groq' and self.config.GROQ_API_KEY != 'YOUR_GROQ_API_KEY':
            if Groq:
                self.groq_client = Groq(api_key=self.config.GROQ_API_KEY)
                logger.info("Groq client initialized")
            else:
                logger.warning("Groq library not installed")
                self.groq_client = None
        else:
            # Use placeholder mode
            self.openai_client = None
            self.gemini_model = None
            self.groq_client = None
            logger.info("Using placeholder mode for LLM responses")
    
    def _call_llm(self, prompt, max_tokens=1000):
        """
        Call the configured LLM API.
        
        Args:
            prompt (str): The prompt to send to the LLM
            max_tokens (int): Maximum number of tokens to generate
            
        Returns:
            str: LLM response
        """
        try:
            # Use real API if configured
            if self.provider == 'openai' and self.openai_client:
                logger.info("Calling OpenAI API")
                response = self.openai_client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant that analyzes YouTube video content."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=max_tokens,
                    temperature=0.7
                )
                return response.choices[0].message.content.strip()
            
            elif self.provider == 'gemini' and self.gemini_model:
                logger.info("Calling Google Gemini API")
                response = self.gemini_model.generate_content(prompt)
                return response.text.strip()
            
            elif self.provider == 'groq' and self.groq_client:
                logger.info("Calling Groq API")
                response = self.groq_client.chat.completions.create(
                    model="llama3-8b-8192",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant that analyzes YouTube video content."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=max_tokens,
                    temperature=0.7
                )
                return response.choices[0].message.content.strip()
            
            else:
                # Fallback to placeholder implementation
                logger.info("Using placeholder implementation")
                return self._placeholder_response(prompt)
                
        except Exception as e:
            logger.error(f"LLM API call failed: {str(e)}")
            # Fallback to placeholder
            return self._placeholder_response(prompt)
    
    def _placeholder_response(self, prompt):
        """
        Placeholder method to simulate calling an LLM API.
        
        Args:
            prompt (str): The prompt that would be sent to the LLM
            
        Returns:
            str: Simulated LLM response
        """
        # Return a simulated response based on the prompt
        if "summary" in prompt.lower():
            return "This is a detailed summary of the video content. The speaker discusses various important topics related to the subject matter."
        elif "chapter" in prompt.lower():
            return "[{\"timestamp\": \"00:00\", \"title\": \"Introduction\"}, {\"timestamp\": \"05:30\", \"title\": \"Main Topic\"}, {\"timestamp\": \"12:15\", \"title\": \"Conclusion\"}]"
        elif "theme" in prompt.lower() or "topic" in prompt.lower():
            return "[\"Main Theme 1\", \"Main Theme 2\", \"Supporting Topic\"]"
        elif "note" in prompt.lower():
            return "These are important study notes from the video:\n1. Key Point 1\n2. Key Point 2\n3. Key Point 3"
        elif "insight" in prompt.lower():
            return "Additional insights from the video:\n- Insight 1\n- Insight 2\n- Insight 3"
        elif "question" in prompt.lower():
            return "Based on the video content, the speaker said the following about your question..."
        else:
            return "This is a simulated response from the LLM. In a real implementation, this would be replaced with actual LLM output."
    
    def generate_summary(self, transcript):
        """
        Generate a detailed summary of the video content.
        
        Args:
            transcript (str): Video transcript
            
        Returns:
            str: Detailed summary in markdown format
        """
        try:
            prompt = f"""Provide a detailed summary of the following video transcript. Format your response in clean markdown:
- Use bullet points for key points
- Use bold (**text**) for important terms
- Keep it well-structured and easy to read
- Do NOT include special characters like asterisks at the start/end
- Write in clear, concise paragraphs

Transcript:
{transcript[:4000]}"""
            return self._call_llm(prompt, max_tokens=500)
        except Exception as e:
            logger.error(f"Failed to generate summary: {str(e)}")
            raise
    
    def generate_chapters(self, transcript):
        """
        Generate timestamp-based chapters from the transcript.
        
        Args:
            transcript (str): Video transcript
            
        Returns:
            list: List of chapters with timestamps and titles
        """
        try:
            prompt = f"""Based on the following transcript, create 5-8 timestamp-based chapters with descriptive titles.

IMPORTANT: Return ONLY a valid JSON array with this exact format:
[{{"timestamp": "00:00", "title": "Introduction"}}, {{"timestamp": "05:30", "title": "Main Topic"}}]

Rules:
- Use MM:SS or HH:MM:SS format for timestamps
- Make titles clear and descriptive
- Return ONLY the JSON array, no other text

Transcript:
{transcript[:4000]}"""
            response = self._call_llm(prompt, max_tokens=400)
            
            # Clean response - remove markdown code blocks if present
            cleaned = response.strip()
            if cleaned.startswith('```'):
                lines = cleaned.split('\n')
                cleaned = '\n'.join(lines[1:-1]) if len(lines) > 2 else cleaned
            
            # Try to parse as JSON array
            try:
                chapters = json.loads(cleaned)
                # Ensure it's a list and has the right structure
                if isinstance(chapters, list) and len(chapters) > 0:
                    return chapters
            except:
                pass
            
            # If parsing fails, return a default structure
            return [
                {"timestamp": "00:00", "title": "Introduction"},
                {"timestamp": "05:30", "title": "Main Content"},
                {"timestamp": "15:45", "title": "Conclusion"}
            ]
        except Exception as e:
            logger.error(f"Failed to generate chapters: {str(e)}")
            # Return default chapters
            return [
                {"timestamp": "00:00", "title": "Introduction"},
                {"timestamp": "05:30", "title": "Main Content"},
                {"timestamp": "15:45", "title": "Conclusion"}
            ]
    
    def generate_topics(self, transcript):
        """
        Generate themes and topics discussed in the video.
        
        Args:
            transcript (str): Video transcript
            
        Returns:
            list: List of themes/topics
        """
        try:
            prompt = f"Identify the main themes and topics discussed in this video. Return as a JSON array of strings:\n\n{transcript[:4000]}"
            response = self._call_llm(prompt, max_tokens=200)
            
            # Try to parse as JSON array
            try:
                return json.loads(response)
            except:
                # If JSON parsing fails, split by comma and clean up
                topics = [topic.strip() for topic in response.split(',') if topic.strip()]
                return topics if topics else ["Main Theme", "Supporting Topics"]
        except Exception as e:
            logger.error(f"Failed to generate topics: {str(e)}")
            return ["Default Theme 1", "Default Theme 2"]
    
    def generate_notes(self, transcript):
        """
        Generate study notes from the video content.
        
        Args:
            transcript (str): Video transcript
            
        Returns:
            str: Study notes in markdown format
        """
        try:
            prompt = f"""Create comprehensive study notes from this video transcript. Format in clean markdown:

- Use ## for section headings
- Use bullet points (-) for key points
- Use numbered lists (1.) for sequential information
- Use **bold** for important terms
- Keep it well-organized and scannable
- Do NOT use excessive special characters

Transcript:
{transcript[:4000]}"""
            return self._call_llm(prompt, max_tokens=500)
        except Exception as e:
            logger.error(f"Failed to generate study notes: {str(e)}")
            return "Default study notes would appear here in a real implementation."
    
    def generate_insights(self, transcript):
        """
        Generate additional insights from the video content.
        
        Args:
            transcript (str): Video transcript
            
        Returns:
            str: Additional insights in markdown format
        """
        try:
            prompt = f"""Extract key insights, takeaways, and actionable advice from this video. Format in clean markdown:

- Use ## for section headings like "Key Insights" or "Actionable Takeaways"
- Use bullet points (-) for each insight
- Use **bold** for important concepts
- Keep insights concise and actionable
- Avoid unnecessary special characters

Transcript:
{transcript[:4000]}"""
            return self._call_llm(prompt, max_tokens=400)
        except Exception as e:
            logger.error(f"Failed to generate insights: {str(e)}")
            return "Additional insights would appear here in a real implementation."
    
    def answer_question(self, transcript, question):
        """
        Answer a user question based on the video transcript.
        
        Args:
            transcript (str): Video transcript
            question (str): User's question
            
        Returns:
            str: Answer to the question
        """
        try:
            prompt = f"Based on the following transcript, answer this question: {question}\n\nTranscript:\n{transcript[:3000]}"
            return self._call_llm(prompt, max_tokens=300)
        except Exception as e:
            logger.error(f"Failed to answer question: {str(e)}")
            return "I couldn't process that question. Please try rephrasing."