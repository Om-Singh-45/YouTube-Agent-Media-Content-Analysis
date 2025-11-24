import { TrendingUp, Users, Clock, Star } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
      description: "Trust our platform daily",
    },
    {
      icon: TrendingUp,
      value: "1M+",
      label: "Videos Analyzed",
      description: "And counting every second",
    },
    {
      icon: Clock,
      value: "10M+",
      label: "Hours Saved",
      description: "Across all our users",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "User Rating",
      description: "Based on 10K+ reviews",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-card/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative inline-flex mb-4">
                  <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
