
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Palette, Type, LayoutGrid, Eye, Loader2 } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("colors");
  const [realtimePreview, setRealtimePreview] = useState(true);
  
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

  // Realtime preview component
  const LivePreview = () => {
    if (!realtimePreview) return null;
    
    const primaryColor = colors[0];
    const secondaryColor = colors[1];
    const accentColor = colors[2];
    const textColor = colors[4];
    const bgColor = colors[5];
    
    return (
      <div className="border rounded-md p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <Label>Sanntids forhåndsvisning</Label>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setRealtimePreview(false)}
            className="h-8 text-xs"
          >
            Skjul
          </Button>
        </div>
        <div 
          className="rounded-md overflow-hidden" 
          style={{ backgroundColor: bgColor }}
        >
          <div className="p-4" style={{ fontFamily: typography.headings }}>
            <div className="flex justify-between items-center mb-4">
              <div 
                className="text-lg font-bold" 
                style={{ color: textColor }}
              >
                Logo
              </div>
              <div className="flex space-x-4">
                {["Hjem", "Om oss", "Tjenester", "Kontakt"].map((item) => (
                  <div 
                    key={item} 
                    className="text-sm font-medium"
                    style={{ color: primaryColor }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 rounded-lg mb-4" style={{ backgroundColor: `${primaryColor}20` }}>
              <h1 
                className="text-xl font-bold mb-2" 
                style={{ color: primaryColor, fontFamily: typography.headings }}
              >
                {components.includes('Hero') ? 'Hero-seksjon' : 'Hovedseksjon'}
              </h1>
              <p 
                className="text-sm mb-3" 
                style={{ color: textColor, fontFamily: typography.body }}
              >
                Dette er en forhåndsvisning av designet ditt.
              </p>
              <button
                className="text-sm font-medium px-3 py-1 rounded"
                style={{ 
                  backgroundColor: accentColor, 
                  color: bgColor
                }}
              >
                Knapp
              </button>
            </div>
            
            {components.includes('Features') && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="p-3 rounded"
                    style={{ backgroundColor: `${secondaryColor}15` }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-2"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <h3 
                      className="text-sm font-medium mb-1"
                      style={{ color: textColor, fontFamily: typography.headings }}
                    >
                      Feature {i}
                    </h3>
                    <p 
                      className="text-xs"
                      style={{ color: `${textColor}cc`, fontFamily: typography.body }}
                    >
                      Kort beskrivelse
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {components.includes('Testimonials') && (
              <div 
                className="p-4 rounded mb-4" 
                style={{ backgroundColor: `${secondaryColor}10` }}
              >
                <h2 
                  className="text-base font-medium mb-2"
                  style={{ color: secondaryColor, fontFamily: typography.headings }}
                >
                  Testimonial
                </h2>
                <p 
                  className="text-xs italic"
                  style={{ color: textColor, fontFamily: typography.body }}
                >
                  "Dette er et eksempel på en kundeomtale som vil bli vist i denne seksjonen."
                </p>
              </div>
            )}
            
            {components.includes('Contact') && (
              <div className="border-t pt-3" style={{ borderColor: `${textColor}20` }}>
                <div className="text-xs" style={{ color: `${textColor}99` }}>
                  Kontakt oss
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
        <LivePreview />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
          {!realtimePreview && (
            <Button
              onClick={() => setRealtimePreview(true)}
              variant="outline"
              className="w-full"
            >
              Vis sanntids forhåndsvisning
            </Button>
          )}
          
          <Button 
            onClick={handleGeneratePreview} 
            className="w-full flex items-center gap-2"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Genererer...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Generer fullstendig forhåndsvisning
              </>
            )}
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
