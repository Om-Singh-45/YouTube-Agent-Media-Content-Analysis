import { Brain, Clock, BookOpen, Sparkles, Zap, Target } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms extract key insights and generate comprehensive summaries from any YouTube video.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Clock,
      title: "Smart Timestamps",
      description: "Automatically detect and generate precise timestamps for key moments, chapters, and topic transitions in videos.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: BookOpen,
      title: "Study Notes Generation",
      description: "Transform video content into structured study materials, perfect for students and professionals.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Sparkles,
      title: "Theme Detection",
      description: "Identify main themes, topics, and concepts discussed throughout the video with contextual understanding.",
      gradient: "from-primary to-accent",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process videos in seconds with our optimized AI pipeline. Get results faster than watching the video.",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Target,
      title: "Actionable Insights",
      description: "Extract key takeaways and actionable insights that help you apply the knowledge immediately.",
      gradient: "from-accent to-secondary",
    },
  ];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Everything You Need to
            <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent">
              Master Video Content
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge AI technology to analyze, understand, and extract value from any YouTube video in seconds.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full p-8 rounded-2xl glass-effect hover:scale-105 transition-all duration-500 cursor-pointer">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-glow-primary group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-primary group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
