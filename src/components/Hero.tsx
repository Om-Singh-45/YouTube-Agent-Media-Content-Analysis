import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles, Youtube, ArrowRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

interface HeroProps {
  onAnalyze: (url: string) => void;
}

const Hero = ({ onAnalyze }: HeroProps) => {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-effect mb-6 sm:mb-8 animate-fade-in hover:scale-105 transition-transform duration-300 border border-primary/20">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Powered by Advanced AI
          </span>
        </div>

        {/* Main Heading - Responsive Typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 animate-fade-in leading-tight px-4" style={{ animationDelay: "0.1s" }}>
          Transform YouTube Videos
          <span className="block mt-2 sm:mt-3 bg-gradient-primary bg-clip-text text-transparent text-shadow-glow">
            into Actionable Insights
          </span>
        </h1>

        {/* Subtitle - Responsive */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto animate-fade-in leading-relaxed font-light px-4" style={{ animationDelay: "0.2s" }}>
          Instantly analyze any YouTube video with AI. Get detailed summaries, precise timestamps, key themes, study notes, and actionable insights.
        </p>

        {/* Enhanced Input Form - Fully Responsive */}
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in px-4"
          style={{ animationDelay: "0.3s" }}
        >
          <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
            {/* Glow effect on focus */}
            <div className={`absolute -inset-1 bg-gradient-primary rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${isFocused ? 'opacity-50' : ''}`} />
            
            <div className="relative flex flex-col sm:flex-row gap-3 p-2 sm:p-3 rounded-2xl sm:rounded-3xl glass-effect shadow-2xl border border-border/30">
              <div className="relative flex-1">
                <Youtube className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                <Input
                  type="text"
                  placeholder="Paste YouTube URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="pl-12 sm:pl-14 pr-4 h-14 sm:h-16 md:h-20 bg-transparent border-0 text-foreground text-base sm:text-lg md:text-xl placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 sm:h-16 md:h-20 px-6 sm:px-8 md:px-10 bg-gradient-primary hover:opacity-90 transition-all duration-300 font-semibold text-base sm:text-lg md:text-xl group/btn shadow-glow-primary rounded-xl sm:rounded-2xl hover:shadow-glow-secondary hover:scale-105"
              >
                <span className="hidden sm:inline">Analyze Video</span>
                <span className="sm:hidden">Analyze</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Helper Text */}
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground/80 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            ✨ Free to use • 🚀 Instant results • 🔒 Secure & private
          </p>
        </form>

        {/* Enhanced Features Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto animate-fade-in px-4" style={{ animationDelay: "0.5s" }}>
          {[
            { label: "AI Summaries", color: "primary", icon: "🤖" },
            { label: "Timestamps", color: "secondary", icon: "⏱️" },
            { label: "Study Notes", color: "accent", icon: "📝" },
            { label: "Key Insights", color: "primary", icon: "💡" },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl glass-effect hover:scale-105 transition-all duration-300 group cursor-pointer border border-border/20 hover:border-primary/30"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </span>
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-${feature.color} animate-pulse`} />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators - New Section */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          {[
            { label: "50K+ Users", icon: "👥" },
            { label: "1M+ Videos", icon: "📹" },
            { label: "4.9★ Rating", icon: "⭐" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <span className="text-lg sm:text-xl">{stat.icon}</span>
              <span className="text-xs sm:text-sm font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
