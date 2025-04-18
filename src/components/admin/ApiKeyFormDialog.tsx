
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiKey } from '@/utils/admin/types';

interface ApiKeyFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (apiKey: Omit<ApiKey, 'id' | 'createdAt'>) => boolean;
}

export const ApiKeyFormDialog = ({ 
  isOpen, 
  onOpenChange,
  onSubmit 
}: ApiKeyFormDialogProps) => {
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    key: '',
    service: 'lovable' as const,
    active: true
  });

  const handleSubmit = () => {
    if (onSubmit(newApiKey)) {
      setNewApiKey({
        name: '',
        key: '',
        service: 'lovable',
        active: true
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Legg til ny API-nøkkel</DialogTitle>
          <DialogDescription>
            Fyll inn informasjon om API-nøkkelen du vil legge til.
          </DialogDescription>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Avbryt</Button>
          <Button onClick={handleSubmit}>Lagre</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
