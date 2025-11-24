from flask import Blueprint, request, jsonify
import logging
from services.llm_service import LLMService

# Create blueprint
ask_bp = Blueprint('ask', __name__)

# Note: LLMService will be initialized per request to ensure fresh config loading
logger = logging.getLogger(__name__)

@ask_bp.route('/ask-question', methods=['POST'])
def ask_question():
    """
    Answer a user question based on a video transcript.
    """
    try:
        # Initialize LLM service per request to ensure fresh config loading
        llm_service = LLMService()
        
        # Get JSON data from request
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({'error': 'Request body must be JSON'}), 400
        
        if 'question' not in data:
            return jsonify({'error': 'Missing question in request body'}), 400
        
        if 'transcript' not in data:
            return jsonify({'error': 'Missing transcript in request body'}), 400
        
        question = data['question']
        transcript = data['transcript']
        
        # Validate inputs
        if not question or not isinstance(question, str):
            return jsonify({'error': 'Question must be a non-empty string'}), 400
        
        if not transcript or not isinstance(transcript, str):
            return jsonify({'error': 'Transcript must be a non-empty string'}), 400
        
        # Answer the question using LLM
        try:
            answer = llm_service.answer_question(transcript, question)
            
            # Return results
            return jsonify({
                'answer': answer
            })
        except Exception as e:
            logger.error(f"LLM failed to answer question: {str(e)}")
            return jsonify({
                'error': 'Failed to process question with AI',
                'details': str(e)
            }), 500
            
    except Exception as e:
        logger.error(f"Unexpected error in ask_question: {str(e)}")
        return jsonify({
            'error': 'An unexpected error occurred',
            'details': str(e)
        }), 500