
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className={cn("space-y-4", className)}>
      <Progress value={progress} className="h-2" />
      
      <div className="grid gap-2">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = 
            steps.findIndex(s => s.id === step.id) < currentIndex;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 p-2 rounded",
                isActive && "bg-primary/10",
                isCompleted && "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  isActive && "bg-primary",
                  isCompleted && "bg-primary/50",
                  !isActive && !isCompleted && "bg-muted"
                )}
              />
              <span className="text-sm">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
