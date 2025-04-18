
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Code2, Wand2, Info } from "lucide-react";

const ConversionActions = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversionProgress, setConversionProgress] = useState<string[]>([]);

  const simulateProcess = async (steps: string[], setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    for (const step of steps) {
      setConversionProgress(prev => [...prev, step]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setState(false);
    setConversionProgress([]);
  };

  const handleAnalyzeCode = async () => {
    setIsAnalyzing(true);
    setConversionProgress([]);
    try {
      const analyzeSteps = [
        "Scanning React components",
        "Identifying WordPress compatibility",
        "Mapping component structures",
        "Generating conversion strategy"
      ];
      
      await simulateProcess(analyzeSteps, setIsAnalyzing);
      
      toast.success("Kodeanalyse fullført", {
        description: "Optimale konverteringsmønstre er identifisert"
      });
    } catch (error) {
      toast.error("Kunne ikke fullføre analysen");
    }
  };

  const handleGenerateTheme = async () => {
    setIsGenerating(true);
    setConversionProgress([]);
    try {
      const generateSteps = [
        "Preparing WordPress theme structure",
        "Converting React components",
        "Implementing WordPress hooks",
        "Generating template files",
        "Finalizing theme configuration"
      ];
      
      await simulateProcess(generateSteps, setIsGenerating);
      
      toast.success("WordPress-tema generert", {
        description: "Temaet er klart for testing og optimalisering"
      });
    } catch (error) {
      toast.error("Kunne ikke generere tema");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleAnalyzeCode}
            disabled={isAnalyzing}
            className="gap-2"
          >
            <Code2 className="h-4 w-4" />
            {isAnalyzing ? "Analyserer..." : "Start kodeanalyse"}
          </Button>
          <Tooltip>
            <TooltipTrigger>
              <Info className="text-muted-foreground h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Analyserer React-komponenter for WordPress-konvertering</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            onClick={handleGenerateTheme}
            disabled={isGenerating || !conversionProgress.length}
            className="gap-2"
            variant="secondary"
          >
            <Wand2 className="h-4 w-4" />
            {isGenerating ? "Genererer..." : "Generer WordPress-tema"}
          </Button>
          <Tooltip>
            <TooltipTrigger>
              <Info className="text-muted-foreground h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Konverterer analysert React-kode til WordPress-tema</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {conversionProgress.length > 0 && (
        <div className="mt-4 w-full">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Konverteringsprosess:</h4>
            <ul className="list-disc list-inside text-sm">
              {conversionProgress.map((step, index) => (
                <li key={index} className="text-muted-foreground">{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversionActions;
