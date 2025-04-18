
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPaletteSectionProps {
  colors: string[];
  onColorChange: (index: number, value: string) => void;
}

const ColorPaletteSection = ({ colors, onColorChange }: ColorPaletteSectionProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {colors.map((color, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-full" 
              style={{ backgroundColor: color }}
            />
            <Label>
              {index === 0 ? "Primær" : 
               index === 1 ? "Sekundær" :
               index === 2 ? "Aksent 1" :
               index === 3 ? "Aksent 2" :
               index === 4 ? "Tekst" : "Bakgrunn"}
            </Label>
          </div>
          <Input
            type="color"
            value={color}
            onChange={(e) => onColorChange(index, e.target.value)}
            className="h-10 w-full"
          />
          <Input 
            value={color} 
            onChange={(e) => onColorChange(index, e.target.value)}
            className="h-8 text-xs"
          />
        </div>
      ))}
    </div>
  );
};

export default ColorPaletteSection;
