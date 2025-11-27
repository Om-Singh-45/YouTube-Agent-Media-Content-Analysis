# 🎥 Video Insight AI - YouTube Video Analyzer

An intelligent YouTube video analysis tool powered by AI that provides comprehensive insights, summaries, and interactive features.

![Version](https://img.shields.io/badge/version-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎬 Core Functionality
- **AI-Powered Analysis**: Get detailed summaries, key insights, and study notes from any YouTube video
- **Smart Transcription**: Automatic transcript extraction or audio transcription using OpenAI Whisper
- **Interactive Chapters**: AI-generated chapters with clickable timestamps
- **Theme Extraction**: Identify main topics and themes covered in videos
- **Study Notes**: Comprehensive notes formatted for learning

### 🚀 New UI Features (v2.0)
- **Embedded Video Player**: Watch videos directly while reading analysis
- **Clickable Timestamps**: Jump to any moment in the video with one click
- **Tabbed Interface**: Organized content with Summary, Themes, Notes, and Insights tabs
- **Markdown Formatting**: Clean, readable content with proper typography
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Sticky Navigation**: Chapter sidebar stays visible while scrolling

## 📦 Results
**HomePage**
<img width="1768" height="885" alt="Screenshot 2025-11-24 185004" src="https://github.com/user-attachments/assets/3d3ba74c-de00-439c-a298-71e98b2f9f54" />
<img width="1764" height="899" alt="Screenshot 2025-11-24 185203" src="https://github.com/user-attachments/assets/8d8cf3e6-23c9-4268-9367-232f00678ec2" />
<img width="1734" height="864" alt="Screenshot 2025-11-24 185227" src="https://github.com/user-attachments/assets/a7e3103e-790e-44a1-a9ca-98eb44a0000a" />

**Analysis Result**
<img width="1705" height="893" alt="Screenshot 2025-11-24 192341" src="https://github.com/user-attachments/assets/e19f2d13-084e-44ff-b545-2a2e0a2bba48" />


### Main Interface
The landing page features a clean, modern design with gradient effects and smooth animations.

### Analysis Results
- **Video Player**: Embedded YouTube player with fullscreen support
- **Chapters Sidebar**: Clickable timestamps for easy navigation
- **Tabbed Content**: Switch between different types of analysis
- **Formatted Text**: Markdown rendering with bullets, headings, and styling

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
- Node.js 16+ and npm
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

4. **Navigate with Chapters**
   - Click any timestamp in the sidebar
   - Video automatically seeks to that moment
   - Page scrolls to video player for easy viewing

## 🎨 UI/UX Improvements

### What's New in v2.0

#### Video Integration
- Embedded YouTube player with API controls
- Smooth timestamp navigation
- Fullscreen support
- Video metadata display

#### Content Formatting
- Custom markdown parser
- Clean typography
- Proper spacing and hierarchy
- Removed special characters and artifacts

#### Layout Enhancements
- 3-column responsive layout
- Sticky chapter sidebar
- Tabbed content organization
- Glass-morphism effects
- Smooth animations

#### Usability
- One-click timestamp jumping
- Better visual feedback
- Improved loading states
- Mobile-friendly design

## 🔧 Development

### Project Structure
```
video-insight-ai-main/
├── backend/
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   └── app.py           # Flask application
├── src/
│   ├── components/      # React components
│   │   ├── VideoPlayer.tsx        # NEW
│   │   ├── MarkdownContent.tsx    # NEW
│   │   └── AnalysisResults.tsx    # UPDATED
│   ├── pages/           # Page components
│   └── services/        # API client
└── start.bat            # Quick start script
```

### Key Components

**VideoPlayer.tsx**
- Embeds YouTube IFrame
- Handles timestamp seeking
- Manages player state

**MarkdownContent.tsx**
- Parses markdown syntax
- Renders formatted content
- Handles lists, headings, bold, italic

**AnalysisResults.tsx**
- Main results display
- Tabbed interface
- Chapter navigation
- Timestamp clicking

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway/AWS)
```bash
# Use Gunicorn for production
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables
Make sure to set all required environment variables in your deployment platform.

## 📝 API Documentation

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

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI Whisper for audio transcription
- Lovable.dev for initial project scaffolding
- shadcn/ui for beautiful components
- The open-source community

## 📧 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Check the documentation in `/backend/README.md`
- Review `UI_IMPROVEMENTS.md` for detailed UI changes

## 🔮 Roadmap

- [ ] Multi-language support
- [ ] Batch video analysis
- [ ] Export to PDF/Markdown
- [ ] User accounts and history
- [ ] Video comparison feature
- [ ] Custom AI prompts
- [ ] Quiz generation
- [ ] Collaborative notes
- [ ] Dark/light mode toggle

---

Made with ❤️ by the Video Insight AI team
