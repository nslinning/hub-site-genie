
import { Card } from "@/components/ui/card";
import CodeAnalysisPanel from "./wordpress/CodeAnalysisPanel";
import ThemeConfigPanel from "./wordpress/ThemeConfigPanel";
import WordPressThemeIntegration from "./wordpress/WordPressThemeIntegration";
import GitHubIntegrationPanel from "./wordpress/GitHubIntegration";

const WordPressIntegrationSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CodeAnalysisPanel />
        <ThemeConfigPanel />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <GitHubIntegrationPanel />
        <Card className="p-4">
          <WordPressThemeIntegration />
        </Card>
      </div>
    </div>
  );
};

export default WordPressIntegrationSection;
