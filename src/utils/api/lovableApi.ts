
import { ApiClient, createQueryHook, createMutationHook } from "./apiClient";
import { DesignSpec } from "../wordpress/githubIntegration";

export interface LovableApiConfig {
  apiKey: string;
  environment?: "development" | "production";
}

export class LovableApi {
  private client: ApiClient;

  constructor(config: LovableApiConfig) {
    this.client = new ApiClient({
      baseUrl: "https://api.lovable.dev/v1",
      apiKey: config.apiKey,
      retryConfig: {
        maxRetries: 3,
        retryDelay: 1000,
      },
    });
  }

  async analyzeComponent(component: { name: string; code: string }) {
    return this.client.post("/analyze/component", component);
  }

  async generateComponent(request: {
    name: string;
    description: string;
    designSpec: DesignSpec;
  }) {
    return this.client.post("/generate/component", request);
  }

  async convertToWordPress(component: { name: string; code: string }) {
    return this.client.post("/convert/wordpress", component);
  }

  // Make the client accessible for hooks
  getClient() {
    return this.client;
  }
}

// React hooks for Lovable API
export const useLovableApi = (apiKey: string) => {
  const api = new LovableApi({ apiKey });
  const client = api.getClient();
  
  return {
    useComponentAnalysis: createQueryHook<any>(client, "/analyze/component", {
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
      retry: 2,
    }),
    useComponentGeneration: createMutationHook<any, any>(
      client,
      "/generate/component"
    ),
    useWordPressConversion: createMutationHook<any, any>(
      client,
      "/convert/wordpress"
    ),
  };
};
