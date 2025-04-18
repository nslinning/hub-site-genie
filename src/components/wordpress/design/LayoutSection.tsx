
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
  const [newComponent, setNewComponent] = React.useState("");

  const handleAddComponent = () => {
    if (newComponent && !components.includes(newComponent)) {
      onAddComponent(newComponent);
      setNewComponent("");
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
            <div className="h-24 bg-muted rounded flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                {designLayout.name} layout
              </span>
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
