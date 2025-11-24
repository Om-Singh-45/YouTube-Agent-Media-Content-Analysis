# YouTube AI Video Analyzer - Backend

This is the Flask backend for the YouTube AI Video Analyzer application. It provides RESTful APIs for analyzing YouTube videos and answering questions about video content.

## Features

- YouTube video analysis with AI-powered insights
- Automatic transcript retrieval or audio transcription
- Detailed video summaries
- Timestamp-based chapter generation
- Theme and topic extraction
- Study notes generation
- Additional insights discovery
- Question answering based on video content

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── config.py           # Configuration settings
├── requirements.txt    # Python dependencies
├── routes/
│   ├── analyze.py      # Video analysis endpoint
│   └── ask.py          # Question answering endpoint
├── services/
│   ├── transcript_service.py  # YouTube transcript handling
│   ├── whisper_service.py     # Audio transcription with Whisper
│   └── llm_service.py         # AI language model interactions
└── utils/
    └── youtube_utils.py       # YouTube URL processing utilities
```

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- FFmpeg (required for Whisper audio processing)

### Installing FFmpeg

#### Windows:
1. Download FFmpeg from https://ffmpeg.org/download.html
2. Extract the archive
3. Add the `bin` directory to your system PATH

#### macOS:
```bash
brew install ffmpeg
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install ffmpeg
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd video-insight-ai-main/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:

   On Windows:
   ```bash
   venv\Scripts\activate
   ```

   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Install Whisper model (this will download the model on first use):
```bash
# The model will be automatically downloaded when first used
# You can pre-download it with:
python -c "import whisper; whisper.load_model('base')"
```

## Configuration

Create a `.env` file in the backend directory with your API keys:

```env
# Optional API keys for enhanced LLM capabilities
OPENAI_API_KEY=your_openai_api_key_here
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Whisper configuration
WHISPER_MODEL=base  # Options: tiny, base, small, medium, large

# YouTube configuration
MAX_VIDEO_LENGTH=3600  # Maximum video length in seconds (default: 1 hour)
```

## Running the Application

```bash
python app.py
```

The backend will start on `http://localhost:5000`.

## API Endpoints

### Analyze Video

```
POST /api/analyze-video
```

**Request Body:**
```json
{
  "youtube_url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "summary": "Detailed summary of the video content...",
  "chapters": [
    {"timestamp": "00:00", "title": "Introduction"},
    {"timestamp": "05:30", "title": "Main Topic"}
  ],
  "themes": ["Theme 1", "Theme 2"],
  "study_notes": "Key points and study notes...",
  "insights": "Additional insights from the video..."
}
```

### Ask Question

```
POST /api/ask-question
```

**Request Body:**
```json
{
  "question": "What did the speaker say about X?",
  "transcript": "Full transcript text here..."
}
```

**Response:**
```json
{
  "answer": "Based on the video content, the speaker said..."
}
```

## Error Handling

The API provides detailed error messages for various failure scenarios:

- Invalid YouTube URL
- Transcript not available
- Whisper transcription failures
- LLM processing errors
- Missing request parameters

All errors follow this format:
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Development

### Adding New Features

1. Create new routes in the `routes/` directory
2. Implement services in the `services/` directory
3. Add utility functions in the `utils/` directory
4. Update `app.py` to register new blueprints

### Logging

The application uses Python's built-in logging module. Logs are output to the console by default.

### Testing

To test the API endpoints, you can use tools like curl, Postman, or Insomnia.

Example curl request:
```bash
curl -X POST http://localhost:5000/api/analyze-video \
  -H "Content-Type: application/json" \
  -d '{"youtube_url": "https://www.youtube.com/watch?v=..."}'
```

## Deployment

For production deployment, consider using:

- Gunicorn as a WSGI server
- Nginx as a reverse proxy
- Docker for containerization
- Cloud platforms like Heroku, AWS, or Google Cloud

Example Gunicorn command:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on the GitHub repository.