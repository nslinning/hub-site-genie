
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, AlertCircle } from "lucide-react";
import { DesignSpec } from "@/utils/wordpress/githubIntegration";
import { toast } from "sonner";
import { useApiKeys } from "@/hooks/useApiKeys";
import { useLovableApi, ComponentGenerationResponse, ComponentGenerationRequest } from "@/utils/api/lovableApi";
import { ProgressTracker, ProgressStep } from "@/components/common/ProgressTracker";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const { apiKey, isLoading: isLoadingApiKey } = useApiKeys("lovable");
  const [currentStep, setCurrentStep] = useState<string>("prepare");
  const [error, setError] = useState<string | null>(null);
  
  // Define generation steps
  const generationSteps: ProgressStep[] = [
    { id: "prepare", label: "Forberedelse", status: "completed" },
    { id: "analyze", label: "Analyserer designkrav", status: "pending" },
    { id: "generate", label: "Genererer komponent", status: "pending" },
    { id: "complete", label: "Komponent klar", status: "pending" }
  ];
  
  // Use the Lovable API hooks with proper fallback
  const lovableApi = apiKey ? useLovableApi(apiKey) : null;
  
  // Correctly invoke the useComponentGeneration hook to get the mutation
  // Use optional chaining to safely handle the case when lovableApi is null
  const { mutate: generateComponentMutation, isPending } = lovableApi?.useComponentGeneration() || { 
    mutate: null, 
    isPending: false 
  };

  // Function to handle component generation
  const handleGenerateComponent = () => {
    if (!componentName || !componentDescription) {
      toast.warning("Manglende informasjon", { 
        description: "Fyll ut navn og beskrivelse for komponenten" 
      });
      setError("Fyll ut navn og beskrivelse for komponenten");
      return;
    }
    
    if (!apiKey) {
      toast.error("API-nøkkel mangler", { 
        description: "Legg til en Lovable API-nøkkel i administrasjonspanelet" 
      });
      setError("API-nøkkel mangler. Gå til /admin/api-keys for å legge til en Lovable API-nøkkel");
      return;
    }
    
    setError(null);
    setCurrentStep("analyze");
    setTimeout(() => setCurrentStep("generate"), 1500);
    
    // Check if generateComponentMutation is available
    if (!generateComponentMutation) {
      toast.error("API-integrasjon ikke tilgjengelig");
      setCurrentStep("prepare");
      setError("Kunne ikke kontakte Lovable API. Prøv igjen senere eller sjekk API-nøkkelen.");
      return;
    }

    try {
      const request: ComponentGenerationRequest = {
        name: componentName,
        description: componentDescription,
        designSpec: designSpec || { 
          colorPalette: [],
          typography: {
            headings: "Inter",
            body: "Inter"
          },
          layoutStructure: "standard",
          components: []
        }
      };

      // Call the mutation with proper error handling
      generateComponentMutation(request, {
        onSuccess: (data: ComponentGenerationResponse) => {
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
        onError: (error: any) => {
          console.error("Generation error:", error);
          toast.error("Kunne ikke generere komponent", { 
            description: error?.message || "Prøv igjen senere" 
          });
          setCurrentStep("prepare");
          setError(error?.message || "Kunne ikke generere komponent. Sjekk API-nøkkel og prøv igjen.");
        }
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error("Kunne ikke generere komponent");
      setCurrentStep("prepare");
      setError(error?.message || "En uventet feil oppstod. Prøv igjen senere.");
    }
  };

  // Function to simulate API response for demo purposes
  const handleDemoGeneration = () => {
    if (!componentName || !componentDescription) {
      toast.warning("Manglende informasjon", { 
        description: "Fyll ut navn og beskrivelse for komponenten" 
      });
      return;
    }

    setCurrentStep("analyze");
    setTimeout(() => setCurrentStep("generate"), 1500);
    
    setTimeout(() => {
      const mockCode = `
import React from 'react';

const ${componentName} = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">${componentName}</h2>
      <p className="text-gray-700 mb-4">
        ${componentDescription}
      </p>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Primary Action
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
          Secondary Action
        </button>
      </div>
    </div>
  );
};

export default ${componentName};
      `.trim();
      
      setGeneratedCode(mockCode);
      setCurrentStep("complete");
      toast.success("Komponent generert (demo)");
      if (onComponentGenerated) {
        onComponentGenerated({
          name: componentName,
          code: mockCode,
        });
      }
    }, 3000);
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
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
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
      <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setComponentName("");
            setComponentDescription("");
            setGeneratedCode("");
            setCurrentStep("prepare");
            setError(null);
          }}
          className="w-full sm:w-auto"
        >
          Nullstill
        </Button>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {!apiKey && (
            <Button 
              onClick={handleDemoGeneration}
              disabled={!componentName || !componentDescription || isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Genererer..." : "Demo (uten API-nøkkel)"}
            </Button>
          )}
          
          <Button 
            onClick={handleGenerateComponent}
            disabled={!componentName || !componentDescription || !apiKey || isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Genererer..." : "Generer komponent"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LovableComponentGenerator;
