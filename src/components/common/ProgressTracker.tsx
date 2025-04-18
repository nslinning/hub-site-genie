
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export interface ProgressStep {
  id: string;
  label: string;
  status: "pending" | "processing" | "completed" | "error";
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  currentStep: string;
  className?: string;
}

export const ProgressTracker = ({
  steps,
  currentStep,
  className,
}: ProgressTrackerProps) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  const progress = Math.max(0, ((currentIndex + 1) / steps.length) * 100);

  return (
    <div className={cn("space-y-4", className)}>
      <Progress value={progress} className="h-2" />
      
      <div className="grid gap-2">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = 
            steps.findIndex(s => s.id === step.id) < currentIndex;
          const isProcessing = isActive && step.status === "processing";
          const isError = step.status === "error";

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 p-2 rounded transition-colors",
                isActive && "bg-primary/10",
                isCompleted && "text-muted-foreground",
                isError && "bg-destructive/10 text-destructive"
              )}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : isError ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : isCompleted || (isActive && step.status === "completed") ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isActive && "bg-primary",
                    !isActive && !isCompleted && "bg-muted"
                  )}
                />
              )}
              <span className="text-sm">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
