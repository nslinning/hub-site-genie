
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Code2, Wand2, Info } from "lucide-react";
import { conversionSteps, simulateProcess } from "@/utils/wordpress/conversionUtils";
import ConversionProgress from "./ConversionProgress";

const ConversionActions = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversionProgress, setConversionProgress] = useState<string[]>([]);

  const handleAnalyzeCode = async () => {
    setIsAnalyzing(true);
    setConversionProgress([]);
    try {
      await simulateProcess(
        conversionSteps.analyze, 
        setConversionProgress, 
        setIsAnalyzing
      );
      
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
      await simulateProcess(
        conversionSteps.generate,
        setConversionProgress,
        setIsGenerating
      );
      
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

      <ConversionProgress steps={conversionProgress} />
    </div>
  );
};

export default ConversionActions;
