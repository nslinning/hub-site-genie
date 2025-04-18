
import { 
  LayoutDashboard, 
  GitBranch, 
  Sparkles, 
  Chrome, 
  ShoppingCart, 
  MessageSquareCode
} from "lucide-react";

const features = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    title: "No-Code Website Generation",
    description: "Build professional websites with Lovable.dev integration without writing a single line of code."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "AI-Powered Design",
    description: "Leverage Gemini 2.5 Pro and Claude 3.7 for intelligent step-by-step guidance and suggestions."
  },
  {
    icon: <GitBranch className="h-8 w-8 text-primary" />,
    title: "GitHub Integration",
    description: "Automatic code checking and version control with seamless GitHub integration."
  },
  {
    icon: <Chrome className="h-8 w-8 text-primary" />,
    title: "WordPress Integration",
    description: "Connect with WordPress to enhance existing sites and extend functionality."
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: "WooCommerce Support",
    description: "Build e-commerce features and integrate with WooCommerce for online stores."
  },
  {
    icon: <MessageSquareCode className="h-8 w-8 text-primary" />,
    title: "Smart Prompting",
    description: "Guided workflows with intelligent prompts that help you create exactly what you need."
  }
];

const FeaturesSection = () => {
  return (
    <div id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to build amazing websites without writing code
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
