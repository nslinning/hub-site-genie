
import { Octokit } from "@octokit/rest";
import { toast } from "sonner";

interface GitHubConfig {
  owner: string;
  repo: string;
  token: string;
}

export interface CommitOptions {
  message: string;
  files: Array<{
    path: string;
    content: string;
  }>;
}

export class GitHubIntegration {
  private octokit: Octokit;
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = config;
    this.octokit = new Octokit({ auth: config.token });
  }

  async createRepository(name: string, description: string) {
    try {
      const response = await this.octokit.repos.createForAuthenticatedUser({
        name,
        description,
        auto_init: true,
      });
      toast.success("Repository created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create repository");
      throw error;
    }
  }

  async commitThemeFiles(options: CommitOptions) {
    try {
      const master = await this.octokit.git.getRef({
        owner: this.config.owner,
        repo: this.config.repo,
        ref: "heads/main",
      });

      const files = await Promise.all(
        options.files.map(async (file) => {
          const blob = await this.octokit.git.createBlob({
            owner: this.config.owner,
            repo: this.config.repo,
            content: file.content,
            encoding: "utf-8",
          });
          return {
            path: file.path,
            mode: "100644" as const, // Fix: Use literal type instead of string
            type: "blob" as const,  // Fix: Use literal type instead of string
            sha: blob.data.sha,
          };
        })
      );

      const tree = await this.octokit.git.createTree({
        owner: this.config.owner,
        repo: this.config.repo,
        base_tree: master.data.object.sha,
        tree: files,
      });

      const commit = await this.octokit.git.createCommit({
        owner: this.config.owner,
        repo: this.config.repo,
        message: options.message,
        tree: tree.data.sha,
        parents: [master.data.object.sha],
      });

      await this.octokit.git.updateRef({
        owner: this.config.owner,
        repo: this.config.repo,
        ref: "heads/main",
        sha: commit.data.sha,
      });

      toast.success("Theme files committed successfully");
    } catch (error) {
      toast.error("Failed to commit theme files");
      throw error;
    }
  }
}
