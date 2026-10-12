import React, { useState, useRef, useEffect } from 'react';
import { Language, ChatMessage } from '../types';
import { askKapetzAi } from '../services/aiService';
import { MessageSquare, Send, Sparkles, AlertOctagon, BookOpen, User, Bot, Loader2 } from 'lucide-react';

interface AiChatAssistantProps {
  language: Language;
}

export const AiChatAssistant: React.FC<AiChatAssistantProps> = ({ language }) => {
  const isTagalog = language === 'TL';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'KAPETZ_AI',
      text: isTagalog
        ? 'Kumusta! Ako si KAPETZ AI, ang iyong ekspertong katulong sa pag-aalaga ng tarantula, alakdan, alupihan, at reptilya. Ano ang nais mong malaman tungkol sa iyong alaga ngayon?\n\n*Paalala: Huwag mag-atubiling magtanong sa Tagalog o English!*'
        : 'Welcome to KAPETZ AI! I am your scientific exotic pet care specialist. Ask me anything about tarantulas, scorpions, centipedes, and reptiles — including molting cycles, humidity control, feeding, or enclosure safety. How can I assist your husbandry today?',
      timestamp: Date.now(),
      references: ['KAPETZ Verified Husbandry Standards']
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = isTagalog
    ? [
        'Bakit nakatihaya ang aking tarantula?',
        'Asian Forest Scorpion: Gaano kadalas pakainin?',
        'Paano maiiwasang makatakas ang Vietnamese Centipede?',
        'Crested Gecko: Sobrang init sa kuwarto',
        'EMERGENCY: Nakagat ako ng alaga'
      ]
    : [
        'Why is my tarantula lying on its back?',
        'Asian Forest Scorpion feeding & humidity setup',
        'Giant Centipede escape prevention guidelines',
        'Crested Gecko overheating danger limits',
        'EMERGENCY: What to do if bitten or stung'
      ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'USER',
      text: trimmed,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askKapetzAi(trimmed, language);
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'KAPETZ_AI',
        text: response.text,
        timestamp: Date.now(),
        isWarning: response.isEmergency,
        references: response.references
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'KAPETZ_AI',
        text: isTagalog
          ? 'Paumanhin, nagkaroon ng pansamantalang aberya. Pakisubukan muli o tingnan ang mga care sheet sa Aklatan.'
          : 'Unable to reach the assistant service. Please try again or reference our verified species library care sheets.',
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] min-h-[550px] flex flex-col bg-[#101520] border border-[#232D3F] rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 bg-[#090C12] border-b border-[#232D3F] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-9 h-9 rounded-full border border-[#00E5FF] overflow-hidden bg-black shadow-[0_0_10px_rgba(0,229,255,0.4)]">
            <img src="/logo.jpg" alt="KAPETZ Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm flex items-center space-x-1.5">
              <span>KAPETZ AI Assistant</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00E676]/20 text-[#00E676] font-mono font-bold">
                Online
              </span>
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              {isTagalog ? 'Siyentipikong Gabay sa Exotic Pet Care' : 'Scientific Captive Invertebrate & Reptile Advisory'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                  isUser
                    ? 'bg-[#181F2E] border-[#232D3F] text-[#00E5FF]'
                    : 'bg-black border-[#00E5FF] text-[#00E5FF]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-md ${
                  isUser
                    ? 'bg-[#00E5FF] text-[#090C12] font-medium rounded-tr-none'
                    : msg.isWarning
                    ? 'bg-[#14101A] border border-[#FF3366]/50 text-white rounded-tl-none'
                    : 'bg-[#181F2E] text-[#E2E8F0] border border-[#232D3F] rounded-tl-none'
                }`}
              >
                {msg.isWarning && (
                  <div className="flex items-center space-x-1.5 text-[#FF3366] font-bold mb-2 text-xs">
                    <AlertOctagon className="w-4 h-4" />
                    <span>{isTagalog ? 'BABALA SA KALIGTASAN / PROTOKOL' : 'CRITICAL SAFETY DIRECTIVE'}</span>
                  </div>
                )}

                <div className="whitespace-pre-line leading-relaxed">
                  {msg.text}
                </div>

                {msg.references && msg.references.length > 0 && !isUser && (
                  <div className="mt-3 pt-2.5 border-t border-[#232D3F]/60 text-[10px] text-[#94A3B8]">
                    <span className="font-bold text-[#00E5FF] flex items-center mb-1">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {isTagalog ? 'Mga Sanggunian:' : 'Reliable References:'}
                    </span>
                    <ul className="space-y-0.5">
                      {msg.references.map((ref, idx) => (
                        <li key={idx}>• {ref}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-[#00E5FF]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isTagalog ? 'Sumasangguni ang KAPETZ AI sa exotic husbandry standards...' : 'KAPETZ AI is consulting verified husbandry standards...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-[#090C12]/90 border-t border-[#232D3F] flex overflow-x-auto space-x-2">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-full bg-[#181F2E] hover:bg-[#232D3F] border border-[#232D3F] hover:border-[#00E5FF]/40 text-[11px] text-[#00E5FF] whitespace-nowrap transition-colors flex items-center space-x-1"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>{qp}</span>
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 sm:p-4 bg-[#090C12] border-t border-[#232D3F]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isTagalog
                ? 'Magtanong tungkol sa humidity, pagbabalat, pagkain...'
                : 'Ask about humidity, molting behavior, enclosure setup...'
            }
            className="flex-1 bg-[#181F2E] border border-[#232D3F] focus:border-[#00E5FF] text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-[#00E5FF] disabled:bg-[#181F2E] text-[#090C12] disabled:text-[#94A3B8] rounded-xl font-bold transition-all hover:bg-[#38EFFF] shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
