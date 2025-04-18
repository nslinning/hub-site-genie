
import { Card } from "@/components/ui/card";

interface ConversionProgressProps {
  steps: string[];
}

const ConversionProgress = ({ steps }: ConversionProgressProps) => {
  if (steps.length === 0) return null;

  return (
    <div className="mt-4 w-full">
      <Card className="p-4">
        <h4 className="font-semibold mb-2">Konverteringsprosess:</h4>
        <ul className="list-disc list-inside text-sm">
          {steps.map((step, index) => (
            <li key={index} className="text-muted-foreground">{step}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ConversionProgress;
