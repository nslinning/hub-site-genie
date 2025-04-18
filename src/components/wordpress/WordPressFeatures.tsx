
import { Upload, ShoppingCart, Settings, RefreshCcw, Database, Github } from "lucide-react";
import WordPressFeatureCard from "./WordPressFeatureCard";

const WORDPRESS_FEATURES = [
  {
    Icon: Upload,
    title: "Enkel Import",
    description: "Importer eksisterende WordPress-innhold og temaer direkte til N60ai",
  },
  {
    Icon: ShoppingCart,
    title: "WooCommerce-støtte",
    description: "Full integrasjon med WooCommerce for e-handelsfunksjonalitet",
  },
  {
    Icon: Settings,
    title: "Tilpassbar API",
    description: "Tilpass og utvid WordPress-funksjonalitet med vår API",
  },
  {
    Icon: RefreshCcw,
    title: "Toveis Synkronisering",
    description: "Hold innhold synkronisert mellom WordPress og N60ai",
  },
  {
    Icon: Database,
    title: "Datamigrering",
    description: "Sikker og effektiv migrering av WordPress-databaser",
  },
  {
    Icon: Github, // Using Github as WordPress icon replacement
    title: "Plugin-kompatibilitet",
    description: "Støtte for populære WordPress-plugins og utvidelser",
  },
];

const WordPressFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {WORDPRESS_FEATURES.map((feature, index) => (
        <WordPressFeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default WordPressFeatures;
