
import { 
  wordpress, 
  ShoppingCart, 
  Upload, 
  Settings, 
  RefreshCcw,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-card border border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enkel Import</h3>
              <p className="text-muted-foreground">
                Importer eksisterende WordPress-innhold og temaer direkte til N60ai
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">WooCommerce-støtte</h3>
              <p className="text-muted-foreground">
                Full integrasjon med WooCommerce for e-handelsfunksjonalitet
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tilpassbar API</h3>
              <p className="text-muted-foreground">
                Tilpass og utvid WordPress-funksjonalitet med vår API
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <RefreshCcw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Toveis Synkronisering</h3>
              <p className="text-muted-foreground">
                Hold innhold synkronisert mellom WordPress og N60ai
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Datamigrering</h3>
              <p className="text-muted-foreground">
                Sikker og effektiv migrering av WordPress-databaser
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <Wordpress className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Plugin-kompatibilitet</h3>
              <p className="text-muted-foreground">
                Støtte for populære WordPress-plugins og utvidelser
              </p>
            </CardContent>
          </Card>
        </div>

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
