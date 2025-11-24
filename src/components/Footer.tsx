import { Video, Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 glass-effect py-16 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow-primary">
                  <Video className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                YT AI Agent
              </span>
            </div>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Transform YouTube videos into actionable insights with AI-powered analysis. Get summaries, timestamps, themes, and study notes instantly.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Mail, href: "mailto:contact@s3ktech.com", label: "Email" },
                { icon: Github, href: "https://github.com/s3ktech", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/company/s3ktech", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl glass-effect hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 group"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {["Home", "Features", "Demo", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="h-1 w-0 bg-primary group-hover:w-4 transition-all duration-300 rounded-full" />
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Resources</h3>
            <nav className="flex flex-col space-y-3">
              {["Documentation", "API", "Support", "Blog"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="h-1 w-0 bg-primary group-hover:w-4 transition-all duration-300 rounded-full" />
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="font-semibold text-foreground">S3K Technologies</span> - AI Engineering Project
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All rights reserved. Built with precision and innovation.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-primary transition-colors duration-300">
                Privacy
              </a>
              <a href="#terms" className="hover:text-primary transition-colors duration-300">
                Terms
              </a>
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={scrollToTop}
              className="glass-effect hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
