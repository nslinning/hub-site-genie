
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Layout, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-n60-blue-dark via-n60-blue to-n60-purple opacity-5 pointer-events-none" />
      
      {/* Animated dots/grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_rgba(110,89,165,0.15)_0,_transparent_7px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">N60ai Smart Solutions Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Generate stunning websites with AI-powered tools, no coding required. Connect with Gemini 2.5 Pro and Claude 3.7 for intelligent guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button className="bg-primary hover:bg-primary/90 button-glow text-lg py-6 px-8">
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg py-6 px-8">
              Watch Demo
            </Button>
          </div>
          
          {/* Feature highlight badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-muted px-4 py-2 rounded-full">
              <Code className="h-5 w-5 text-primary mr-2" />
              <span>No-code platform</span>
            </div>
            <div className="flex items-center bg-muted px-4 py-2 rounded-full">
              <Layout className="h-5 w-5 text-primary mr-2" />
              <span>Lovable.dev integration</span>
            </div>
            <div className="flex items-center bg-muted px-4 py-2 rounded-full">
              <Zap className="h-5 w-5 text-primary mr-2" />
              <span>AI-powered workflows</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating illustration - abstract representation of the platform */}
      <div className="mt-16 relative mx-auto max-w-5xl">
        <div className="relative bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
          <div className="aspect-[16/9] bg-gradient-to-br from-n60-purple/10 via-n60-blue/5 to-n60-teal/10 p-8 animate-pulse-slow">
            <div className="h-full w-full bg-gradient-to-r from-n60-blue/10 via-n60-purple/20 to-n60-teal/10 rounded-lg border border-n60-purple/20 flex items-center justify-center">
              <div className="bg-background/50 backdrop-blur-sm p-6 rounded-lg border border-n60-purple/30 shadow-lg animate-float">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-n60-purple to-n60-teal flex items-center justify-center text-white font-bold">
                    N60
                  </div>
                  <div className="w-48 h-2 bg-n60-purple/20 rounded-full"></div>
                  <div className="w-32 h-2 bg-n60-teal/20 rounded-full"></div>
                  <div className="grid grid-cols-3 gap-2 w-full mt-2">
                    <div className="h-8 bg-n60-purple/10 rounded"></div>
                    <div className="h-8 bg-n60-blue/10 rounded"></div>
                    <div className="h-8 bg-n60-teal/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
