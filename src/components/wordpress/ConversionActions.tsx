
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Code2, Wand2 } from "lucide-react";

const ConversionActions = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnalyzeCode = async () => {
    setIsAnalyzing(true);
    try {
      // Simulerer kodeanalyse
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Kodeanalyse fullført", {
        description: "Optimale konverteringsmønstre er identifisert"
      });
    } catch (error) {
      toast.error("Kunne ikke fullføre analysen");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateTheme = async () => {
    setIsGenerating(true);
    try {
      // Simulerer temagenerering
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success("WordPress-tema generert", {
        description: "Temaet er klart for testing og optimalisering"
      });
    } catch (error) {
      toast.error("Kunne ikke generere tema");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <Button 
        onClick={handleAnalyzeCode}
        disabled={isAnalyzing}
        className="gap-2"
      >
        <Code2 className="h-4 w-4" />
        {isAnalyzing ? "Analyserer..." : "Start kodeanalyse"}
      </Button>
      <Button 
        onClick={handleGenerateTheme}
        disabled={isGenerating || !isAnalyzing}
        className="gap-2"
        variant="secondary"
      >
        <Wand2 className="h-4 w-4" />
        {isGenerating ? "Genererer..." : "Generer WordPress-tema"}
      </Button>
    </div>
  );
};

export default ConversionActions;
