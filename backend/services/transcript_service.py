from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    TranscriptsDisabled, 
    NoTranscriptFound,
    VideoUnavailable,
    InvalidVideoId,
    YouTubeTranscriptApiException
)
import logging

logger = logging.getLogger(__name__)

class TranscriptService:
    def __init__(self):
        """Initialize the TranscriptService."""
        # No need to create an instance, we'll use the static methods
        pass
    
    def get_transcript(self, video_id):
        """
        Fetch transcript for a YouTube video.
        
        Args:
            video_id (str): YouTube video ID
            
        Returns:
            dict: Contains 'success' boolean, 'text' transcript text, and 'segments' raw segments
        """
        try:
            # Try to get the transcript
            fetched_transcript = YouTubeTranscriptApi().fetch(video_id)
            
            # Extract snippets from the fetched transcript
            transcript_snippets = fetched_transcript.snippets
            
            # Convert snippets to the format we need
            transcript_list = []
            for snippet in transcript_snippets:
                transcript_list.append({
                    'text': snippet.text,
                    'start': snippet.start,
                    'duration': snippet.duration
                })
            
            # Combine all text segments
            transcript_text = ' '.join([entry['text'] for entry in transcript_list])
            
            return {
                'success': True,
                'text': transcript_text.strip(),
                'segments': transcript_list
            }
        except NoTranscriptFound:
            logger.warning(f"No transcript found for video {video_id}")
            return {
                'success': False,
                'error': 'No transcript available for this video',
                'text': '',
                'segments': []
            }
        except TranscriptsDisabled:
            logger.warning(f"Transcripts disabled for video {video_id}")
            return {
                'success': False,
                'error': 'Transcripts are disabled for this video',
                'text': '',
                'segments': []
            }
        except InvalidVideoId:
            logger.warning(f"Invalid video ID: {video_id}")
            return {
                'success': False,
                'error': 'Invalid YouTube video ID',
                'text': '',
                'segments': []
            }
        except VideoUnavailable:
            logger.warning(f"Video unavailable: {video_id}")
            return {
                'success': False,
                'error': 'Video is unavailable',
                'text': '',
                'segments': []
            }
        except YouTubeTranscriptApiException as e:
            logger.warning(f"YouTubeTranscriptApiException for video {video_id}: {str(e)}")
            return {
                'success': False,
                'error': f'Transcript API error: {str(e)}',
                'text': '',
                'segments': []
            }
        except Exception as e:
            logger.error(f"Error fetching transcript for video {video_id}: {str(e)}")
            return {
                'success': False,
                'error': f'Failed to fetch transcript: {str(e)}',
                'text': '',
                'segments': []
            }