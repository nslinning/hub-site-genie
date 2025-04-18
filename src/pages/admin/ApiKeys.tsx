
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ApiKeyFormDialog } from '@/components/admin/ApiKeyFormDialog';
import { ApiKeysTable } from '@/components/admin/ApiKeysTable';
import { useApiKeysManagement } from '@/hooks/useApiKeysManagement';

const ApiKeys = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const {
    apiKeys,
    showKeys,
    loadApiKeys,
    handleCreateApiKey,
    handleToggleActive,
    handleDeleteKey,
    toggleShowKey
  } = useApiKeysManagement();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/dashboard');
      return;
    }
    
    loadApiKeys();
  }, [isAdmin, navigate]);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">API Nøkler</h1>
          <p className="text-muted-foreground">
            Administrer API-nøkler for eksterne tjenester
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Legg til nøkkel
        </Button>
      </div>

      <ApiKeysTable
        apiKeys={apiKeys}
        showKeys={showKeys}
        onToggleShow={toggleShowKey}
        onToggleActive={handleToggleActive}
        onDelete={handleDeleteKey}
      />

      <ApiKeyFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateApiKey}
      />
    </AdminLayout>
  );
};

export default ApiKeys;
