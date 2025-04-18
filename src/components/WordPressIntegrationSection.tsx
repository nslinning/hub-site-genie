
import WordPressFeatures from "./wordpress/WordPressFeatures";
import WordPressThemeIntegration from "./wordpress/WordPressThemeIntegration";

const WordPressIntegrationSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <WordPressFeatures />
        <WordPressThemeIntegration />
      </div>
    </div>
  );
};

export default WordPressIntegrationSection;
