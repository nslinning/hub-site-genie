
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FolderKanban, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Key
} from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <span className="text-xl font-bold">N60ai Admin</span>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {user.role === 'admin' ? 'Administrator' : 'Konsulent'}
              </p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate('/admin/dashboard')}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate('/admin/customers')}
            >
              <Users className="h-4 w-4 mr-2" />
              Kunder
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => navigate('/admin/projects')}
            >
              <FolderKanban className="h-4 w-4 mr-2" />
              Prosjekter
            </Button>
            
            {isAdmin && (
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate('/admin/api-keys')}
              >
                <Key className="h-4 w-4 mr-2" />
                API Nøkler
              </Button>
            )}
            
            {isAdmin && (
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate('/admin/settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Innstillinger
              </Button>
            )}
          </nav>
        </div>
        
        <div className="mt-auto p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logg ut
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container p-6 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
