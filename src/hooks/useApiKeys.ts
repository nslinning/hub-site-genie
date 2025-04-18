
import { useState, useEffect } from "react";
import { getApiKeys, updateApiKey } from "@/utils/admin/storageService";
import { ApiKey } from "@/utils/admin/types";
import { toast } from "sonner";

export const useApiKeys = (service: ApiKey["service"]) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const keys = getApiKeys();
    const activeKey = keys.find(
      (key) => key.service === service && key.active
    );
    setApiKey(activeKey?.key || null);
    setIsLoading(false);
  }, [service]);

  const updateKey = (newKey: string) => {
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
    }

    setApiKey(newKey);
  };

  return {
    apiKey,
    isLoading,
    updateKey,
  };
};
