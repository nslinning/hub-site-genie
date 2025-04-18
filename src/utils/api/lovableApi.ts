
import { ApiClient, createQueryHook, createMutationHook } from "./apiClient";
import { DesignSpec } from "../wordpress/githubIntegration";

export interface LovableApiConfig {
  apiKey: string;
  environment?: "development" | "production";
}

// Define response types
export interface ComponentAnalysisResponse {
  analysis: string;
  suggestions: string[];
  complexity: number;
}

export interface ComponentGenerationResponse {
  code: string;
  dependencies?: string[];
}

export interface WordPressConversionResponse {
  phpCode: string;
  cssCode: string;
  jsCode?: string;
}

// Define request types
export interface ComponentAnalysisRequest {
  name: string;
  code: string;
}

export interface ComponentGenerationRequest {
  name: string;
  description: string;
  designSpec: DesignSpec;
}

export interface WordPressConversionRequest {
  name: string;
  code: string;
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

  async analyzeComponent(component: ComponentAnalysisRequest): Promise<ComponentAnalysisResponse> {
    return this.client.post<ComponentAnalysisResponse>("/analyze/component", component);
  }

  async generateComponent(request: ComponentGenerationRequest): Promise<ComponentGenerationResponse> {
    return this.client.post<ComponentGenerationResponse>("/generate/component", request);
  }

  async convertToWordPress(component: WordPressConversionRequest): Promise<WordPressConversionResponse> {
    return this.client.post<WordPressConversionResponse>("/convert/wordpress", component);
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
    useComponentAnalysis: createQueryHook<ComponentAnalysisResponse>(client, "/analyze/component", {
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
      retry: 2,
    }),
    useComponentGeneration: createMutationHook<ComponentGenerationResponse, ComponentGenerationRequest>(
      client,
      "/generate/component"
    ),
    useWordPressConversion: createMutationHook<WordPressConversionResponse, WordPressConversionRequest>(
      client,
      "/convert/wordpress"
    ),
  };
};
