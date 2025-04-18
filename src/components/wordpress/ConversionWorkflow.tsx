
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Workflow, Wand2, FileSearch, 
  Palette, GitFork, CheckCircle2, ArrowRight 
} from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "active" | "completed";
}

const ConversionWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [workflowProgress, setWorkflowProgress] = useState(0);
  
  const workflowSteps: WorkflowStep[] = [
    {
      id: "analysis",
      title: "Nettstedsanalyse",
      description: "Analyserer eksisterende nettsted for å forstå struktur og innhold",
      icon: <FileSearch className="h-8 w-8" />,
      status: currentStep === 0 ? "active" : currentStep > 0 ? "completed" : "pending"
    },
    {
      id: "design",
      title: "Design med Lovable.dev",
      description: "Utform moderne design basert på kundens preferanser",
      icon: <Palette className="h-8 w-8" />,
      status: currentStep === 1 ? "active" : currentStep > 1 ? "completed" : "pending"
    },
    {
      id: "conversion",
      title: "WordPress-konvertering",
      description: "Konverterer design til WordPress-tema med AI-assistanse",
      icon: <Wand2 className="h-8 w-8" />,
      status: currentStep === 2 ? "active" : currentStep > 2 ? "completed" : "pending"
    },
    {
      id: "github",
      title: "GitHub-integrasjon",
      description: "Lagrer tema-filer i GitHub med versjonskontroll",
      icon: <GitFork className="h-8 w-8" />,
      status: currentStep === 3 ? "active" : currentStep > 3 ? "completed" : "pending"
    },
    {
      id: "quality",
      title: "Kvalitetssikring",
      description: "AI-drevet kodesjekk og optimalisering",
      icon: <CheckCircle2 className="h-8 w-8" />,
      status: currentStep === 4 ? "active" : currentStep > 4 ? "completed" : "pending"
    }
  ];

  const handleNextStep = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setWorkflowProgress(((currentStep + 1) / (workflowSteps.length - 1)) * 100);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setWorkflowProgress(((currentStep - 1) / (workflowSteps.length - 1)) * 100);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="h-5 w-5" />
          WordPress Konverteringsarbeidsflyt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Progress value={workflowProgress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <div>Start</div>
              <div>WordPress Tema</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {workflowSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`border p-3 rounded-md cursor-pointer transition-all ${
                  step.status === "active" ? "border-primary bg-primary/5" :
                  step.status === "completed" ? "border-green-500/40 bg-green-500/5" : 
                  "border-muted"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div 
                  className={`flex justify-center mb-2 ${
                    step.status === "active" ? "text-primary" :
                    step.status === "completed" ? "text-green-500" :
                    "text-muted-foreground"
                  }`}
                >
                  {step.icon}
                </div>
                <h3 className="text-sm font-medium text-center mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground text-center hidden md:block">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <Tabs defaultValue={workflowSteps[currentStep].id}>
            <TabsList className="hidden">
              {workflowSteps.map(step => (
                <TabsTrigger key={step.id} value={step.id}>
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="analysis" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">1. Nettstedsanalyse</h3>
              <p className="text-muted-foreground mb-4">
                I dette steget analyseres eksisterende nettsted med AI for å kartlegge struktur, 
                innhold og designelementer som skal bevares eller forbedres.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Crawler nettstedet for innhold og strukturanalyse</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Identifiserer hovedelementer og -funksjoner</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Kartlegger design-elementer og typografi</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Genererer analyse-rapport for neste steg</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">2. Design med Lovable.dev</h3>
              <p className="text-muted-foreground mb-4">
                Bruk Lovable.dev for å utforme et moderne og responsivt design basert på 
                kundens krav og resultater fra analysen.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Definer fargepaletter og typografi</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Lovable.dev genererer UI-komponenter</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Forhåndsvisning av design og godkjenning</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Eksporter design-specs for WordPress-konvertering</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conversion" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">3. WordPress-konvertering</h3>
              <p className="text-muted-foreground mb-4">
                Konverter det godkjente designet til et responsivt WordPress-tema med 
                AI-assistert kodegenerering.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Konverter React-komponenter til WordPress-maler</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Implementer WordPress-hooks og funksjoner</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Generer style.css og nødvendige WordPress-filer</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Sett opp tema-struktur og konfigurasjon</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="github" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">4. GitHub-integrasjon</h3>
              <p className="text-muted-foreground mb-4">
                Lagre WordPress-tema i et GitHub-repository for versjonskontroll og 
                samarbeid med teamet.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Opprette GitHub-repository for temaet</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Commit WordPress-filer til repository</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Sette opp branch-struktur for ulike miljøer</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Konfigurere GitHub Actions for automatisering</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quality" className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">5. Kvalitetssikring</h3>
              <p className="text-muted-foreground mb-4">
                AI-drevet kodesjekk og optimalisering sikrer at WordPress-temaet
                følger beste praksis og er optimalisert.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>AI-kodegjennomgang for sikkerhet og best practices</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Ytelsesevaluering og -optimalisering</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Cross-browser testing og responsivt design-sjekk</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Endelig validering før leveranse til kunde</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              Forrige steg
            </Button>
            
            <Button 
              onClick={handleNextStep}
              disabled={currentStep === workflowSteps.length - 1}
              className="flex items-center gap-1"
            >
              Neste steg
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionWorkflow;
