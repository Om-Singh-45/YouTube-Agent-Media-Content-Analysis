import sys
sys.path.append('backend')

from services.transcript_service import TranscriptService

# Test the transcript service directly
service = TranscriptService()
video_id = "jNQXAC9IVRw"  # First YouTube video

print(f"Testing transcript service for video ID: {video_id}")
result = service.get_transcript(video_id)

print(f"Success: {result['success']}")
if result['success']:
    print(f"Transcript length: {len(result['text'])} characters")
    print(f"First 200 characters: {result['text'][:200]}")
    print(f"Number of segments: {len(result['segments'])}")
else:
    print(f"Error: {result['error']}")