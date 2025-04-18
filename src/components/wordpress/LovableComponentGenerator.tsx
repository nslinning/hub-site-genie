
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, XCircle, Plus, FileCode2, ArrowRight } from "lucide-react";
import { LovableIntegration, ComponentGenerationRequest } from "@/utils/wordpress/lovableIntegration";
import { DesignSpec } from "@/utils/wordpress/githubIntegration";

interface LovableComponentGeneratorProps {
  designSpec?: DesignSpec;
  onComponentGenerated?: (component: { name: string; code: string }) => void;
}

const LovableComponentGenerator = ({ 
  designSpec,
  onComponentGenerated
}: LovableComponentGeneratorProps) => {
  const [componentName, setComponentName] = useState("");
  const [description, setDescription] = useState("");
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [newDependency, setNewDependency] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const lovable = new LovableIntegration();

  const handleAddDependency = () => {
    if (newDependency && !dependencies.includes(newDependency)) {
      setDependencies([...dependencies, newDependency]);
      setNewDependency("");
    }
  };

  const handleRemoveDependency = (dependency: string) => {
    setDependencies(dependencies.filter(d => d !== dependency));
  };

  const handleGenerateComponent = async () => {
    if (!componentName || !description) return;
    
    setIsGenerating(true);
    try {
      const request: ComponentGenerationRequest = {
        componentName,
        description,
        designSpec: designSpec || {
          colorPalette: ["#8B5CF6", "#1E40AF", "#10B981", "#F59E0B", "#111827", "#F9FAFB"],
          typography: { headings: "Inter", body: "Inter" },
          layoutStructure: "standard",
          components: ["Hero", "Features"]
        },
        dependencies
      };
      
      const result = await lovable.generateComponent(request);
      
      if (result.success && result.data.code) {
        setGeneratedCode(result.data.code);
        
        if (onComponentGenerated) {
          onComponentGenerated({
            name: componentName,
            code: result.data.code
          });
        }
      }
    } catch (error) {
      console.error("Komponentgenerering feilet:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode2 className="h-5 w-5" />
          Lovable Komponentgenerator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="component-name">Komponentnavn</Label>
            <Input
              id="component-name"
              placeholder="F.eks. HeroSection"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="component-description">Beskrivelse</Label>
            <Textarea
              id="component-description"
              placeholder="Detaljert beskrivelse av komponenten..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Avhengigheter</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {dependencies.map((dep) => (
                <Badge key={dep} variant="secondary" className="px-2 py-1">
                  {dep}
                  <button 
                    onClick={() => handleRemoveDependency(dep)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    <XCircle className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Legg til avhengighet..."
                value={newDependency}
                onChange={(e) => setNewDependency(e.target.value)}
              />
              <Button 
                onClick={handleAddDependency} 
                type="button" 
                size="sm" 
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {designSpec && (
            <div className="border rounded p-3">
              <Label className="block mb-2">Design-spesifikasjon er koblet</Label>
              <div className="text-sm text-muted-foreground">
                Komponenten vil genereres basert på tilkoblet design-spesifikasjon
              </div>
            </div>
          )}

          <Button 
            onClick={handleGenerateComponent} 
            className="w-full"
            disabled={isGenerating || !componentName || !description}
          >
            {isGenerating ? "Genererer..." : "Generer komponent med Lovable.dev"}
          </Button>

          {generatedCode && (
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted px-3 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm">{componentName}.tsx</span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onComponentGenerated && onComponentGenerated({ name: componentName, code: generatedCode })}
                >
                  <span className="mr-1">Bruk</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
              <ScrollArea className="h-80 bg-slate-950 rounded-b-md">
                <pre className="p-4 text-sm text-white overflow-x-auto">
                  <code>{generatedCode}</code>
                </pre>
              </ScrollArea>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LovableComponentGenerator;
