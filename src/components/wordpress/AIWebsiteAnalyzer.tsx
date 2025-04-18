
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileSearch, Wand2, Loader2 } from "lucide-react";
import { AIIntegration, AnalysisRequest } from "@/utils/wordpress/aiIntegration";

interface AIWebsiteAnalyzerProps {
  onAnalysisComplete?: (analysis: any) => void;
}

const AIWebsiteAnalyzer = ({ onAnalysisComplete }: AIWebsiteAnalyzerProps) => {
  const [url, setUrl] = useState("");
  const [requirements, setRequirements] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState<"gemini-2.5" | "claude-3.7">("gemini-2.5");

  const handleAnalyze = async () => {
    if (!url || !requirements) return;

    setIsAnalyzing(true);
    try {
      const aiIntegration = new AIIntegration({
        apiKey,
        model: selectedModel
      });

      const request: AnalysisRequest = {
        url,
        requirements,
        customerNotes
      };

      const result = await aiIntegration.analyzeWebsite(request);
      
      if (result.success) {
        setAnalysisResult(result.data);
        if (onAnalysisComplete) {
          onAnalysisComplete(result.data);
        }
      }
    } catch (error) {
      console.error("Analysefeil:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSearch className="h-5 w-5" />
          AI-drevet nettstedsanalyse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="input">
          <TabsList className="mb-4">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="api-config">API-konfigurasjon</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisResult}>Resultater</TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-url">Nettstedets URL</Label>
              <Input
                id="website-url"
                placeholder="https://eksempel.no"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Krav og ønsker</Label>
              <Textarea
                id="requirements"
                placeholder="Beskriv kundens ønsker og krav til den nye nettsiden..."
                rows={4}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-notes">Tilleggsnotater (valgfritt)</Label>
              <Textarea
                id="customer-notes"
                placeholder="Andre relevante notater om prosjektet..."
                rows={3}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleAnalyze} 
              className="w-full mt-4"
              disabled={isAnalyzing || !url || !requirements}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyserer...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Start analyse
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="api-config" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">AI API-nøkkel</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                API-nøkkel for tilgang til {selectedModel}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Velg AI-modell</Label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border rounded-md p-3 cursor-pointer ${selectedModel === "gemini-2.5" ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => setSelectedModel("gemini-2.5")}
                >
                  <div className="font-medium">Gemini 2.5</div>
                  <div className="text-sm text-muted-foreground">Google AI</div>
                </div>
                <div 
                  className={`border rounded-md p-3 cursor-pointer ${selectedModel === "claude-3.7" ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => setSelectedModel("claude-3.7")}
                >
                  <div className="font-medium">Claude 3.7</div>
                  <div className="text-sm text-muted-foreground">Anthropic</div>
                </div>
              </div>
            </div>

            {!apiKey && (
              <div className="bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200 p-3 rounded-md flex items-start mt-4">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  En gyldig API-nøkkel kreves for å bruke AI-funksjonene. 
                  I produksjon bør dette håndteres sikkert via en backend-tjeneste.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {analysisResult && (
              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium text-lg">Analyse-resultater</h3>
                <p className="text-muted-foreground">
                  Dette er en simulert analyse. I en fullstendig implementasjon 
                  vil dette vise den faktiske AI-genererte analysen.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Hovedstruktur og layout</h4>
                    <p className="text-sm text-muted-foreground">
                      Nettstedet følger en tradisjonell layout med hovednavigasjon 
                      øverst, hero-seksjon, innholdsseksjoner og footer.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Fargepalett</h4>
                    <div className="flex gap-2 mt-1">
                      <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-800"></div>
                      <div className="w-6 h-6 rounded-full bg-amber-500"></div>
                      <div className="w-6 h-6 rounded-full bg-white border"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Typografi</h4>
                    <p className="text-sm text-muted-foreground">
                      Sans-serif fonter brukes gjennomgående, med varierende vekt for å skape hierarki.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Anbefalinger</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Forbedre mobilvisning</li>
                      <li>Modernisere visuell identitet</li>
                      <li>Implementere bedre call-to-action elementer</li>
                      <li>Forbedre lastetid ved å optimalisere bilder</li>
                    </ul>
                  </div>
                </div>
                
                <Button 
                  onClick={() => onAnalysisComplete && onAnalysisComplete(analysisResult)} 
                  className="w-full mt-2"
                >
                  Bruk analyse i design-fasen
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIWebsiteAnalyzer;
