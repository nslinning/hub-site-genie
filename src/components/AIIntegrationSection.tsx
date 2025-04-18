
import { Card, CardContent } from "@/components/ui/card";
import { Bot, TerminalSquare, MessageCircle, Cpu, Workflow, Braces } from "lucide-react";

const AIIntegrationSection = () => {
  return (
    <div id="ai-integration" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Advanced AI Integration</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Harness the power of cutting-edge AI models to streamline your website creation process
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-n60-purple to-n60-teal opacity-30 blur-lg rounded-xl"></div>
              <Card className="relative bg-card border border-border rounded-xl overflow-hidden shadow-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3 py-3 px-4 bg-muted rounded-lg">
                    <Bot className="h-5 w-5 text-primary" />
                    <div className="text-sm font-medium">Gemini 2.5 Pro Integration</div>
                  </div>
                  
                  <div className="py-3 px-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <TerminalSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Gemini 2.5 Pro</span>
                        <p className="text-muted-foreground mt-1">Suggest layout improvements for my homepage to increase customer engagement</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-3 px-4 border border-border rounded-lg bg-background">
                    <div className="flex items-start gap-3">
                      <div className="bg-secondary/10 p-2 rounded-full mt-1">
                        <MessageCircle className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">N60ai Smart Solutions Hub</span>
                        <p className="text-muted-foreground mt-1">I can help optimize your layout. Based on analysis, here are 3 suggestions to improve engagement:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                          <li>Move call-to-action buttons above the fold</li>
                          <li>Add social proof section with customer testimonials</li>
                          <li>Implement hover animations on product images</li>
                        </ul>
                        <p className="text-muted-foreground mt-2">Would you like me to implement these changes?</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Dual AI Technology</h3>
              </div>
              <p className="text-muted-foreground">
                Leverage both Gemini 2.5 Pro and Claude 3.7 to get the perfect blend of creative design suggestions and precise code implementation guidance.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Step-by-Step Prompting</h3>
              </div>
              <p className="text-muted-foreground">
                Our intelligent prompting system guides you through the website creation process with tailored suggestions at each step of your journey.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Braces className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Automatic Code Verification</h3>
              </div>
              <p className="text-muted-foreground">
                All generated code is automatically checked against best practices and optimization standards through our GitHub integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIIntegrationSection;
