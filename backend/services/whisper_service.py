import os
import logging
from pytube import YouTube
from pytube.exceptions import VideoUnavailable, RegexMatchError
import whisper

logger = logging.getLogger(__name__)

class WhisperService:
    def __init__(self, model_size='base'):
        """
        Initialize Whisper service.
        
        Args:
            model_size (str): Size of the Whisper model (tiny, base, small, medium, large)
        """
        self.model_size = model_size
        self.model = None
    
    def load_model(self):
        """Load the Whisper model if not already loaded."""
        if self.model is None:
            try:
                logger.info(f"Loading Whisper model: {self.model_size}")
                self.model = whisper.load_model(self.model_size)
                logger.info("Whisper model loaded successfully")
            except Exception as e:
                logger.error(f"Failed to load Whisper model: {str(e)}")
                raise
    
    def download_audio(self, video_url, output_path='temp'):
        """
        Download audio from YouTube video.
        
        Args:
            video_url (str): YouTube video URL
            output_path (str): Directory to save the audio file
            
        Returns:
            str: Path to the downloaded audio file
        """
        try:
            # Create temp directory if it doesn't exist
            if not os.path.exists(output_path):
                os.makedirs(output_path)
            
            # Download audio
            yt = YouTube(video_url)
            audio_stream = yt.streams.filter(only_audio=True).first()
            
            # Check if video is available
            if audio_stream is None:
                raise VideoUnavailable("No audio streams available for this video")
            
            # Download the audio file
            audio_file = audio_stream.download(output_path=output_path)
            
            logger.info(f"Audio downloaded successfully: {audio_file}")
            return audio_file
        except VideoUnavailable as e:
            logger.error(f"Video unavailable: {str(e)}")
            raise Exception(f"Video is unavailable or restricted: {str(e)}")
        except RegexMatchError as e:
            logger.error(f"Invalid YouTube URL format: {str(e)}")
            raise Exception(f"Invalid YouTube URL format: {str(e)}")
        except Exception as e:
            logger.error(f"Failed to download audio: {str(e)}")
            raise Exception(f"Failed to download audio: {str(e)}. The video may be restricted or unavailable.")
    
    def transcribe_audio(self, audio_file_path):
        """
        Transcribe audio file using Whisper.
        
        Args:
            audio_file_path (str): Path to the audio file
            
        Returns:
            dict: Contains 'success' boolean, 'text' transcript text, and 'segments' raw segments
        """
        try:
            if self.model is None:
                self.load_model()
            
            logger.info(f"Transcribing audio: {audio_file_path}")
            result = self.model.transcribe(audio_file_path)
            
            # Clean up the text
            transcript_text = result['text'].strip()
            
            logger.info("Audio transcribed successfully")
            return {
                'success': True,
                'text': transcript_text,
                'segments': result.get('segments', [])
            }
        except Exception as e:
            logger.error(f"Failed to transcribe audio: {str(e)}")
            return {
                'success': False,
                'error': f'Failed to transcribe audio: {str(e)}',
                'text': '',
                'segments': []
            }
    
    def transcribe_youtube_video(self, video_url):
        """
        Download and transcribe a YouTube video.
        
        Args:
            video_url (str): YouTube video URL
            
        Returns:
            dict: Contains 'success' boolean, 'text' transcript text, and 'segments' raw segments
        """
        temp_audio_file = None
        try:
            # Download audio
            temp_audio_file = self.download_audio(video_url)
            
            # Transcribe audio
            result = self.transcribe_audio(temp_audio_file)
            
            # Clean up temporary file
            if temp_audio_file and os.path.exists(temp_audio_file):
                os.remove(temp_audio_file)
            
            return result
        except Exception as e:
            # Clean up temporary file if it exists
            if temp_audio_file and os.path.exists(temp_audio_file):
                os.remove(temp_audio_file)
            
            logger.error(f"Failed to transcribe YouTube video: {str(e)}")
            return {
                'success': False,
                'error': f'Failed to transcribe YouTube video: {str(e)}',
                'text': '',
                'segments': []
            }