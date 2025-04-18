
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, Terminal, Code2, Settings } from "lucide-react";

const DevelopmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="space-y-4 mt-4">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Terminal className="mr-2 h-4 w-4" />
                    Konsolloversikt
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Code2 className="mr-2 h-4 w-4" />
                    Kodeanalyse
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Innstillinger
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <span className="font-semibold text-sm">N60 Utviklerverktøy</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm">
              Dokumentasjon
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DevelopmentLayout;
