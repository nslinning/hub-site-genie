
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubIntegration } from "@/utils/wordpress/githubIntegration";
import { Github } from "lucide-react";

const GitHubIntegrationPanel = () => {
  const [config, setConfig] = useState({
    owner: "",
    repo: "",
    token: "",
  });

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConfigChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfig((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const github = new GitHubIntegration(config);
      await github.createRepository(config.repo, "WordPress Theme Repository");
    } catch (error) {
      console.error("GitHub integration error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="owner">GitHub Username</Label>
          <Input
            id="owner"
            value={config.owner}
            onChange={handleConfigChange("owner")}
            placeholder="Enter GitHub username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="repo">Repository Name</Label>
          <Input
            id="repo"
            value={config.repo}
            onChange={handleConfigChange("repo")}
            placeholder="wordpress-theme"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token">Personal Access Token</Label>
          <Input
            id="token"
            type="password"
            value={config.token}
            onChange={handleConfigChange("token")}
            placeholder="Enter GitHub token"
          />
        </div>

        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full"
        >
          {isConnecting ? "Connecting..." : "Connect to GitHub"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GitHubIntegrationPanel;
