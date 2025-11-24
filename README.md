# 🎥 Video Insight AI - YouTube Video Analyzer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/react-18+-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/flask-2.3+-000000.svg?logo=flask)](https://flask.palletsprojects.com/)
[![OpenAI](https://img.shields.io/badge/openai-API-412991.svg?logo=openai)](https://openai.com/)
[![Gemini](https://img.shields.io/badge/google-gemini-4285F4.svg?logo=googlegemini)](https://gemini.google.com/)

An intelligent YouTube video analysis tool powered by AI that provides comprehensive insights, summaries, and interactive features. Transform any YouTube video into structured knowledge with AI-powered analysis.

<p align="center">
  <img src="https://github.com/user-attachments/assets/placeholder-video-preview.png" alt="Video Insight AI Demo" width="800">
</p>

## ✨ Features

### 🎬 Core Functionality
- **AI-Powered Analysis**: Get detailed summaries, key insights, and study notes from any YouTube video
- **Smart Transcription**: Automatic transcript extraction or audio transcription using OpenAI Whisper
- **Interactive Chapters**: AI-generated chapters with clickable timestamps
- **Theme Extraction**: Identify main topics and themes covered in videos
- **Study Notes**: Comprehensive notes formatted for learning

### 🚀 Enhanced UI Features
- **Embedded Video Player**: Watch videos directly while reading analysis
- **Clickable Timestamps**: Jump to any moment in the video with one click
- **Tabbed Interface**: Organized content with Summary, Themes, Notes, and Insights tabs
- **Markdown Formatting**: Clean, readable content with proper typography
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Sticky Navigation**: Chapter sidebar stays visible while scrolling

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Modern icon library

### Backend
- **Flask** - Python web framework
- **OpenAI Whisper** - Audio transcription
- **Multiple LLM Support**:
  - OpenAI GPT
  - Google Gemini
  - Groq
- **YouTube API Integration**
- **pytube** - Video metadata extraction

## 📦 Installation

### Quick Start (Windows)

Simply double-click `start.bat` in the project root. It will:
1. Create virtual environment (if needed)
2. Install all dependencies
3. Start both backend and frontend servers
4. Open the app in your browser

### Manual Installation

#### Prerequisites
- Node.js 16+
- Python 3.8+
- FFmpeg (for Whisper transcription)

#### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your API keys

# Start server
python app.py
```

## ⚙️ Configuration

Create a `.env` file in the `backend` directory:

```env
# Choose your LLM provider
LLM_PROVIDER=gemini  # Options: openai, gemini, groq

# API Keys (add at least one)
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here

# Whisper Settings
WHISPER_MODEL=base  # Options: tiny, base, small, medium, large

# Video Settings
MAX_VIDEO_LENGTH=3600  # Maximum length in seconds (default: 1 hour)
```

## 🎯 Usage

1. **Start the Application**
   - Run `start.bat` (Windows) or start servers manually
   - Open http://localhost:5173 in your browser

2. **Analyze a Video**
   - Paste any YouTube URL into the input field
   - Click "Analyze Video"
   - Wait for AI to process the content

3. **Explore Results**
   - **Watch Video**: Embedded player shows the video
   - **Click Timestamps**: Jump to specific moments
   - **Switch Tabs**: View Summary, Themes, Notes, or Insights
   - **Read Formatted Content**: Enjoy clean markdown formatting

## 📝 API Endpoints

### Analyze Video
```
POST /api/analyze-video
Content-Type: application/json

{
  "youtube_url": "https://www.youtube.com/watch?v=..."
}

Response:
{
  "videoId": "...",
  "videoTitle": "...",
  "videoUrl": "...",
  "transcript": "...",
  "summary": "...",
  "chapters": [...],
  "themes": [...],
  "study_notes": "...",
  "insights": "..."
}
```

### Ask Question
```
POST /api/ask-question
Content-Type: application/json

{
  "question": "What is discussed about X?",
  "transcript": "..."
}

Response:
{
  "answer": "Based on the video..."
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI Whisper for audio transcription
- Lovable.dev for initial project scaffolding
- shadcn/ui for beautiful components
- The open-source community

## 📧 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Check the documentation in `/backend/README.md`

---
<p align="center">Made with ❤️ by the Video Insight AI team</p>