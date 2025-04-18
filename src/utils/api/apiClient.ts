
import { toast } from "sonner";
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

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
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (retryCount < this.retryConfig.maxRetries) {
        await new Promise(resolve => 
          setTimeout(resolve, this.retryConfig.retryDelay * (retryCount + 1))
        );
        return this.fetchWithRetry(url, options, retryCount + 1);
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
    mutationFn: (variables: TVariables) => client.post<TResponse>(path, variables),
    onError: (error) => {
      toast.error(`Operation failed: ${error instanceof Error ? error.message : String(error)}`);
    },
  });
};
