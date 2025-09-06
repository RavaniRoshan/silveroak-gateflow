import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { 
  Search, Home, BookOpen, Users, FileText, Calculator,
  MessageCircle, User, Palette, Keyboard
} from 'lucide-react';
import { useNeoEntrance } from '@/hooks/useNeoAnimations';
import { neoHaptic } from '@/lib/neoHaptic';
import { Badge } from '@/components/ui/badge';

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
  keywords: string[];
  shortcut?: string[];
}

interface NeoCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NeoCommandPalette: React.FC<NeoCommandPaletteProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { ref: dialogRef, slideUp } = useNeoEntrance({ duration: 0.3 });
  
  // Define commands
  const commands: CommandItem[] = useMemo(() => [
    {
      id: 'nav-home',
      title: 'Home',
      description: 'Go to dashboard',
      icon: <Home className="w-4 h-4" />,
      action: () => navigate('/'),
      group: 'Navigation',
      keywords: ['home', 'dashboard'],
      shortcut: ['⌘', 'H']
    },
    {
      id: 'nav-subjects',
      title: 'Subjects',
      description: 'Browse GATE subjects',
      icon: <BookOpen className="w-4 h-4" />,
      action: () => navigate('/subjects'),
      group: 'Navigation',
      keywords: ['subjects', 'topics'],
      shortcut: ['⌘', 'S']
    },
    {
      id: 'nav-tests',
      title: 'Mock Tests',
      description: 'Take practice tests',
      icon: <Calculator className="w-4 h-4" />,
      action: () => navigate('/tests'),
      group: 'Navigation',
      keywords: ['tests', 'mock', 'practice'],
      shortcut: ['⌘', 'T']
    },
    {
      id: 'nav-community',
      title: 'Community',
      description: 'Connect with peers',
      icon: <Users className="w-4 h-4" />,
      action: () => navigate('/community'),
      group: 'Navigation',
      keywords: ['community', 'forum'],
      shortcut: ['⌘', 'C']
    },
    {
      id: 'action-theme',
      title: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: <Palette className="w-4 h-4" />,
      action: () => {
        document.documentElement.classList.toggle('dark');
      },
      group: 'Actions',
      keywords: ['theme', 'dark', 'light'],
      shortcut: ['⌘', 'Shift', 'T']
    }
  ], [navigate]);

  // Filter commands
  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(command => 
      command.title.toLowerCase().includes(lowerQuery) ||
      command.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  }, [commands, query]);

  // Execute command
  const executeCommand = async (command: CommandItem) => {
    await neoHaptic.trigger({ type: 'success' });
    command.action();
    onClose();
    setQuery('');
  };

  useEffect(() => {
    if (isOpen) {
      slideUp();
    }
  }, [isOpen, slideUp]);

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <div 
        ref={dialogRef}
        className="neo-card border-2 border-neo-lime bg-neo-white"
      >
        <div className="flex items-center px-4 py-3 border-b-2 border-neo-border bg-neo-gray">
          <Search className="w-5 h-5 text-neo-black mr-3" />
          <span className="neo-text-display text-lg">Command Palette</span>
        </div>

        <Command className="border-none">
          <CommandInput
            placeholder="Type a command or search..."
            value={query}
            onValueChange={setQuery}
            className="neo-input border-none focus:ring-0 text-lg py-4"
          />
          
          <CommandList className="max-h-96">
            {filteredCommands.length === 0 ? (
              <CommandEmpty className="py-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto opacity-50 mb-2" />
                <p className="font-mono">No commands found.</p>
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredCommands.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => executeCommand(command)}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-neo-gray group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-neo-black group-hover:text-neo-lime">
                        {command.icon}
                      </div>
                      <div>
                        <div className="font-bold text-neo-black group-hover:text-neo-lime">
                          {command.title}
                        </div>
                        {command.description && (
                          <div className="text-sm text-gray-600 font-mono">
                            {command.description}
                          </div>
                        )}
                      </div>
                    </div>
                    {command.shortcut && (
                      <div className="flex items-center gap-1">
                        {command.shortcut.map((key, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="text-xs px-1.5 py-0.5 bg-neo-gray border-neo-border"
                          >
                            {key}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </div>
    </CommandDialog>
  );
};

// Hook for command palette
export const useNeoCommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return {
    isOpen,
    openPalette: () => setIsOpen(true),
    closePalette: () => setIsOpen(false),
    togglePalette: () => setIsOpen(!isOpen)
  };
};