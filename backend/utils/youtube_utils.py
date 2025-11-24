import re
from urllib.parse import urlparse, parse_qs
import logging

try:
    from pytube import YouTube
except ImportError:
    YouTube = None

logger = logging.getLogger(__name__)

def extract_video_id(url):
    """
    Extract YouTube video ID from various YouTube URL formats.
    
    Args:
        url (str): YouTube video URL
        
    Returns:
        str: Video ID or None if not found
    """
    # Regular expressions for different YouTube URL formats
    patterns = [
        r'(?:https?://)?(?:www\.)?youtube\.com/watch\?v=([^&\n]+)',  # Standard URL
        r'(?:https?://)?(?:www\.)?youtu\.be/([^?\n]+)',              # Short URL
        r'(?:https?://)?(?:www\.)?youtube\.com/embed/([^?\n]+)',     # Embed URL
        r'(?:https?://)?(?:www\.)?youtube\.com/v/([^?\n]+)',         # Old embed URL
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    
    # Try parsing as query parameter
    try:
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.query)
        if 'v' in query_params:
            return query_params['v'][0]
    except Exception:
        pass
    
    return None

def is_valid_youtube_url(url):
    """
    Check if the provided URL is a valid YouTube URL.
    
    Args:
        url (str): URL to validate
        
    Returns:
        bool: True if valid YouTube URL, False otherwise
    """
    if not url or not isinstance(url, str):
        return False
    
    youtube_regex = (
        r'(?:https?://)?(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/v/)'
    )
    
    return bool(re.match(youtube_regex, url))

def get_video_title(url):
    """
    Get the title of a YouTube video.
    
    Args:
        url (str): YouTube video URL
        
    Returns:
        str: Video title or None if not found
    """
    if not YouTube:
        logger.warning("pytube not installed, cannot fetch video title")
        return None
    
    try:
        yt = YouTube(url)
        return yt.title
    except Exception as e:
        logger.error(f"Failed to get video title: {str(e)}")
        return None
