
import { Octokit } from "@octokit/rest";
import { toast } from "sonner";
import { getApiKeys } from "../admin/storageService";

interface GitHubConfig {
  owner: string;
  repo: string;
  token?: string;
}

export interface CommitOptions {
  message: string;
  files: Array<{
    path: string;
    content: string;
  }>;
}

export interface DesignSpec {
  colorPalette: string[];
  typography: {
    headings: string;
    body: string;
  };
  layoutStructure: string;
  components: string[];
}

export class GitHubIntegration {
  private octokit: Octokit | null = null;
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = config;
    this.initializeOctokit();
  }

  private initializeOctokit() {
    let token = this.config.token;
    
    // Hvis token ikke er gitt i config, prøv å hente fra lagrede API-nøkler
    if (!token) {
      const apiKeys = getApiKeys();
      const githubKey = apiKeys.find(
        (key) => key.service === "github" && key.active
      );
      
      if (githubKey) {
        token = githubKey.key;
      }
    }
    
    if (token) {
      this.octokit = new Octokit({ auth: token });
    } else {
      console.error("GitHub token er ikke tilgjengelig");
      this.octokit = null;
    }
  }

  private ensureOctokit() {
    if (!this.octokit) {
      this.initializeOctokit();
      
      if (!this.octokit) {
        throw new Error("GitHub token ikke tilgjengelig");
      }
    }
    return this.octokit;
  }

  async createRepository(name: string, description: string) {
    try {
      const octokit = this.ensureOctokit();
      const response = await octokit.repos.createForAuthenticatedUser({
        name,
        description,
        auto_init: true,
      });
      toast.success("Repository opprettet");
      return response.data;
    } catch (error) {
      toast.error("Kunne ikke opprette repository");
      throw error;
    }
  }

  async commitThemeFiles(options: CommitOptions) {
    try {
      const octokit = this.ensureOctokit();
      
      const master = await octokit.git.getRef({
        owner: this.config.owner,
        repo: this.config.repo,
        ref: "heads/main",
      });

      const files = await Promise.all(
        options.files.map(async (file) => {
          const blob = await octokit.git.createBlob({
            owner: this.config.owner,
            repo: this.config.repo,
            content: file.content,
            encoding: "utf-8",
          });
          return {
            path: file.path,
            mode: "100644" as const,
            type: "blob" as const,
            sha: blob.data.sha,
          };
        })
      );

      const tree = await octokit.git.createTree({
        owner: this.config.owner,
        repo: this.config.repo,
        base_tree: master.data.object.sha,
        tree: files,
      });

      const commit = await octokit.git.createCommit({
        owner: this.config.owner,
        repo: this.config.repo,
        message: options.message,
        tree: tree.data.sha,
        parents: [master.data.object.sha],
      });

      await octokit.git.updateRef({
        owner: this.config.owner,
        repo: this.config.repo,
        ref: "heads/main",
        sha: commit.data.sha,
      });

      toast.success("Tema-filer committed");
    } catch (error) {
      toast.error("Kunne ikke committe tema-filer");
      throw error;
    }
  }

  async commitDesignSpecs(designSpec: DesignSpec) {
    try {
      const content = JSON.stringify(designSpec, null, 2);
      await this.commitThemeFiles({
        message: "Legg til design-spesifikasjoner",
        files: [
          {
            path: "design/specs.json",
            content: content,
          },
        ],
      });
      toast.success("Design-spesifikasjoner lagret");
      return true;
    } catch (error) {
      toast.error("Kunne ikke lagre design-spesifikasjoner");
      throw error;
    }
  }
}
