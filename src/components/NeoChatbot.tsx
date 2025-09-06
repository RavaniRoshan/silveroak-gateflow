import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNeoEntrance, useNeoTyping, useNeoHover } from '@/hooks/useNeoAnimations';
import { neoHaptic } from '@/lib/neoHaptic';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface NeoChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const NeoChatbot: React.FC<NeoChatbotProps> = ({
  isOpen,
  onClose,
  isMinimized,
  onToggleMinimize
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your GATE preparation assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { ref: chatRef, slideUp } = useNeoEntrance();
  const { ref: typingRef, typeText } = useNeoTyping('', { duration: 1.5 });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      slideUp();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized, slideUp]);

  // Simulate bot response
  const getBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "That's a great question! For GATE preparation, I recommend focusing on core concepts first.",
      "Let me help you with that. Have you covered the fundamental topics in your subject?",
      "Based on your query, I suggest practicing more previous year questions in this area.",
      "This topic is important for GATE. Would you like me to explain the concept step by step?",
      "I understand your concern. Let's break this problem down into smaller parts.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Haptic feedback
    await neoHaptic.trigger({ type: 'light' });

    try {
      const botResponse = await getBotResponse(inputMessage);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={chatRef}
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isMinimized 
          ? 'w-80 h-16' 
          : 'w-96 h-[600px]'
      }`}
    >
      <div className="neo-card border-2 border-neo-lime bg-neo-white h-full flex flex-col overflow-hidden shadow-glow">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neo-black text-neo-white border-b-2 border-neo-lime">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-neo-lime flex items-center justify-center">
              <Bot className="w-5 h-5 text-neo-black" />
            </div>
            <div>
              <h3 className="font-bold text-sm">GATE Assistant</h3>
              {!isMinimized && (
                <p className="text-xs opacity-75">AI-powered study helper</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMinimize}
              className="text-neo-white hover:bg-neo-lime hover:text-neo-black p-1 h-auto"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-neo-white hover:bg-red-500 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-neo-lime flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-neo-black" />
                    </div>
                    <div className="neo-card bg-neo-gray p-3 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <div className="typing-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="text-xs text-gray-500">Typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t-2 border-neo-border bg-neo-gray">
              <div className="flex items-end space-x-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about GATE preparation..."
                  className="neo-input flex-1 resize-none"
                  disabled={isTyping}
                />
                <SendButton 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Individual message component
const ChatMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const { ref: messageRef, fadeIn } = useNeoEntrance({ duration: 0.4 });
  
  useEffect(() => {
    fadeIn();
  }, [fadeIn]);

  return (
    <div 
      ref={messageRef}
      className={`flex items-start space-x-3 ${
        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        message.sender === 'user' 
          ? 'bg-neo-blue' 
          : 'bg-neo-lime'
      }`}>
        {message.sender === 'user' 
          ? <User className="w-4 h-4 text-neo-white" />
          : <Bot className="w-4 h-4 text-neo-black" />
        }
      </div>
      <div className={`neo-card p-3 max-w-xs ${
        message.sender === 'user' 
          ? 'bg-neo-blue text-neo-white ml-auto' 
          : 'bg-neo-gray'
      }`}>
        <p className="text-sm">{message.content}</p>
        <span className={`text-xs mt-1 block ${
          message.sender === 'user' ? 'text-neo-white/70' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

// Send button with hover effects
const SendButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ 
  onClick, 
  disabled 
}) => {
  const { ref: btnRef, onMouseEnter, onMouseLeave } = useNeoHover<HTMLButtonElement>();
  
  return (
    <Button
      ref={btnRef}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="neo-button-primary h-10 w-10 p-0 flex-shrink-0"
    >
      <Send className="w-4 h-4" />
    </Button>
  );
};

// Hook for chatbot state
export const useNeoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return {
    isOpen,
    isMinimized,
    openChatbot: () => setIsOpen(true),
    closeChatbot: () => {
      setIsOpen(false);
      setIsMinimized(false);
    },
    toggleMinimize: () => setIsMinimized(!isMinimized)
  };
};