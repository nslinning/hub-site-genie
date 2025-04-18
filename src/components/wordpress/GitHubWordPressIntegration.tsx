
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitMerge } from "lucide-react";
import { GitHubIntegration, DesignSpec } from "@/utils/wordpress/githubIntegration";
import GitHubConfigSection from "./github/GitHubConfigSection";
import ThemeFilesSection from "./github/ThemeFilesSection";
import type { CodeCheckRequest } from "@/utils/wordpress/aiIntegration";

interface GitHubWordPressIntegrationProps {
  designSpec?: DesignSpec;
}

const GitHubWordPressIntegration = ({ designSpec }: GitHubWordPressIntegrationProps) => {
  const [config, setConfig] = useState({
    owner: "",
    repo: "",
    token: ""
  });

  const [themeFiles, setThemeFiles] = useState([
    { path: "style.css", content: "/*\nTheme Name: Custom WordPress Theme\nTheme URI: https://example.com\nAuthor: AI Generated\nVersion: 1.0\n*/" },
    { path: "index.php", content: "<?php get_header(); ?>\n<main>\n  <!-- Content will go here -->\n</main>\n<?php get_footer(); ?>" },
    { path: "functions.php", content: "<?php\n\nfunction theme_setup() {\n  // Theme setup code\n}\nadd_action('after_setup_theme', 'theme_setup');\n" }
  ]);
  
  const [isCommitting, setIsCommitting] = useState(false);

  const handleCommitToGitHub = async () => {
    if (!config.owner || !config.repo || !config.token) return;
    
    setIsCommitting(true);
    try {
      const github = new GitHubIntegration(config);
      
      if (designSpec) {
        await github.commitDesignSpecs(designSpec);
      }
      
      await github.commitThemeFiles({
        message: "Legg til WordPress tema-filer",
        files: themeFiles
      });
    } catch (error) {
      console.error("GitHub commit feil:", error);
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitMerge className="h-5 w-5" />
          GitHub og WordPress Integrasjon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="config">
          <TabsList className="mb-4">
            <TabsTrigger value="config">GitHub-konfigurasjon</TabsTrigger>
            <TabsTrigger value="theme-files">WordPress-filer</TabsTrigger>
          </TabsList>

          <TabsContent value="config">
            <GitHubConfigSection 
              onConfigChange={setConfig}
              onCommit={handleCommitToGitHub}
              isCommitting={isCommitting}
            />
          </TabsContent>

          <TabsContent value="theme-files">
            <ThemeFilesSection 
              files={themeFiles}
              onFileChange={setThemeFiles}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GitHubWordPressIntegration;
