
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface GitHubConfigProps {
  onConfigChange: (config: { owner: string; repo: string; token: string }) => void;
  onCommit: () => Promise<void>;
  isCommitting: boolean;
}

const GitHubConfigSection = ({ onConfigChange, onCommit, isCommitting }: GitHubConfigProps) => {
  const [config, setConfig] = useState({
    owner: "",
    repo: "",
    token: ""
  });

  const handleInputChange = (field: keyof typeof config) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfig = { ...config, [field]: e.target.value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="github-owner">GitHub Brukernavn</Label>
          <Input
            id="github-owner"
            value={config.owner}
            onChange={handleInputChange("owner")}
            placeholder="Ditt GitHub-brukernavn"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-repo">Repository Navn</Label>
          <Input
            id="github-repo"
            value={config.repo}
            onChange={handleInputChange("repo")}
            placeholder="wordpress-theme"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-token">Personal Access Token</Label>
          <Input
            id="github-token"
            type="password"
            value={config.token}
            onChange={handleInputChange("token")}
            placeholder="GitHub token (med repo-rettigheter)"
          />
          <p className="text-xs text-muted-foreground">
            Tokens bør aldri eksponeres i frontend. Dette er kun for demo-formål.
          </p>
        </div>

        <Button
          onClick={onCommit}
          disabled={isCommitting || !config.owner || !config.repo || !config.token}
          className="w-full mt-2"
        >
          {isCommitting ? "Committer..." : "Commit til GitHub"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GitHubConfigSection;
