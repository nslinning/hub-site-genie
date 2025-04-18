
import { 
  MessageCirclePlus, 
  LayoutDashboard, 
  Paintbrush, 
  GitBranchPlus, 
  Upload, 
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <MessageCirclePlus className="h-8 w-8 text-white" />,
    title: "Describe Your Project",
    description: "Tell us what you need, and our AI will help refine your requirements"
  },
  {
    icon: <LayoutDashboard className="h-8 w-8 text-white" />,
    title: "Select Layout & Features",
    description: "Choose from AI-recommended templates and features based on your needs"
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-white" />,
    title: "Customize Design",
    description: "Fine-tune colors, typography, and content with AI assistance"
  },
  {
    icon: <GitBranchPlus className="h-8 w-8 text-white" />,
    title: "Review & Refine",
    description: "Preview your website and make adjustments with AI suggestions"
  },
  {
    icon: <Upload className="h-8 w-8 text-white" />,
    title: "Deploy Website",
    description: "Publish your site to Lovable.dev or export to WordPress"
  }
];

const WorkflowSection = () => {
  return (
    <div id="workflow" className="py-16 md:py-24 bg-gradient-to-br from-n60-blue-dark/5 via-n60-purple/5 to-n60-blue/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Simple 5-Step Workflow</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From concept to live website in minutes, not days
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-n60-purple to-n60-teal transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-n60-purple to-n60-teal flex items-center justify-center mb-4 shadow-lg">
                    {step.icon}
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Step number indicator for mobile */}
                <div className="md:hidden absolute top-0 right-0 -mt-3 -mr-3 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-muted px-4 py-2 rounded-full mb-6">
            <Check className="h-5 w-5 text-green-500" />
            <span className="font-medium">No technical skills required</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to build your website?</h3>
            <p className="text-muted-foreground mb-8">
              Get started in minutes with our AI-powered website builder. No coding required.
            </p>
            <Button className="bg-primary hover:bg-primary/90 button-glow text-lg py-6 px-8">
              Start Your Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;
