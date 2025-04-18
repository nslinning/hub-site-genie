
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitMerge, CheckCircle, AlertCircle, FileCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { GitHubIntegration, DesignSpec } from "@/utils/wordpress/githubIntegration";
import { AIIntegration, CodeCheckRequest } from "@/utils/wordpress/aiIntegration";

interface GitHubWordPressIntegrationProps {
  designSpec?: DesignSpec;
}

const GitHubWordPressIntegration = ({ designSpec }: GitHubWordPressIntegrationProps) => {
  const [ghConfig, setGhConfig] = useState({
    owner: "",
    repo: "",
    token: ""
  });
  
  const [themeFiles, setThemeFiles] = useState<Array<{path: string, content: string}>>([
    { path: "style.css", content: "/*\nTheme Name: Custom WordPress Theme\nTheme URI: https://example.com\nAuthor: AI Generated\nVersion: 1.0\n*/" },
    { path: "index.php", content: "<?php get_header(); ?>\n<main>\n  <!-- Content will go here -->\n</main>\n<?php get_footer(); ?>" },
    { path: "functions.php", content: "<?php\n\nfunction theme_setup() {\n  // Theme setup code\n}\nadd_action('after_setup_theme', 'theme_setup');\n" }
  ]);
  
  const [newFilePath, setNewFilePath] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(0);
  const [codeCheckResult, setCodeCheckResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleConfigChange = (field: keyof typeof ghConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGhConfig({
      ...ghConfig,
      [field]: e.target.value,
    });
  };

  const handleAddFile = () => {
    if (newFilePath) {
      setThemeFiles([...themeFiles, { path: newFilePath, content: newFileContent || " " }]);
      setNewFilePath("");
      setNewFileContent("");
    }
  };

  const handleUpdateFileContent = (content: string) => {
    const updated = [...themeFiles];
    updated[selectedFile].content = content;
    setThemeFiles(updated);
  };

  const handleCommitToGitHub = async () => {
    if (!ghConfig.owner || !ghConfig.repo || !ghConfig.token) return;
    
    try {
      const github = new GitHubIntegration(ghConfig);
      
      // Først commit design-specs hvis tilgjengelig
      if (designSpec) {
        await github.commitDesignSpecs(designSpec);
      }
      
      // Deretter commit WordPress filer
      await github.commitThemeFiles({
        message: "Legg til WordPress tema-filer",
        files: themeFiles
      });
    } catch (error) {
      console.error("GitHub commit feil:", error);
    }
  };

  const handleCodeCheck = async () => {
    if (!apiKey || selectedFile >= themeFiles.length) return;
    
    setIsChecking(true);
    try {
      const aiIntegration = new AIIntegration({
        apiKey,
        model: "claude-3.7" // Claude er bedre på kodesjekk
      });
      
      const request: CodeCheckRequest = {
        code: themeFiles[selectedFile].content,
        purpose: `WordPress temafil: ${themeFiles[selectedFile].path}`,
        requirements: "WordPress best practices og sikkerhet"
      };
      
      const result = await aiIntegration.checkCode(request);
      
      if (result.success) {
        setCodeCheckResult(result.data);
      }
    } catch (error) {
      console.error("Kodesjekk feilet:", error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="w-full">
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
            <TabsTrigger value="code-check">Kodesjekk</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-owner">GitHub Brukernavn</Label>
              <Input
                id="github-owner"
                value={ghConfig.owner}
                onChange={handleConfigChange("owner")}
                placeholder="Ditt GitHub-brukernavn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github-repo">Repository Navn</Label>
              <Input
                id="github-repo"
                value={ghConfig.repo}
                onChange={handleConfigChange("repo")}
                placeholder="wordpress-theme"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github-token">Personal Access Token</Label>
              <Input
                id="github-token"
                type="password"
                value={ghConfig.token}
                onChange={handleConfigChange("token")}
                placeholder="GitHub token (med repo-rettigheter)"
              />
              <p className="text-xs text-muted-foreground">
                Tokens bør aldri eksponeres i frontend. Dette er kun for demo-formål.
              </p>
            </div>

            <Button
              onClick={handleCommitToGitHub}
              disabled={!ghConfig.owner || !ghConfig.repo || !ghConfig.token}
              className="w-full mt-2"
            >
              Commit til GitHub
            </Button>
          </TabsContent>

          <TabsContent value="theme-files" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 border rounded-md overflow-hidden">
                <div className="bg-muted px-3 py-2 text-sm font-medium">Filer</div>
                <div className="p-1">
                  {themeFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className={`px-3 py-2 text-sm cursor-pointer rounded ${selectedFile === index ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                      onClick={() => setSelectedFile(index)}
                    >
                      {file.path}
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="filnavn.php"
                      value={newFilePath}
                      onChange={(e) => setNewFilePath(e.target.value)}
                      className="h-8 text-xs"
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleAddFile}
                      className="h-8"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-span-3 border rounded-md overflow-hidden">
                <div className="bg-muted px-3 py-2 text-sm font-medium">
                  {themeFiles[selectedFile]?.path || "Filinnhold"}
                </div>
                <Textarea
                  value={themeFiles[selectedFile]?.content || ""}
                  onChange={(e) => handleUpdateFileContent(e.target.value)}
                  className="font-mono text-sm border-0 rounded-none min-h-[300px]"
                />
              </div>
            </div>

            <div>
              <Button onClick={handleCommitToGitHub} className="w-full">
                Lagre endringer og commit til GitHub
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="code-check" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-api-key">AI API-nøkkel for kodesjekk</Label>
              <Input
                id="ai-api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="API-nøkkel for AI (Claude/Gemini)"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Velg fil for kodesjekk</Label>
              <select
                value={selectedFile}
                onChange={(e) => setSelectedFile(Number(e.target.value))}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                {themeFiles.map((file, index) => (
                  <option key={index} value={index}>
                    {file.path}
                  </option>
                ))}
              </select>
            </div>

            <Button 
              onClick={handleCodeCheck} 
              disabled={isChecking || !apiKey}
              className="w-full"
            >
              <FileCheck className="mr-2 h-4 w-4" />
              {isChecking ? "Sjekker kode..." : "Start AI kodesjekk"}
            </Button>

            {codeCheckResult && (
              <div className="border rounded-md p-4 mt-4 space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Kodesjekk fullført
                </h3>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Kodekvalitet</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm">
                      Simulert AI-respons: Koden følger WordPress standarder, 
                      men mangler input validering og sanitering for sikkerhetsformål.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Anbefalte forbedringer</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-sm whitespace-pre-wrap">
                      <code>
{`// Legg til input validering
if ( isset( $_POST['field'] ) ) {
    $safe_value = sanitize_text_field( $_POST['field'] );
    // Bruk $safe_value videre
}`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 rounded-md">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Sikkerhetsproblemer funnet</p>
                    <p className="mt-1">Mangler validering av brukerinndata som kan føre til XSS-sårbarheter</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GitHubWordPressIntegration;
