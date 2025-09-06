import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { neoHaptic } from '@/lib/neoHaptic';

/**
 * Neo-Minimal Keyboard Navigation System
 * Provides comprehensive keyboard-first navigation for the entire application
 */

export interface KeyboardShortcut {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  description: string;
  action: () => void;
  category: string;
  global?: boolean;
}

export interface NavigationContext {
  currentPage: string;
  focusableElements: HTMLElement[];
  currentFocusIndex: number;
}

class NeoKeyboardNavigationManager {
  private shortcuts: Map<string, KeyboardShortcut> = new Map();
  private navigationContext: NavigationContext = {
    currentPage: '/',
    focusableElements: [],
    currentFocusIndex: -1
  };
  private isEnabled = true;
  
  constructor(private navigate: (path: string) => void) {
    this.initializeGlobalShortcuts();
    this.bindEventListeners();
  }

  private initializeGlobalShortcuts() {
    // Navigation shortcuts
    this.registerShortcut({
      key: 'h',
      metaKey: true,
      description: 'Go to Home/Dashboard',
      action: () => this.navigate('/'),
      category: 'Navigation',
      global: true
    });

    this.registerShortcut({
      key: 's',
      metaKey: true,
      description: 'Go to Subjects',
      action: () => this.navigate('/subjects'),
      category: 'Navigation',
      global: true
    });

    this.registerShortcut({
      key: 't',
      metaKey: true,
      description: 'Go to Tests',
      action: () => this.navigate('/tests'),
      category: 'Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'p',
      metaKey: true,
      description: 'Go to PYQs',
      action: () => this.navigate('/pyqs'),
      category: 'Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'c',
      metaKey: true,
      description: 'Go to Community',
      action: () => this.navigate('/community'),
      category: 'Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'm',
      metaKey: true,
      description: 'Go to Mentors',
      action: () => this.navigate('/connect-mentor'),
      category: 'Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'r',
      metaKey: true,
      description: 'Go to Resources',
      action: () => this.navigate('/resources'),
      category: 'Navigation',
      global: true
    });

    // Focus navigation
    this.registerShortcut({
      key: 'Tab',
      description: 'Navigate to next focusable element',
      action: () => this.navigateToNext(),
      category: 'Focus Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'Tab',
      shiftKey: true,
      description: 'Navigate to previous focusable element',
      action: () => this.navigateToPrevious(),
      category: 'Focus Navigation',
      global: true
    });

    // Quick actions
    this.registerShortcut({
      key: '/',
      description: 'Focus search',
      action: () => this.focusSearch(),
      category: 'Quick Actions',
      global: true
    });

    this.registerShortcut({
      key: 'Escape',
      description: 'Clear focus / Close modals',
      action: () => this.clearFocusOrClose(),
      category: 'Quick Actions',
      global: true
    });

    this.registerShortcut({
      key: '?',
      shiftKey: true,
      description: 'Show keyboard shortcuts help',
      action: () => this.showShortcutsHelp(),
      category: 'Help',
      global: true
    });

    // Arrow key navigation
    this.registerShortcut({
      key: 'ArrowDown',
      description: 'Navigate down',
      action: () => this.navigateDown(),
      category: 'Arrow Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'ArrowUp',
      description: 'Navigate up',
      action: () => this.navigateUp(),
      category: 'Arrow Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'ArrowLeft',
      description: 'Navigate left',
      action: () => this.navigateLeft(),
      category: 'Arrow Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'ArrowRight',
      description: 'Navigate right',
      action: () => this.navigateRight(),
      category: 'Arrow Navigation',
      global: true
    });

    this.registerShortcut({
      key: 'Enter',
      description: 'Activate focused element',
      action: () => this.activateFocused(),
      category: 'Interaction',
      global: true
    });
  }

  private bindEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('focusin', this.updateFocusContext.bind(this));
    window.addEventListener('beforeunload', this.cleanup.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isEnabled) return;

    const shortcutKey = this.generateShortcutKey(event);
    const shortcut = this.shortcuts.get(shortcutKey);

    if (shortcut) {
      event.preventDefault();
      event.stopPropagation();
      
      // Haptic feedback
      neoHaptic.trigger({ type: 'light' });
      
      shortcut.action();
    }
  }

  private generateShortcutKey(event: KeyboardEvent): string {
    const parts = [];
    if (event.metaKey || event.ctrlKey) parts.push('meta');
    if (event.shiftKey) parts.push('shift');
    if (event.altKey) parts.push('alt');
    parts.push(event.key.toLowerCase());
    return parts.join('+');
  }

  public registerShortcut(shortcut: KeyboardShortcut) {
    const key = this.generateShortcutKeyFromConfig(shortcut);
    this.shortcuts.set(key, shortcut);
  }

  private generateShortcutKeyFromConfig(shortcut: KeyboardShortcut): string {
    const parts = [];
    if (shortcut.metaKey || shortcut.ctrlKey) parts.push('meta');
    if (shortcut.shiftKey) parts.push('shift');
    if (shortcut.altKey) parts.push('alt');
    parts.push(shortcut.key.toLowerCase());
    return parts.join('+');
  }

  public updateFocusableElements() {
    // Get all focusable elements
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    const elements = Array.from(document.querySelectorAll(focusableSelectors)) as HTMLElement[];
    
    // Filter out hidden elements
    this.navigationContext.focusableElements = elements.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && 
             window.getComputedStyle(el).visibility !== 'hidden';
    });
  }

  private updateFocusContext(event: FocusEvent) {
    const target = event.target as HTMLElement;
    const index = this.navigationContext.focusableElements.indexOf(target);
    this.navigationContext.currentFocusIndex = index;
  }

  private navigateToNext() {
    this.updateFocusableElements();
    const { focusableElements, currentFocusIndex } = this.navigationContext;
    
    if (focusableElements.length === 0) return;
    
    const nextIndex = (currentFocusIndex + 1) % focusableElements.length;
    this.focusElementAt(nextIndex);
  }

  private navigateToPrevious() {
    this.updateFocusableElements();
    const { focusableElements, currentFocusIndex } = this.navigationContext;
    
    if (focusableElements.length === 0) return;
    
    const prevIndex = currentFocusIndex <= 0 
      ? focusableElements.length - 1 
      : currentFocusIndex - 1;
    this.focusElementAt(prevIndex);
  }

  private navigateDown() {
    // Grid-based navigation for cards/lists
    const focusedElement = document.activeElement as HTMLElement;
    if (!focusedElement) return;

    const rect = focusedElement.getBoundingClientRect();
    const candidates = this.navigationContext.focusableElements.filter(el => {
      const elRect = el.getBoundingClientRect();
      return elRect.top > rect.bottom && 
             Math.abs(elRect.left - rect.left) < rect.width;
    });

    if (candidates.length > 0) {
      candidates[0].focus();
    }
  }

  private navigateUp() {
    const focusedElement = document.activeElement as HTMLElement;
    if (!focusedElement) return;

    const rect = focusedElement.getBoundingClientRect();
    const candidates = this.navigationContext.focusableElements.filter(el => {
      const elRect = el.getBoundingClientRect();
      return elRect.bottom < rect.top && 
             Math.abs(elRect.left - rect.left) < rect.width;
    });

    if (candidates.length > 0) {
      candidates[candidates.length - 1].focus();
    }
  }

  private navigateLeft() {
    const focusedElement = document.activeElement as HTMLElement;
    if (!focusedElement) return;

    const rect = focusedElement.getBoundingClientRect();
    const candidates = this.navigationContext.focusableElements.filter(el => {
      const elRect = el.getBoundingClientRect();
      return elRect.right < rect.left && 
             Math.abs(elRect.top - rect.top) < rect.height;
    });

    if (candidates.length > 0) {
      candidates[candidates.length - 1].focus();
    }
  }

  private navigateRight() {
    const focusedElement = document.activeElement as HTMLElement;
    if (!focusedElement) return;

    const rect = focusedElement.getBoundingClientRect();
    const candidates = this.navigationContext.focusableElements.filter(el => {
      const elRect = el.getBoundingClientRect();
      return elRect.left > rect.right && 
             Math.abs(elRect.top - rect.top) < rect.height;
    });

    if (candidates.length > 0) {
      candidates[0].focus();
    }
  }

  private activateFocused() {
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      if (focusedElement.tagName === 'BUTTON' || focusedElement.tagName === 'A') {
        focusedElement.click();
      } else if (focusedElement.tagName === 'INPUT' && focusedElement.getAttribute('type') === 'checkbox') {
        (focusedElement as HTMLInputElement).checked = !(focusedElement as HTMLInputElement).checked;
        focusedElement.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  private focusElementAt(index: number) {
    const element = this.navigationContext.focusableElements[index];
    if (element) {
      element.focus();
      this.navigationContext.currentFocusIndex = index;
      
      // Scroll into view if needed
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }

  private focusSearch() {
    const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  }

  private clearFocusOrClose() {
    // Close any open modals/dialogs first
    const closeButtons = document.querySelectorAll('[data-close], [aria-label*="close" i]');
    if (closeButtons.length > 0) {
      (closeButtons[0] as HTMLElement).click();
      return;
    }

    // Clear focus
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }
  }

  private showShortcutsHelp() {
    // This could trigger a modal or toast with shortcuts
    const shortcuts = Array.from(this.shortcuts.values());
    const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
      if (!acc[shortcut.category]) acc[shortcut.category] = [];
      acc[shortcut.category].push(shortcut);
      return acc;
    }, {} as Record<string, KeyboardShortcut[]>);

    console.log('Keyboard Shortcuts:', groupedShortcuts);
    
    // You could trigger a toast notification here
    neoHaptic.trigger({ type: 'success' });
  }

  public enable() {
    this.isEnabled = true;
  }

  public disable() {
    this.isEnabled = false;
  }

  private cleanup() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('focusin', this.updateFocusContext.bind(this));
    window.removeEventListener('beforeunload', this.cleanup.bind(this));
  }

  public getShortcuts() {
    return Array.from(this.shortcuts.values());
  }
}

// React Hook for keyboard navigation
export const useNeoKeyboardNavigation = () => {
  const navigate = useNavigate();
  const managerRef = useRef<NeoKeyboardNavigationManager | null>(null);

  useEffect(() => {
    if (!managerRef.current) {
      managerRef.current = new NeoKeyboardNavigationManager(navigate);
    }

    const manager = managerRef.current;
    
    // Update focusable elements when component mounts or page changes
    const updateElements = () => {
      manager.updateFocusableElements();
    };

    updateElements();
    
    // Update when new elements are added to DOM
    const observer = new MutationObserver(updateElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [navigate]);

  const registerShortcut = useCallback((shortcut: KeyboardShortcut) => {
    managerRef.current?.registerShortcut(shortcut);
  }, []);

  const enable = useCallback(() => {
    managerRef.current?.enable();
  }, []);

  const disable = useCallback(() => {
    managerRef.current?.disable();
  }, []);

  const getShortcuts = useCallback(() => {
    return managerRef.current?.getShortcuts() || [];
  }, []);

  return {
    registerShortcut,
    enable,
    disable,
    getShortcuts
  };
};