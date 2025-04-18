
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2 } from "lucide-react";
import { DesignSpec } from "@/utils/wordpress/githubIntegration";
import { toast } from "sonner";
import { useApiKeys } from "@/hooks/useApiKeys";
import { useLovableApi } from "@/utils/api/lovableApi";
import { ProgressTracker, ProgressStep } from "@/components/common/ProgressTracker";

interface LovableComponentGeneratorProps {
  designSpec?: DesignSpec;
  onComponentGenerated?: (component: { name: string; code: string }) => void;
}

const LovableComponentGenerator = ({ 
  designSpec, 
  onComponentGenerated 
}: LovableComponentGeneratorProps) => {
  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const { apiKey } = useApiKeys("lovable");
  const [currentStep, setCurrentStep] = useState<string>("prepare");
  
  // Define generation steps
  const generationSteps: ProgressStep[] = [
    { id: "prepare", label: "Forberedelse", status: "completed" },
    { id: "analyze", label: "Analyserer designkrav", status: "pending" },
    { id: "generate", label: "Genererer komponent", status: "pending" },
    { id: "complete", label: "Komponent klar", status: "pending" }
  ];
  
  // Use the Lovable API hooks
  const { useComponentGeneration } = apiKey ? useLovableApi(apiKey) : { useComponentGeneration: null };
  const generateMutation = useComponentGeneration ? useComponentGeneration({
    onSuccess: (data) => {
      setGeneratedCode(data.code);
      setCurrentStep("complete");
      toast.success("Komponent generert");
      if (onComponentGenerated) {
        onComponentGenerated({
          name: componentName,
          code: data.code,
        });
      }
    },
    onError: (error) => {
      toast.error("Kunne ikke generere komponent", { 
        description: error.message || "Prøv igjen senere" 
      });
      setCurrentStep("prepare");
    }
  }) : null;

  const handleGenerateComponent = async () => {
    if (!componentName || !componentDescription) {
      toast.warning("Manglende informasjon", { 
        description: "Fyll ut navn og beskrivelse for komponenten" 
      });
      return;
    }
    
    if (!apiKey) {
      toast.error("API-nøkkel mangler", { 
        description: "Legg til en Lovable API-nøkkel i administrasjonspanelet" 
      });
      return;
    }
    
    setCurrentStep("analyze");
    setTimeout(() => setCurrentStep("generate"), 1500);
    
    try {
      generateMutation?.mutate({
        name: componentName,
        description: componentDescription,
        designSpec: designSpec || { 
          colors: [], 
          typography: { 
            fontFamily: "Inter", 
            headings: [], 
            bodyText: [] 
          },
          layout: { 
            type: "responsive", 
            constraints: [] 
          }
        }
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Kunne ikke generere komponent");
      setCurrentStep("prepare");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Lovable Komponentgenerator
        </CardTitle>
        <CardDescription>
          Generer React komponenter basert på dine designspesifikasjoner
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="component-name">Komponentnavn</Label>
            <Input
              id="component-name"
              placeholder="F.eks. HeroSection"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="component-description">Beskrivelse</Label>
            <Textarea
              id="component-description"
              placeholder="Beskriv hvordan komponenten skal se ut og oppføre seg"
              value={componentDescription}
              onChange={(e) => setComponentDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <ProgressTracker 
            steps={generationSteps} 
            currentStep={currentStep}
            className="mt-4" 
          />
          
          {generatedCode && (
            <div className="grid gap-2 mt-4">
              <Label htmlFor="generated-code">Generert kode</Label>
              <Textarea
                id="generated-code"
                value={generatedCode}
                readOnly
                rows={8}
                className="font-mono text-sm"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setComponentName("");
            setComponentDescription("");
            setGeneratedCode("");
            setCurrentStep("prepare");
          }}
        >
          Nullstill
        </Button>
        <Button 
          onClick={handleGenerateComponent}
          disabled={!componentName || !componentDescription || !apiKey || generateMutation?.isPending}
        >
          {generateMutation?.isPending ? "Genererer..." : "Generer komponent"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LovableComponentGenerator;
