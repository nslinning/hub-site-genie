
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ThemeFile {
  path: string;
  content: string;
}

interface ThemeFilesSectionProps {
  files: ThemeFile[];
  onFileChange: (files: ThemeFile[]) => void;
}

const ThemeFilesSection = ({ files, onFileChange }: ThemeFilesSectionProps) => {
  const [selectedFile, setSelectedFile] = useState(0);
  const [newFilePath, setNewFilePath] = useState("");
  const [newFileContent, setNewFileContent] = useState("");

  const handleAddFile = () => {
    if (newFilePath) {
      const updatedFiles = [...files, { path: newFilePath, content: newFileContent || " " }];
      onFileChange(updatedFiles);
      setNewFilePath("");
      setNewFileContent("");
    }
  };

  const handleUpdateFileContent = (content: string) => {
    const updatedFiles = [...files];
    updatedFiles[selectedFile].content = content;
    onFileChange(updatedFiles);
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 border rounded-md overflow-hidden">
            <div className="bg-muted px-3 py-2 text-sm font-medium">Filer</div>
            <div className="p-1">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-2 text-sm cursor-pointer rounded ${selectedFile === index ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  onClick={() => setSelectedFile(index)}
                >
                  {file.path}
                </div>
              ))}
            </div>
            <div className="p-2 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="filnavn.php"
                  value={newFilePath}
                  onChange={(e) => setNewFilePath(e.target.value)}
                  className="h-8 text-xs"
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleAddFile}
                  className="h-8"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-3 border rounded-md overflow-hidden">
            <div className="bg-muted px-3 py-2 text-sm font-medium">
              {files[selectedFile]?.path || "Filinnhold"}
            </div>
            <Textarea
              value={files[selectedFile]?.content || ""}
              onChange={(e) => handleUpdateFileContent(e.target.value)}
              className="font-mono text-sm border-0 rounded-none min-h-[300px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeFilesSection;
