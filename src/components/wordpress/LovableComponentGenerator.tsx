
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Code, 
  XCircle, 
  Plus, 
  FileCode2, 
  ArrowRight, 
  Copy, 
  Check, 
  Loader2 
} from "lucide-react";
import { toast } from "sonner";
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
  const [isCopied, setIsCopied] = useState(false);
  const [generatedComponents, setGeneratedComponents] = useState<Array<{name: string; code: string}>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

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

  const copyToClipboard = async () => {
    if (generatedCode) {
      try {
        await navigator.clipboard.writeText(generatedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast.success("Kode kopiert til utklippstavle");
      } catch (error) {
        toast.error("Kunne ikke kopiere koden");
      }
    }
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
        
        // Add to generated components list
        const newComponent = { name: componentName, code: result.data.code };
        setGeneratedComponents(prev => 
          prev.some(c => c.name === componentName) 
            ? prev.map(c => c.name === componentName ? newComponent : c)
            : [...prev, newComponent]
        );
        
        if (onComponentGenerated) {
          onComponentGenerated(newComponent);
        }
        
        toast.success(`${componentName} ble generert`);
      }
    } catch (error) {
      console.error("Komponentgenerering feilet:", error);
      toast.error("Kunne ikke generere komponent");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewComponent = (name: string) => {
    const component = generatedComponents.find(c => c.name === name);
    if (component) {
      setGeneratedCode(component.code);
      setSelectedComponent(name);
    }
  };

  // Common React component templates
  const componentTemplates = [
    {
      name: "HeroSection",
      description: "En hero-seksjon med overskrift, tekst og call-to-action knapp"
    },
    {
      name: "FeatureCards",
      description: "En seksjon med feature-kort som viser produktfordeler"
    },
    {
      name: "ContactForm",
      description: "Et kontaktskjema med validering og innsendingsfunksjonalitet"
    },
    {
      name: "Testimonials",
      description: "En seksjon som viser kundeomtaler i et karusell-format"
    }
  ];

  const applyTemplate = (template: {name: string, description: string}) => {
    setComponentName(template.name);
    setDescription(template.description);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
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
                <Label>Hurtigmaler</Label>
                <div className="grid grid-cols-2 gap-2">
                  {componentTemplates.map((template) => (
                    <Button 
                      key={template.name}
                      variant="outline"
                      className="justify-start h-auto text-left"
                      onClick={() => applyTemplate(template)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{template.name}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {template.description}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddDependency();
                      }
                    }}
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
                    <p>Komponenten vil genereres basert på disse innstillingene:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Layout: {designSpec.layoutStructure}</li>
                      <li>Fargepalett: {designSpec.colorPalette.length} farger</li>
                      <li>Typografi: {designSpec.typography.headings}/{designSpec.typography.body}</li>
                    </ul>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleGenerateComponent} 
                className="w-full"
                disabled={isGenerating || !componentName || !description}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Genererer...
                  </>
                ) : (
                  "Generer komponent med Lovable.dev"
                )}
              </Button>
            </div>
          </div>

          <div>
            <div className="border rounded mb-4">
              <div className="bg-muted px-3 py-2 font-medium">Genererte komponenter</div>
              <div className="p-1">
                {generatedComponents.length > 0 ? (
                  <div className="divide-y">
                    {generatedComponents.map((component) => (
                      <Button
                        key={component.name}
                        variant="ghost"
                        className={`w-full justify-start px-3 py-2 h-auto ${selectedComponent === component.name ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => handleViewComponent(component.name)}
                      >
                        <Code className="h-4 w-4 mr-2" />
                        {component.name}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-sm text-muted-foreground text-center">
                    Ingen komponenter generert ennå
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {generatedCode && (
          <div className="border rounded-md overflow-hidden mt-4">
            <div className="bg-muted px-3 py-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <span className="font-mono text-sm">{selectedComponent || componentName}.tsx</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={copyToClipboard}
                >
                  {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span className="ml-1">{isCopied ? "Kopiert" : "Kopier"}</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onComponentGenerated && onComponentGenerated({ 
                    name: selectedComponent || componentName, 
                    code: generatedCode 
                  })}
                >
                  <span className="mr-1">Bruk</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-80 bg-slate-950 rounded-b-md">
              <pre className="p-4 text-sm text-white overflow-x-auto">
                <code>{generatedCode}</code>
              </pre>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LovableComponentGenerator;
