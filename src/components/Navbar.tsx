
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold gradient-text">N60ai</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="font-medium hover:text-primary transition-colors">Features</a>
          <a href="#ai-integration" className="font-medium hover:text-primary transition-colors">AI Integration</a>
          <a href="#workflow" className="font-medium hover:text-primary transition-colors">Workflow</a>
          <a href="#contact" className="font-medium hover:text-primary transition-colors">Contact</a>
        </div>
        
        <div className="hidden md:block">
          <Button className="bg-primary hover:bg-primary/90 button-glow">Get Started</Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#features" className="font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#ai-integration" className="font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>AI Integration</a>
            <a href="#workflow" className="font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Workflow</a>
            <a href="#contact" className="font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Contact</a>
            <Button className="bg-primary hover:bg-primary/90 w-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
