import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import UseCases from "@/components/UseCases";
import AnalysisResults from "@/components/AnalysisResults";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { videoApi, AnalysisResponse } from "@/services/api";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    
    // Show loading toast
    toast({
      title: "Analyzing Video",
      description: "AI is processing your YouTube video...",
    });

    try {
      // Call the actual API
      const data = await videoApi.analyzeVideo({ youtube_url: url });
      
      setAnalysisData(data);
      setLoading(false);

      toast({
        title: "Analysis Complete!",
        description: "Your video analysis is ready to view.",
      });

      // Scroll to results
      setTimeout(() => {
        document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: any) {
      setLoading(false);
      
      // Extract error message and suggestion from the response
      const errorMessage = error.response?.data?.error || "Failed to analyze the video";
      const suggestion = error.response?.data?.suggestion || "Please try again with a different video.";
      
      toast({
        title: "Analysis Failed",
        description: `${errorMessage}. ${suggestion}`,
        variant: "destructive",
      });
      
      console.error("Analysis error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero onAnalyze={handleAnalyze} />
        
        {/* Analysis Results - Shown right after Hero when available */}
        <div id="results">
          <AnalysisResults data={analysisData} loading={loading} />
        </div>
        
        {/* Show other sections only when no analysis is in progress or shown */}
        {!loading && !analysisData && (
          <>
            <Stats />
            <Features />
            <HowItWorks />
            <UseCases />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;