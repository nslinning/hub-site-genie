
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  getCustomers, 
  getProjects, 
  getApiKeys 
} from '@/utils/admin/storageService';
import { Customer, Project, ApiKey } from '@/utils/admin/types';
import { Users, FolderKanban, Key, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
    setProjects(getProjects());
    setApiKeys(getApiKeys());
  }, []);

  const activeProjects = projects.filter(p => p.status === 'pågående').length;
  const completedProjects = projects.filter(p => p.status === 'fullført').length;
  const inactiveApiKeys = apiKeys.filter(k => !k.active).length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Oversikt over kunder, prosjekter og API-nøkler</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Totale kunder</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktive prosjekter</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">{completedProjects} fullførte prosjekter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Nøkler</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiKeys.length}</div>
            {inactiveApiKeys > 0 && (
              <div className="flex items-center text-xs gap-1 text-warning">
                <AlertTriangle className="h-3 w-3" /> 
                {inactiveApiKeys} inaktive nøkler
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nyeste kunder</CardTitle>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <p className="text-muted-foreground text-sm">Ingen kunder registrert ennå</p>
            ) : (
              <ul className="space-y-2">
                {customers.slice(0, 5).map((customer) => (
                  <li key={customer.id} className="flex justify-between py-2 border-b last:border-0">
                    <span>{customer.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Aktive prosjekter</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.filter(p => p.status === 'pågående').length === 0 ? (
              <p className="text-muted-foreground text-sm">Ingen aktive prosjekter</p>
            ) : (
              <ul className="space-y-2">
                {projects
                  .filter(p => p.status === 'pågående')
                  .slice(0, 5)
                  .map((project) => (
                    <li key={project.id} className="flex justify-between py-2 border-b last:border-0">
                      <span>{project.name}</span>
                      <span className="text-muted-foreground text-sm">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
