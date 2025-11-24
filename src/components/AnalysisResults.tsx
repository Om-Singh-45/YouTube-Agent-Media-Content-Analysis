import { useState } from "react";
import { FileText, Clock, Lightbulb, BookOpen, Target, Download, ExternalLink, PlayCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AnalysisResponse } from "@/services/api";
import VideoPlayer from "./VideoPlayer";
import MarkdownContent from "./MarkdownContent";

interface AnalysisResultsProps {
  data: AnalysisResponse | null;
  loading: boolean;
}

const SkeletonLoader = () => (
  <div className="space-y-3">
    <div className="h-4 bg-muted/50 rounded animate-shimmer bg-gradient-to-r from-muted/30 via-muted/60 to-muted/30 bg-[length:200%_100%]" />
    <div className="h-4 bg-muted/50 rounded animate-shimmer bg-gradient-to-r from-muted/30 via-muted/60 to-muted/30 bg-[length:200%_100%]" style={{ animationDelay: "0.1s" }} />
    <div className="h-4 bg-muted/50 rounded w-3/4 animate-shimmer bg-gradient-to-r from-muted/30 via-muted/60 to-muted/30 bg-[length:200%_100%]" style={{ animationDelay: "0.2s" }} />
  </div>
);

const AnalysisResults = ({ data, loading }: AnalysisResultsProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  
  if (!loading && !data) return null;

  // Convert timestamp (MM:SS or HH:MM:SS) to seconds
  const timestampToSeconds = (timestamp: string): number => {
    const parts = timestamp.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
  };

  const handleTimestampClick = (timestamp: string) => {
    const seconds = timestampToSeconds(timestamp);
    setCurrentTime(seconds);
    // Scroll to video player
    document.querySelector('#video-player')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-foreground">Analysis Results</h2>
            <p className="text-lg text-muted-foreground">AI-powered insights from your video</p>
          </div>
          {!loading && data && (
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="gap-2 hover:scale-105 transition-transform duration-300 glass-effect"
                onClick={() => window.open(data.videoUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Open Video
              </Button>
              <Button className="gap-2 bg-gradient-primary hover:opacity-90 shadow-glow-primary hover:scale-105 transition-all duration-300">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          )}
        </div>

        {/* Video Player Section */}
        {!loading && data && (
          <div id="video-player" className="mb-12 animate-fade-in">
            <VideoPlayer 
              videoId={data.videoId} 
              videoTitle={data.videoTitle}
              currentTime={currentTime}
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chapters with clickable timestamps */}
          <div className="lg:col-span-1">
            <Card className="glass-effect border-border/50 hover:border-secondary/30 transition-all duration-300 animate-fade-in sticky top-4" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground text-xl">Chapters</CardTitle>
                    <CardDescription className="text-muted-foreground">Click to jump to timestamp</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {loading ? (
                    <SkeletonLoader />
                  ) : (
                    <div className="space-y-2">
                      {data?.chapters.map((chapter, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimestampClick(chapter.timestamp)}
                          className="w-full flex items-start gap-3 p-3 rounded-lg glass-effect hover:bg-secondary/10 transition-all duration-300 cursor-pointer group border border-transparent hover:border-secondary/30 text-left"
                        >
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <PlayCircle className="h-4 w-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm font-mono font-semibold text-secondary px-2 py-1 rounded bg-secondary/10">
                              {chapter.timestamp}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1 leading-relaxed">
                            {chapter.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analysis Content with Tabs */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-border/50 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6">
                {loading ? (
                  <div className="space-y-6">
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </div>
                ) : (
                  <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="summary" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Summary
                      </TabsTrigger>
                      <TabsTrigger value="themes" className="gap-2">
                        <Target className="h-4 w-4" />
                        Themes
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Notes
                      </TabsTrigger>
                      <TabsTrigger value="insights" className="gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Insights
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">Video Summary</h3>
                          <p className="text-sm text-muted-foreground mb-6">Comprehensive overview of the video content</p>
                        </div>
                        <ScrollArea className="h-[600px] pr-4">
                          <MarkdownContent content={data?.summary || ''} />
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent value="themes" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">Themes & Topics</h3>
                          <p className="text-sm text-muted-foreground mb-6">Main subjects covered in the video</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {data?.themes.map((theme, index) => (
                            <div
                              key={index}
                              className="group relative"
                            >
                              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity" />
                              <span className="relative px-5 py-3 rounded-full glass-effect border border-primary/20 text-base font-medium text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-default inline-block">
                                {theme}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">Study Notes</h3>
                          <p className="text-sm text-muted-foreground mb-6">Key takeaways and important points</p>
                        </div>
                        <ScrollArea className="h-[600px] pr-4">
                          <MarkdownContent content={data?.study_notes || ''} />
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent value="insights" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">Key Insights</h3>
                          <p className="text-sm text-muted-foreground mb-6">Actionable takeaways and deeper analysis</p>
                        </div>
                        <ScrollArea className="h-[600px] pr-4">
                          <MarkdownContent content={data?.insights || ''} />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;