
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, LayoutGrid, Eye } from "lucide-react";
import { DesignSpec } from "@/utils/wordpress/githubIntegration";
import { LovableIntegration } from "@/utils/wordpress/lovableIntegration";

const defaultColors = [
  "#8B5CF6", // Primær lilla
  "#1E40AF", // Sekundær blå
  "#10B981", // Aksent grønn
  "#F59E0B", // Aksent gul
  "#111827", // Tekst mørk
  "#F9FAFB", // Bakgrunn lys
];

const defaultTypography = {
  headings: "Inter",
  body: "Inter",
};

const designLayouts = [
  { id: "standard", name: "Standard" },
  { id: "modern", name: "Moderne" },
  { id: "minimalist", name: "Minimalistisk" },
  { id: "bold", name: "Kraftig" },
  { id: "elegant", name: "Elegant" },
];

const DesignSpecification = () => {
  const [colors, setColors] = useState<string[]>(defaultColors);
  const [typography, setTypography] = useState(defaultTypography);
  const [layout, setLayout] = useState("standard");
  const [components, setComponents] = useState<string[]>([
    "Hero", 
    "Features", 
    "Testimonials", 
    "Contact"
  ]);
  const [newComponent, setNewComponent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  
  const lovable = new LovableIntegration();

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleAddComponent = () => {
    if (newComponent && !components.includes(newComponent)) {
      setComponents([...components, newComponent]);
      setNewComponent("");
    }
  };

  const handleRemoveComponent = (component: string) => {
    setComponents(components.filter(c => c !== component));
  };

  const handleGeneratePreview = async () => {
    setIsGenerating(true);
    try {
      const designSpec: DesignSpec = {
        colorPalette: colors,
        typography,
        layoutStructure: layout,
        components,
      };
      
      const result = await lovable.getLivePreview(designSpec);
      if (result.success && result.data.previewUrl) {
        setPreviewUrl(result.data.previewUrl);
      }
    } catch (error) {
      console.error("Forhåndsvisningsfeil:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Design-spesifikasjon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="mb-4">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Farger</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span>Typografi</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span>Layout</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {colors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                    <Label>
                      {index === 0 ? "Primær" : 
                       index === 1 ? "Sekundær" :
                       index === 2 ? "Aksent 1" :
                       index === 3 ? "Aksent 2" :
                       index === 4 ? "Tekst" : "Bakgrunn"}
                    </Label>
                  </div>
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="h-10 w-full"
                  />
                  <Input 
                    value={color} 
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="headings-font">Overskrifter</Label>
                <select
                  id="headings-font"
                  value={typography.headings}
                  onChange={(e) => setTypography({...typography, headings: e.target.value})}
                  className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Playfair Display">Playfair Display</option>
                </select>
                <div className="mt-2 p-3 border rounded">
                  <h2 style={{fontFamily: typography.headings}} className="text-2xl">
                    Overskrift eksempel
                  </h2>
                  <h3 style={{fontFamily: typography.headings}} className="text-xl mt-2">
                    Mindre overskrift
                  </h3>
                </div>
              </div>

              <div>
                <Label htmlFor="body-font">Brødtekst</Label>
                <select
                  id="body-font"
                  value={typography.body}
                  onChange={(e) => setTypography({...typography, body: e.target.value})}
                  className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                </select>
                <div className="mt-2 p-3 border rounded">
                  <p style={{fontFamily: typography.body}} className="text-base">
                    Dette er et eksempel på brødtekst som vil bli brukt på nettstedet.
                    Det er viktig at denne teksten er lett å lese.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-4">
              <Label>Layout-struktur</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {designLayouts.map((designLayout) => (
                  <div 
                    key={designLayout.id}
                    className={`border rounded-md p-3 cursor-pointer ${layout === designLayout.id ? 'border-primary bg-primary/10' : ''}`}
                    onClick={() => setLayout(designLayout.id)}
                  >
                    <div className="text-center font-medium mb-2">{designLayout.name}</div>
                    <div className="h-24 bg-muted rounded flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        {designLayout.name} layout
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <Label>Komponenter</Label>
                <div className="flex flex-wrap gap-2">
                  {components.map((component) => (
                    <div key={component} className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded">
                      <span>{component}</span>
                      <button 
                        onClick={() => handleRemoveComponent(component)}
                        className="text-muted-foreground hover:text-destructive ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ny komponent..."
                    value={newComponent}
                    onChange={(e) => setNewComponent(e.target.value)}
                  />
                  <Button onClick={handleAddComponent} type="button" variant="outline">
                    Legg til
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <Button 
            onClick={handleGeneratePreview} 
            className="w-full flex items-center gap-2"
            disabled={isGenerating}
          >
            <Eye className="h-4 w-4" />
            {isGenerating ? "Genererer..." : "Generer forhåndsvisning med Lovable.dev"}
          </Button>
          
          {previewUrl && (
            <div className="border rounded-md p-3">
              <Label className="block mb-2">Forhåndsvisning</Label>
              <div className="relative aspect-video bg-muted rounded">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Forhåndsvisning tilgjengelig på: <a href={previewUrl} className="text-primary underline" target="_blank" rel="noopener noreferrer">{previewUrl}</a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignSpecification;
