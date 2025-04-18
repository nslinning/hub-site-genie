
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, LayoutGrid, Eye } from "lucide-react";
import { DesignSpec } from "@/utils/wordpress/githubIntegration";
import { LovableIntegration } from "@/utils/wordpress/lovableIntegration";
import ColorPaletteSection from "./design/ColorPaletteSection";
import TypographySection from "./design/TypographySection";
import LayoutSection from "./design/LayoutSection";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  
  const lovable = new LovableIntegration();

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
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
            <ColorPaletteSection colors={colors} onColorChange={handleColorChange} />
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <TypographySection 
              typography={typography} 
              onTypographyChange={setTypography}
            />
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <LayoutSection
              layout={layout}
              components={components}
              designLayouts={designLayouts}
              onLayoutChange={setLayout}
              onAddComponent={(component) => setComponents([...components, component])}
              onRemoveComponent={(component) => setComponents(components.filter(c => c !== component))}
            />
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
