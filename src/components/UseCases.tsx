import { GraduationCap, Briefcase, Users, TrendingUp } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: GraduationCap,
      title: "Students & Learners",
      description: "Transform educational videos into comprehensive study materials. Extract key concepts, create organized notes, and prepare for exams more efficiently.",
      benefits: ["Save study time", "Better retention", "Organized notes"],
      gradient: "from-primary to-secondary",
    },
    {
      icon: Briefcase,
      title: "Professionals",
      description: "Stay updated with industry trends and conferences. Quickly digest long presentations, webinars, and training videos to extract actionable insights.",
      benefits: ["Time-efficient", "Key takeaways", "Professional growth"],
      gradient: "from-secondary to-accent",
    },
    {
      icon: Users,
      title: "Content Creators",
      description: "Research and analyze competitor content. Identify trending topics, popular themes, and content gaps to optimize your content strategy.",
      benefits: ["Content ideas", "Trend analysis", "Competitive edge"],
      gradient: "from-accent to-primary",
    },
    {
      icon: TrendingUp,
      title: "Researchers",
      description: "Accelerate literature review and research processes. Extract key findings, methodologies, and insights from academic and technical videos.",
      benefits: ["Fast research", "Citation ready", "Comprehensive analysis"],
      gradient: "from-primary to-accent",
    },
  ];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-primary opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Built For
            <span className="ml-3 bg-gradient-primary bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're learning, working, or researching, our AI adapts to your needs.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full p-10 rounded-3xl glass-effect hover:scale-[1.02] transition-all duration-500">
                  {/* Gradient Glow */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-8">
                      <div className="relative inline-flex">
                        <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                        <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${useCase.gradient} shadow-glow-primary group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-10 w-10 text-primary-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {useCase.description}
                    </p>

                    {/* Benefits Tags */}
                    <div className="flex flex-wrap gap-3">
                      {useCase.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full glass-effect text-sm font-medium text-primary border border-primary/20 group-hover:border-primary/40 transition-colors"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="inline-flex flex-col items-center gap-6 p-12 rounded-3xl glass-effect">
            <h3 className="text-3xl font-bold text-foreground">
              Ready to Transform Your Learning?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join thousands of users who are already saving time and learning smarter with AI-powered video analysis.
            </p>
            <button className="px-8 py-4 bg-gradient-primary hover:opacity-90 rounded-xl font-semibold text-lg shadow-glow-primary hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 text-primary-foreground">
              Start Analyzing Videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
