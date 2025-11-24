from flask import Blueprint, request, jsonify
import logging
from utils.youtube_utils import extract_video_id, is_valid_youtube_url, get_video_title
from services.transcript_service import TranscriptService
from services.whisper_service import WhisperService
from services.llm_service import LLMService
from config import Config

# Create blueprint
analyze_bp = Blueprint('analyze', __name__)

# Initialize services that don't depend on config
transcript_service = TranscriptService()
whisper_service = WhisperService(Config.WHISPER_MODEL)

# Note: LLMService will be initialized per request to ensure fresh config loading
logger = logging.getLogger(__name__)

@analyze_bp.route('/analyze-video', methods=['POST'])
def analyze_video():
    """
    Analyze a YouTube video:
    1. Extract YouTube video ID
    2. Try to fetch transcript using youtube-transcript-api
    3. If no transcript available -> download audio -> transcribe using Whisper
    4. Send transcript to LLM for analysis
    """
    try:
        # Initialize LLM service per request to ensure fresh config loading
        llm_service = LLMService()
        
        # Get JSON data from request
        data = request.get_json()
        
        if not data or 'youtube_url' not in data:
            return jsonify({'error': 'Missing youtube_url in request body'}), 400
        
        youtube_url = data['youtube_url']
        
        # Validate YouTube URL
        if not is_valid_youtube_url(youtube_url):
            return jsonify({'error': 'Invalid YouTube URL'}), 400
        
        # Extract video ID
        video_id = extract_video_id(youtube_url)
        if not video_id:
            return jsonify({'error': 'Could not extract video ID from URL'}), 400
        
        logger.info(f"Analyzing video with ID: {video_id}")
        
        # Get video title
        video_title = get_video_title(youtube_url)
        if not video_title:
            video_title = f"YouTube Video {video_id}"
        
        # Try to get transcript
        transcript_result = transcript_service.get_transcript(video_id)
        
        # If transcript not available, use Whisper
        if not transcript_result['success']:
            logger.info("Transcript not available, using Whisper for transcription")
            whisper_result = whisper_service.transcribe_youtube_video(youtube_url)
            
            if not whisper_result['success']:
                return jsonify({
                    'error': 'Failed to transcribe video',
                    'details': whisper_result.get('error', 'Unknown error'),
                    'suggestion': 'Try another video URL or check if the video has audio content available.'
                }), 400
            
            transcript_text = whisper_result['text']
        else:
            transcript_text = transcript_result['text']
        
        # Clean transcript text
        if not transcript_text or not transcript_text.strip():
            return jsonify({
                'error': 'No content found in video',
                'suggestion': 'The video may not have any audio content or transcription available.'
            }), 400
        
        # Process with LLM
        try:
            summary = llm_service.generate_summary(transcript_text)
            chapters = llm_service.generate_chapters(transcript_text)
            themes = llm_service.generate_topics(transcript_text)
            study_notes = llm_service.generate_notes(transcript_text)
            insights = llm_service.generate_insights(transcript_text)
            
            # Return results with video metadata
            return jsonify({
                'videoId': video_id,
                'videoTitle': video_title,
                'videoUrl': youtube_url,
                'transcript': transcript_text[:5000],  # Include first 5000 chars of transcript
                'summary': summary,
                'chapters': chapters,
                'themes': themes,
                'study_notes': study_notes,
                'insights': insights
            })
        except Exception as e:
            logger.error(f"LLM processing failed: {str(e)}")
            return jsonify({
                'error': 'Failed to process video content with AI',
                'details': str(e),
                'suggestion': 'Try again later or with a different video.'
            }), 500
            
    except Exception as e:
        logger.error(f"Unexpected error in analyze_video: {str(e)}")
        return jsonify({
            'error': 'An unexpected error occurred',
            'details': str(e),
            'suggestion': 'Please try again later or contact support if the issue persists.'
        }), 500