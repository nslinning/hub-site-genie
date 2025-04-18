
import { Code2, FileJson, PackageSearch, Layers, LayoutTemplate, FileCode2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface IntegrationStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const integrationSteps: IntegrationStep[] = [
  {
    icon: <Code2 className="h-6 w-6 text-primary" />,
    title: "React-kodeanalyse",
    description: "Analyserer React-komponentstrukturen og identifiserer gjenbrukbare mønstre"
  },
  {
    icon: <FileJson className="h-6 w-6 text-primary" />,
    title: "Tema-mapping",
    description: "Konverterer React-komponenter til WordPress-temakomponenter og maler"
  },
  {
    icon: <PackageSearch className="h-6 w-6 text-primary" />,
    title: "Plugin-integrasjon",
    description: "Identifiserer nødvendige WordPress-plugins for funksjonalitet"
  },
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: "Datastrukturering",
    description: "Setter opp Custom Post Types og taxonomier for innholdsorganisering"
  },
  {
    icon: <LayoutTemplate className="h-6 w-6 text-primary" />,
    title: "Template-generering",
    description: "Genererer responsive WordPress-maler fra React-layouter"
  },
  {
    icon: <FileCode2 className="h-6 w-6 text-primary" />,
    title: "Kode-optimalisering",
    description: "Optimaliserer generert PHP og WordPress-spesifikk kode"
  }
];

const WordPressThemeIntegration = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Fra React til WordPress-tema
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Vår automatiserte konverteringsprosess transformerer Loveable.dev React-prosjekter
          til fullt funksjonelle WordPress-temaer
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
      </div>
    </div>
  );
};

export default WordPressThemeIntegration;
