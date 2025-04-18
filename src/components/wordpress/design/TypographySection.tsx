
import { Label } from "@/components/ui/label";

interface Typography {
  headings: string;
  body: string;
}

interface TypographySectionProps {
  typography: Typography;
  onTypographyChange: (newTypography: Typography) => void;
}

const TypographySection = ({ typography, onTypographyChange }: TypographySectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="headings-font">Overskrifter</Label>
        <select
          id="headings-font"
          value={typography.headings}
          onChange={(e) => onTypographyChange({...typography, headings: e.target.value})}
          className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Playfair Display">Playfair Display</option>
        </select>
        <div className="mt-2 p-3 border rounded">
          <h2 style={{fontFamily: typography.headings}} className="text-2xl">
            Overskrift eksempel
          </h2>
          <h3 style={{fontFamily: typography.headings}} className="text-xl mt-2">
            Mindre overskrift
          </h3>
        </div>
      </div>

      <div>
        <Label htmlFor="body-font">Brødtekst</Label>
        <select
          id="body-font"
          value={typography.body}
          onChange={(e) => onTypographyChange({...typography, body: e.target.value})}
          className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
          <option value="Source Sans Pro">Source Sans Pro</option>
        </select>
        <div className="mt-2 p-3 border rounded">
          <p style={{fontFamily: typography.body}} className="text-base">
            Dette er et eksempel på brødtekst som vil bli brukt på nettstedet.
            Det er viktig at denne teksten er lett å lese.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypographySection;
