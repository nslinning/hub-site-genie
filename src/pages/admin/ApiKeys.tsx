
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ApiKey } from '@/utils/admin/types';
import { 
  getApiKeys, 
  saveApiKey, 
  updateApiKey, 
  deleteApiKey 
} from '@/utils/admin/storageService';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Eye, EyeOff, Trash, Plus } from 'lucide-react';

const ApiKeys = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    key: '',
    service: 'lovable' as const,
    active: true
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/dashboard');
      return;
    }
    
    loadApiKeys();
  }, [isAdmin, navigate]);

  const loadApiKeys = () => {
    setApiKeys(getApiKeys());
  };

  const handleCreateApiKey = () => {
    if (!newApiKey.name || !newApiKey.key) {
      toast.error('Navn og nøkkel må fylles ut');
      return;
    }

    saveApiKey(newApiKey);
    setNewApiKey({
      name: '',
      key: '',
      service: 'lovable',
      active: true
    });
    setIsDialogOpen(false);
    loadApiKeys();
    toast.success('API-nøkkel ble opprettet');
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Navn</TableHead>
              <TableHead>Tjeneste</TableHead>
              <TableHead>Nøkkel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Opprettet</TableHead>
              <TableHead>Handlinger</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Ingen API-nøkler funnet. Legg til din første nøkkel.
                </TableCell>
              </TableRow>
            ) : (
              apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <span className="capitalize">{apiKey.service}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="bg-muted px-1 rounded text-sm">
                        {showKeys[apiKey.id] 
                          ? apiKey.key 
                          : apiKey.key.substring(0, 3) + '•••••••' + apiKey.key.substring(apiKey.key.length - 3)}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleShowKey(apiKey.id)}
                      >
                        {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant={apiKey.active ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => handleToggleActive(apiKey.id, apiKey.active)}
                    >
                      {apiKey.active ? 'Aktiv' : 'Inaktiv'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {new Date(apiKey.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteKey(apiKey.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Legg til ny API-nøkkel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Navn</label>
              <Input
                id="name"
                placeholder="F.eks. Lovable Produksjon"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium">Tjeneste</label>
              <Select
                value={newApiKey.service}
                onValueChange={(value: any) => setNewApiKey({ ...newApiKey, service: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lovable">Lovable.dev</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="claude">Claude AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="key" className="text-sm font-medium">API Nøkkel</label>
              <Input
                id="key"
                placeholder="Lim inn API-nøkkel"
                value={newApiKey.key}
                onChange={(e) => setNewApiKey({ ...newApiKey, key: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Avbryt</Button>
            <Button onClick={handleCreateApiKey}>Lagre</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ApiKeys;
