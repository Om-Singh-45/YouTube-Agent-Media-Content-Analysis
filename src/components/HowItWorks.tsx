import { Link, Upload, Cpu, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Link,
      number: "01",
      title: "Paste YouTube URL",
      description: "Simply copy and paste any YouTube video URL into our intelligent input field.",
      color: "primary",
    },
    {
      icon: Cpu,
      number: "02",
      title: "AI Processes Video",
      description: "Our advanced AI analyzes the video content, audio, and metadata to extract meaningful insights.",
      color: "secondary",
    },
    {
      icon: Upload,
      number: "03",
      title: "Get Instant Results",
      description: "Receive comprehensive summaries, timestamps, themes, study notes, and actionable insights in seconds.",
      color: "accent",
    },
    {
      icon: Download,
      number: "04",
      title: "Export & Share",
      description: "Download your analysis as a PDF report or share it with your team for collaborative learning.",
      color: "primary",
    },
  ];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How It
            <span className="ml-3 bg-gradient-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Four simple steps to transform any YouTube video into actionable knowledge.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative group animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative h-full">
                    {/* Card */}
                    <div className="relative p-8 rounded-2xl glass-effect hover:scale-105 transition-all duration-500">
                      {/* Number Badge */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center font-bold text-2xl text-primary-foreground shadow-glow-primary">
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        <div className="relative inline-flex">
                          <div className={`absolute inset-0 bg-${step.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                          <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-${step.color}/10 border-2 border-${step.color}/20 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`h-10 w-10 text-${step.color}`} />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Connecting Arrow (Desktop) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary opacity-40" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
