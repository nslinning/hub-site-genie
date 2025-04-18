
import DevelopmentLayout from "@/components/layout/DevelopmentLayout";
import WordPressIntegrationSection from "@/components/WordPressIntegrationSection";

const Index = () => {
  return (
    <DevelopmentLayout>
      <div className="space-y-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-2xl font-bold tracking-tight">WordPress Konverteringsverktøy</h1>
          <p className="text-muted-foreground">
            Internt verktøy for effektiv konvertering av React-komponenter til WordPress-temaer
          </p>
        </div>
        <WordPressIntegrationSection />
      </div>
    </DevelopmentLayout>
  );
};

export default Index;
