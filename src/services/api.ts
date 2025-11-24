import axios from 'axios';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Video analysis request
export interface AnalyzeVideoRequest {
  youtube_url: string;
}

// Question request
export interface AskQuestionRequest {
  question: string;
  transcript: string;
}

// Analysis response
export interface AnalysisResponse {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  transcript: string;
  summary: string;
  chapters: Array<{
    timestamp: string;
    title: string;
  }>;
  themes: string[];
  study_notes: string;
  insights: string;
}

// Question response
export interface QuestionResponse {
  answer: string;
}

// Error response
export interface ErrorResponse {
  error: string;
  details?: string;
  suggestion?: string;
}

// API service functions
export const videoApi = {
  // Analyze a YouTube video
  analyzeVideo: async (data: AnalyzeVideoRequest): Promise<AnalysisResponse> => {
    try {
      const response = await apiClient.post<AnalysisResponse>('/analyze-video', data);
      return response.data;
    } catch (error) {
      console.error('Error analyzing video:', error);
      throw error;
    }
  },

  // Ask a question about a video
  askQuestion: async (data: AskQuestionRequest): Promise<QuestionResponse> => {
    try {
      const response = await apiClient.post<QuestionResponse>('/ask-question', data);
      return response.data;
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  },
};