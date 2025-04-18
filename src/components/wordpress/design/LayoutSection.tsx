
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LayoutSectionProps {
  layout: string;
  components: string[];
  designLayouts: Array<{ id: string; name: string }>;
  onLayoutChange: (layout: string) => void;
  onAddComponent: (component: string) => void;
  onRemoveComponent: (component: string) => void;
}

const LayoutSection = ({
  layout,
  components,
  designLayouts,
  onLayoutChange,
  onAddComponent,
  onRemoveComponent,
}: LayoutSectionProps) => {
  const [newComponent, setNewComponent] = useState("");

  const handleAddComponent = () => {
    if (newComponent && !components.includes(newComponent)) {
      onAddComponent(newComponent);
      setNewComponent("");
    }
  };

  // Layout visualizations based on the layout type
  const getLayoutVisualization = (layoutId: string) => {
    switch(layoutId) {
      case "standard":
        return (
          <div className="flex flex-col space-y-1">
            <div className="bg-primary/30 h-4 w-full rounded"></div>
            <div className="flex space-x-1">
              <div className="bg-primary/20 h-16 w-2/3 rounded"></div>
              <div className="bg-primary/10 h-16 w-1/3 rounded"></div>
            </div>
            <div className="bg-primary/15 h-8 w-full rounded"></div>
          </div>
        );
      case "modern":
        return (
          <div className="grid grid-cols-2 gap-1">
            <div className="col-span-2 bg-primary/30 h-4 rounded"></div>
            <div className="bg-primary/20 h-16 rounded"></div>
            <div className="bg-primary/15 h-16 rounded"></div>
            <div className="col-span-2 bg-primary/10 h-8 rounded"></div>
          </div>
        );
      case "minimalist":
        return (
          <div className="flex flex-col space-y-1">
            <div className="bg-primary/30 h-4 w-1/2 mx-auto rounded"></div>
            <div className="bg-primary/15 h-12 w-3/4 mx-auto rounded"></div>
            <div className="bg-primary/10 h-8 w-1/2 mx-auto rounded"></div>
          </div>
        );
      case "bold":
        return (
          <div className="flex flex-col space-y-1">
            <div className="bg-primary/40 h-8 w-full rounded"></div>
            <div className="grid grid-cols-3 gap-1">
              <div className="bg-primary/30 h-12 rounded"></div>
              <div className="bg-primary/25 h-12 rounded"></div>
              <div className="bg-primary/20 h-12 rounded"></div>
            </div>
            <div className="bg-primary/15 h-4 w-full rounded"></div>
          </div>
        );
      case "elegant":
        return (
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <div className="bg-primary/30 h-4 w-1/4 rounded"></div>
              <div className="bg-primary/30 h-4 w-1/2 rounded"></div>
            </div>
            <div className="bg-primary/15 h-16 w-full rounded"></div>
            <div className="flex justify-center">
              <div className="bg-primary/20 h-4 w-1/3 rounded"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-muted rounded h-full flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Layout preview</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <Label>Layout-struktur</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {designLayouts.map((designLayout) => (
          <div 
            key={designLayout.id}
            className={`border rounded-md p-3 cursor-pointer ${layout === designLayout.id ? 'border-primary bg-primary/10' : ''}`}
            onClick={() => onLayoutChange(designLayout.id)}
          >
            <div className="text-center font-medium mb-2">{designLayout.name}</div>
            <div className="h-24 bg-muted rounded flex items-center justify-center p-2">
              {getLayoutVisualization(designLayout.id)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <Label>Komponenter</Label>
        <div className="flex flex-wrap gap-2">
          {components.map((component) => (
            <div key={component} className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded">
              <span>{component}</span>
              <button 
                onClick={() => onRemoveComponent(component)}
                className="text-muted-foreground hover:text-destructive ml-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ny komponent..."
            value={newComponent}
            onChange={(e) => setNewComponent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddComponent();
              }
            }}
          />
          <Button onClick={handleAddComponent} type="button" variant="outline">
            Legg til
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LayoutSection;
