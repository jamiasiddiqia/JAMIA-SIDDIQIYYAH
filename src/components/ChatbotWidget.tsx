'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  { text: "What programs are open?", query: "What programs are open for enrollment?" },
  { text: "How can I pay Zakat?", query: "How do I make a Zakat donation?" },
  { text: "Tell me about the scholars", query: "Who are the scholars and faculty members?" },
  { text: "What is Jamia's mission?", query: "What is the mission and vision of Jamia Siddiqiyyah?" }
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No readable response body received from server.');
      }

      // Initialize assistant empty placeholder message
      const assistantMessage: Message = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamedText = '';
      setIsTyping(false);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: !done });
        
        // Parse OpenAI SSE streaming chunks
        const lines = chunk.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;

          if (trimmed.startsWith('data: ')) {
            try {
              const jsonStr = trimmed.substring(6);
              const parsed = JSON.parse(jsonStr);
              const text = parsed.choices?.[0]?.delta?.content || '';
              if (text) {
                streamedText += text;
                setMessages(prev => {
                  const current = [...prev];
                  if (current.length > 0) {
                    current[current.length - 1] = {
                      role: 'assistant',
                      content: streamedText,
                    };
                  }
                  return current;
                });
              }
            } catch (err) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (err: any) {
      console.error('❌ Chatbot error:', err);
      setError('Sorry, we could not connect to the AI assistant. Please try again.');
      // Remove typing/loading states
      setIsTyping(false);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat window bubble container */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-80 sm:w-[380px] h-[520px] bg-white/95 backdrop-blur-md border border-primary/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header branding */}
            <div className="bg-primary px-5 py-4 flex justify-between items-center text-white relative">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/35 text-secondary shadow-sm">
                  <Sparkles className="w-4 h-4 text-secondary-fixed" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs tracking-wider uppercase">Siddiqiyyah AI</h4>
                  <span className="text-[9px] text-secondary-fixed font-bold tracking-widest uppercase">Verified Support</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 hover:scale-110 transition-all duration-300 p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body messages stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-background-warm/60 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-5 px-3">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-1">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-primary text-sm mb-1.5">Assalamu Alaikum</h5>
                    <p className="text-[11px] text-on-surface-variant/80 max-w-[240px] leading-relaxed">
                      I am the Jamia Siddiqiyyah AI Assistant. Ask me questions about our academic programs, admissions, faculty, or charitable donation campaigns.
                    </p>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="w-full space-y-2 pt-2">
                    <span className="text-[9px] font-bold text-on-surface-variant/40 tracking-wider uppercase block text-left">Suggested Questions</span>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_QUESTIONS.map((qq, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(qq.query)}
                          className="bg-white border border-primary/5 hover:border-primary/25 hover:shadow-sm text-left p-2.5 rounded-xl text-[10px] text-on-surface-variant font-medium leading-tight transition-all cursor-pointer hover:bg-primary/5 active:scale-98"
                        >
                          {qq.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                          className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                            m.role === 'user'
                              ? 'bg-primary text-white rounded-tr-none shadow-sm'
                              : 'bg-white border border-primary/5 text-on-surface-variant rounded-tl-none shadow-sm'
                          }`}
                        >
                          {m.role === 'assistant' ? (
                            <div className="space-y-1.5">
                              {m.content.split('\n').map((line, li) => {
                                const trimmed = line.trim();
                                if (!trimmed) return <div key={li} className="h-1" />;
                                if (trimmed.startsWith('- ')) {
                                  return (
                                    <div key={li} className="flex gap-2 items-start">
                                      <span className="text-primary/60 mt-0.5 shrink-0">•</span>
                                      <span>{trimmed.substring(2)}</span>
                                    </div>
                                  );
                                }
                                if (trimmed.endsWith(':') && trimmed.length < 60) {
                                  return <p key={li} className="font-semibold text-primary/80 mt-1">{trimmed}</p>;
                                }
                                return <p key={li}>{trimmed}</p>;
                              })}
                            </div>
                          ) : (
                            m.content
                          )}
                        </div>
                    </div>
                  ))}

                  {/* Animated typing dots */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-primary/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}

                  {/* Error Notification Alert */}
                  {error && (
                    <div className="bg-error-container border border-error/10 p-3 rounded-xl flex items-start gap-2 text-xs text-on-error-container">
                      <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSubmit}
              className="p-4 border-t border-primary/5 flex gap-2 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your question..."
                disabled={isLoading}
                className="flex-1 bg-background-warm/30 border border-primary/10 hover:border-primary/20 focus:border-primary focus:bg-white rounded-2xl px-4 py-2.5 text-xs focus:outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-on-primary-fixed-variant text-white p-2.5 rounded-2xl transition-all duration-200 disabled:opacity-40 disabled:hover:bg-primary cursor-pointer active:scale-95 shrink-0 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4.5 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center border border-white/10"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
