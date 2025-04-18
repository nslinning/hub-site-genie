
import { ApiKey } from '@/utils/admin/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash } from 'lucide-react';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  showKeys: Record<string, boolean>;
  onToggleShow: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
}

export const ApiKeysTable = ({
  apiKeys,
  showKeys,
  onToggleShow,
  onToggleActive,
  onDelete
}: ApiKeysTableProps) => {
  return (
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
                      onClick={() => onToggleShow(apiKey.id)}
                    >
                      {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant={apiKey.active ? "outline" : "secondary"}
                    size="sm"
                    onClick={() => onToggleActive(apiKey.id, apiKey.active)}
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
                    onClick={() => onDelete(apiKey.id)}
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
  );
};
