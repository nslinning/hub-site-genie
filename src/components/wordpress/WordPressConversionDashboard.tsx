
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AIWebsiteAnalyzer from "./AIWebsiteAnalyzer";
import DesignSpecification from "./DesignSpecification";
import LovableComponentGenerator from "./LovableComponentGenerator";
import GitHubWordPressIntegration from "./GitHubWordPressIntegration";
import ConversionWorkflow from "./ConversionWorkflow";
import { useState } from "react";
import { DesignSpec } from "@/utils/wordpress/githubIntegration";

const WordPressConversionDashboard = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [designSpec, setDesignSpec] = useState<DesignSpec | undefined>(undefined);
  const [generatedComponents, setGeneratedComponents] = useState<Array<{name: string; code: string}>>([]);

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
  };

  const handleDesignSpecChange = (newSpec: DesignSpec) => {
    setDesignSpec(newSpec);
  };

  const handleComponentGenerated = (component: {name: string; code: string}) => {
    setGeneratedComponents(prev => 
      prev.some(c => c.name === component.name) 
        ? prev.map(c => c.name === component.name ? component : c)
        : [...prev, component]
    );
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Dette dashboardet viser hvordan Lovable.dev kan integreres med WordPress-konverteringsverktøyet.
          Det demonstrerer arbeidsflyten fra analyse til endelig WordPress-tema.
        </AlertDescription>
      </Alert>

      <ConversionWorkflow />

      <Tabs defaultValue="analyze" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="analyze">Analyser</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="convert">Konverter</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          <AIWebsiteAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <DesignSpecification />
        </TabsContent>

        <TabsContent value="convert" className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <LovableComponentGenerator 
            designSpec={designSpec}
            onComponentGenerated={handleComponentGenerated}
          />
        </TabsContent>

        <TabsContent value="deploy" className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <GitHubWordPressIntegration designSpec={designSpec} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WordPressConversionDashboard;
