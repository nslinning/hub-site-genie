
import { Card } from "@/components/ui/card";
import CodeAnalysisPanel from "./wordpress/CodeAnalysisPanel";
import WordPressThemeIntegration from "./wordpress/WordPressThemeIntegration";

const WordPressIntegrationSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CodeAnalysisPanel />
        <Card className="p-4">
          <WordPressThemeIntegration />
        </Card>
      </div>
    </div>
  );
};

export default WordPressIntegrationSection;
