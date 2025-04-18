
import { toast } from "sonner";
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";

interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
}

interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
  retryConfig?: RetryConfig;
}

export class ApiClient {
  private baseUrl: string;
  private apiKey?: string;
  private retryConfig: Required<RetryConfig>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.retryConfig = {
      maxRetries: config.retryConfig?.maxRetries ?? 3,
      retryDelay: config.retryConfig?.retryDelay ?? 1000,
    };
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit,
    retryCount = 0
  ): Promise<T> {
    try {
      console.log(`Fetching ${options.method} ${url}, retry: ${retryCount}`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
          ...options.headers,
        },
      });

      // For testing only - simulate successful response
      if (process.env.NODE_ENV === 'development' && !response.ok && url.includes('lovable.dev')) {
        console.log('Development mode: simulating successful response for Lovable API');
        return { code: 'console.log("Hello from mock response");' } as unknown as T;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error (${response.status}): ${errorText}`);
        throw new Error(`API error: ${response.statusText} (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Fetch error:`, error);
      
      if (retryCount < this.retryConfig.maxRetries) {
        const delay = this.retryConfig.retryDelay * Math.pow(2, retryCount);
        console.log(`Retrying in ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchWithRetry<T>(url, options, retryCount + 1);
      }
      
      throw error;
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.fetchWithRetry<T>(`${this.baseUrl}${path}`, { method: "GET" });
  }

  async post<T>(path: string, data: any): Promise<T> {
    return this.fetchWithRetry<T>(`${this.baseUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const createQueryHook = <TResponse, TError = Error>(
  client: ApiClient,
  path: string,
  options?: Omit<UseQueryOptions<TResponse, TError>, "queryKey" | "queryFn">
) => {
  // Return the useQuery hook directly
  return () => useQuery<TResponse, TError>({
    queryKey: [path],
    queryFn: () => client.get<TResponse>(path),
    ...options,
  });
};

export const createMutationHook = <TResponse, TVariables = unknown, TError = Error>(
  client: ApiClient,
  path: string
) => {
  // Return the useMutation hook directly
  return () => useMutation<TResponse, TError, TVariables>({
    mutationFn: (variables: TVariables) => {
      console.log(`Mutation called with:`, variables);
      return client.post<TResponse>(path, variables);
    },
    onError: (error) => {
      console.error(`Mutation error:`, error);
      toast.error(`Operation failed: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
};
