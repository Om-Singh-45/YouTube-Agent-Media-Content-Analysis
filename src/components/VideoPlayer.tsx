import { useRef, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Play, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

interface VideoPlayerProps {
  videoId: string;
  videoTitle: string;
  currentTime?: number;
}

const VideoPlayer = ({ videoId, videoTitle, currentTime = 0 }: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if YouTube IFrame API is already loaded
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        setIsReady(true);
      };
    } else {
      setIsReady(true);
    }
  }, []);

  // Update video time when currentTime prop changes
  useEffect(() => {
    if (isReady && iframeRef.current && currentTime > 0) {
      const message = {
        event: 'command',
        func: 'seekTo',
        args: [currentTime, true]
      };
      iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), '*');
    }
  }, [currentTime, isReady]);

  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <Card className="glass-effect border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300">
      <div className="relative aspect-video bg-black">
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
          title={videoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="glass-effect"
            onClick={handleFullscreen}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Video Title */}
      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
            <Play className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
              {videoTitle}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">YouTube Video</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;
