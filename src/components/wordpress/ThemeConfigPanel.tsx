
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

interface ThemeConfig {
  name: string;
  description: string;
  version: string;
  author: string;
  supports: string[];
}

const ThemeConfigPanel = () => {
  const [config, setConfig] = useState<ThemeConfig>({
    name: '',
    description: '',
    version: '1.0.0',
    author: '',
    supports: ['title-tag', 'post-thumbnails', 'custom-logo']
  });

  const handleConfigChange = (field: keyof ThemeConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfig(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSaveConfig = () => {
    // This will be integrated with the theme conversion process
    console.log('Theme configuration:', config);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Temakonfigurasjon
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Temanavn</Label>
            <Input
              id="name"
              value={config.name}
              onChange={handleConfigChange('name')}
              placeholder="Mitt WordPress-tema"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Beskrivelse</Label>
            <Input
              id="description"
              value={config.description}
              onChange={handleConfigChange('description')}
              placeholder="Beskriv temaet ditt"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="version">Versjon</Label>
            <Input
              id="version"
              value={config.version}
              onChange={handleConfigChange('version')}
              placeholder="1.0.0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Forfatter</Label>
            <Input
              id="author"
              value={config.author}
              onChange={handleConfigChange('author')}
              placeholder="Ditt navn"
            />
          </div>
        </div>
        
        <Button 
          onClick={handleSaveConfig}
          className="w-full"
        >
          Lagre konfigurasjon
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThemeConfigPanel;
