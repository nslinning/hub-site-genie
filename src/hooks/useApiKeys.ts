
import { useState, useEffect } from "react";
import { getApiKeys, updateApiKey } from "@/utils/admin/storageService";
import { ApiKey } from "@/utils/admin/types";
import { toast } from "sonner";

export const useApiKeys = (service: ApiKey["service"]) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const keys = getApiKeys();
      const activeKey = keys.find(
        (key) => key.service === service && key.active
      );
      setApiKey(activeKey?.key || null);
      
      if (!activeKey) {
        console.log(`No active API key found for service: ${service}`);
      }
    } catch (err) {
      console.error(`Error loading API key for ${service}:`, err);
      setError(`Kunne ikke laste API-nøkkel for ${service}`);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const updateKey = (newKey: string) => {
    try {
      const keys = getApiKeys();
      const existingKey = keys.find(
        (key) => key.service === service
      );

      if (existingKey) {
        updateApiKey(existingKey.id, {
          key: newKey,
          active: true
        });
        toast.success("API-nøkkel oppdatert");
      } else {
        // Handle the case when no key exists for this service
        toast.error(`Ingen nøkkel funnet for tjenesten ${service}`);
      }

      setApiKey(newKey);
    } catch (err) {
      console.error(`Error updating API key for ${service}:`, err);
      toast.error(`Kunne ikke oppdatere API-nøkkel for ${service}`);
    }
  };

  return {
    apiKey,
    isLoading,
    error,
    updateKey,
  };
};
