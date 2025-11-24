import { Video, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-card/90 backdrop-blur-2xl border-b border-border/50 shadow-2xl" 
            : "bg-background/10 backdrop-blur-lg"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Enhanced Logo - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500" />
                <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-primary shadow-glow-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Video className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
                  YT AI Agent
                </span>
                <span className="hidden sm:block text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                  Video Intelligence
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Glassmorphic Pills */}
            <div className="hidden lg:flex items-center gap-1 px-3 py-2 rounded-full glass-effect border border-border/30">
              {[
                { label: "Home", href: "#home" },
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Use Cases", href: "#use-cases" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group/link rounded-full hover:bg-primary/10"
                >
                  {item.label}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-primary group-hover/link:w-3/4 transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>

            {/* CTA Buttons - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex text-sm text-muted-foreground hover:text-foreground transition-colors font-medium px-4"
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-primary hover:opacity-90 shadow-glow-primary hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 font-semibold px-4 sm:px-6 text-sm text-primary-foreground"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl glass-effect hover:scale-105 transition-transform border border-border/30"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Enhanced */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          <div 
            className="absolute inset-0 bg-background/98 backdrop-blur-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 sm:top-24 left-4 right-4 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="p-4 sm:p-6 rounded-3xl glass-effect border border-border/50 shadow-2xl">
              <nav className="flex flex-col gap-2">
                {[
                  { label: "Home", href: "#home", icon: "🏠" },
                  { label: "Features", href: "#features", icon: "✨" },
                  { label: "How It Works", href: "#how-it-works", icon: "⚙️" },
                  { label: "Use Cases", href: "#use-cases", icon: "🎯" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all duration-300 group"
                  >
                    <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
                <div className="h-px bg-border/50 my-2" />
                <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all duration-300">
                  Sign In
                </button>
                <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-primary text-primary-foreground rounded-xl shadow-glow-primary hover:opacity-90 transition-all duration-300">
                  Get Started Free
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
