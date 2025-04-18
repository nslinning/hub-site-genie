import { Code2, FileJson, PackageSearch, Layers, LayoutTemplate, FileCode2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ConversionActions from "./ConversionActions";

interface IntegrationStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const integrationSteps: IntegrationStep[] = [
  {
    icon: <Code2 className="h-6 w-6 text-primary" />,
    title: "Intelligent Kodeanalyse",
    description: "Automatisert analyseverktøy som hjelper teamet med å identifisere optimale konverteringsmønstre"
  },
  {
    icon: <FileJson className="h-6 w-6 text-primary" />,
    title: "Effektiv Komponentkonvertering",
    description: "Strømlinjeformet arbeidsflyt for rask konvertering av React-komponenter til WordPress-strukturer"
  },
  {
    icon: <PackageSearch className="h-6 w-6 text-primary" />,
    title: "Smart Plugin-håndtering",
    description: "Automatisk kartlegging og konfigurasjon av nødvendige WordPress-plugins for prosjektet"
  },
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: "Avansert Datamodellering",
    description: "Intern verktøykasse for rask oppsett av komplekse innholdsstrukturer i WordPress"
  },
  {
    icon: <LayoutTemplate className="h-6 w-6 text-primary" />,
    title: "Rask Template-bygging",
    description: "Effektive verktøy for å generere optimaliserte WordPress-maler fra React-kodebasen"
  },
  {
    icon: <FileCode2 className="h-6 w-6 text-primary" />,
    title: "Kvalitetssikring",
    description: "Innebygde verktøy for testing og optimalisering av den genererte WordPress-koden"
  }
];

const WordPressThemeIntegration = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Intern WordPress Konverteringsplattform
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Kraftige interne verktøy som hjelper N60ai-teamet med å levere førsteklasses
          WordPress-løsninger til våre kunder på rekordtid
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrationSteps.map((step, index) => (
            <Card key={index} className="border border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{step.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ConversionActions />
      </div>
    </div>
  );
};

export default WordPressThemeIntegration;
