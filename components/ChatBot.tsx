import React, { useState, useRef, useEffect } from 'react';
import { sommelierService } from '../services/geminiService';
import { Message } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Greetings! I am the Master Sommelier. Seeking the perfect roast for your mood today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    let fullResponse = '';
    const modelMsg: Message = { role: 'model', text: '...', timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);

    try {
      await sommelierService.sendMessageStream(currentInput, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (lastIndex >= 0 && newMessages[lastIndex].role === 'model') {
            newMessages[lastIndex] = { ...newMessages[lastIndex], text: fullResponse };
          }
          return newMessages;
        });
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-[2rem] shadow-2xl flex flex-col border border-stone-200 overflow-hidden animate-modal">
          <div className="bg-stone-900 p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-robot text-amber-500"></i>
              <span className="font-bold text-sm tracking-tight">AI Sommelier</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-amber-500 transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-amber-900 text-white shadow-lg shadow-amber-900/10' 
                    : 'bg-white shadow-sm border border-stone-100 text-stone-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-100 flex gap-2">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className="flex-1 bg-stone-100 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-amber-800 transition-all" 
              placeholder="Ask about beans, roasts..." 
            />
            <button 
              type="submit" 
              disabled={isTyping}
              className="bg-amber-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-amber-800 transition-all disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-amber-900 text-white w-14 h-14 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
        >
          <i className="fa-solid fa-comment-dots text-xl group-hover:rotate-12 transition-transform"></i>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 border-2 border-stone-50 rounded-full"></div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;