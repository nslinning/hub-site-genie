
import { Button } from "@/components/ui/button";
import WordPressFeatures from "./wordpress/WordPressFeatures";
import WordPressThemeIntegration from "./wordpress/WordPressThemeIntegration";

const WordPressIntegrationSection = () => {
  return (
    <div id="wordpress" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">WordPress-integrasjon</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sømløs integrasjon med WordPress og WooCommerce for å forbedre eksisterende nettsteder
          </p>
        </div>

        <WordPressFeatures />
        <WordPressThemeIntegration />

        <div className="mt-12 text-center">
          <Button className="bg-primary hover:bg-primary/90 button-glow text-lg py-6 px-8">
            Utforsk WordPress-integrasjon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordPressIntegrationSection;
