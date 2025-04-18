
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode2, AlertTriangle } from "lucide-react";
import { convertReactToWordPress, type ComponentData, type ConversionResult } from "@/utils/wordpress/themeConverter";
import { toast } from "sonner";

const CodeAnalysisPanel = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleAnalyzeComponent = async () => {
    setIsAnalyzing(true);
    try {
      // This is a test component for now
      const testComponent: ComponentData = {
        name: "TestComponent",
        code: "// Component code will be analyzed here",
        dependencies: ["react", "@/components/ui/button"]
      };
      
      const conversionResult = await convertReactToWordPress(testComponent);
      setResult(conversionResult);
      toast.success("Komponentanalyse fullført");
    } catch (error) {
      toast.error("Kunne ikke analysere komponenten");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode2 className="h-5 w-5" />
          Kodeanalyse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={handleAnalyzeComponent}
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyserer..." : "Start analyse"}
          </Button>

          {result && (
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Dette er en testversjon av konverteringen. Faktisk komponentanalyse vil implementeres i neste fase.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">PHP Template:</h3>
                  <pre className="bg-muted p-2 rounded-md text-sm">
                    {result.phpCode}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">CSS:</h3>
                  <pre className="bg-muted p-2 rounded-md text-sm">
                    {result.cssCode}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">functions.php:</h3>
                  <pre className="bg-muted p-2 rounded-md text-sm">
                    {result.functionsCode}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeAnalysisPanel;
