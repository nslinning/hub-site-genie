
import { useState } from 'react';
import { ApiKey } from '@/utils/admin/types';
import { 
  getApiKeys, 
  saveApiKey, 
  updateApiKey, 
  deleteApiKey 
} from '@/utils/admin/storageService';
import { toast } from 'sonner';

export const useApiKeysManagement = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const loadApiKeys = () => {
    setApiKeys(getApiKeys());
  };

  const handleCreateApiKey = (newApiKey: Omit<ApiKey, 'id' | 'createdAt'>) => {
    if (!newApiKey.name || !newApiKey.key) {
      toast.error('Navn og nøkkel må fylles ut');
      return false;
    }

    saveApiKey(newApiKey);
    loadApiKeys();
    toast.success('API-nøkkel ble opprettet');
    return true;
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    updateApiKey(id, { active: !currentActive });
    loadApiKeys();
    toast.success(`API-nøkkel ${!currentActive ? 'aktivert' : 'deaktivert'}`);
  };

  const handleDeleteKey = (id: string) => {
    if (window.confirm('Er du sikker på at du vil slette denne API-nøkkelen?')) {
      deleteApiKey(id);
      loadApiKeys();
      toast.success('API-nøkkel ble slettet');
    }
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return {
    apiKeys,
    showKeys,
    loadApiKeys,
    handleCreateApiKey,
    handleToggleActive,
    handleDeleteKey,
    toggleShowKey
  };
};
