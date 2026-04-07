import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store';
import { ChevronLeft, MoreVertical, Mic, ClipboardList, Image as ImageIcon, Bot, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function CustomerService() {
  const { setView } = useAppStore();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '您好！我是您的好吃助手，很高兴为您服务！',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const suggestedQuestions = [
    '订单配送进度',
    '修改配送地址',
    '食材缺失',
    '联系配送员'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMsg]);
    setMessage('');

    // Mock bot response
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `收到您关于“${text}”的咨询，正在为您转接人工客服，请稍候...`,
        sender: 'bot',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-[#F7FAF7] flex flex-col z-[100]">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button 
            onClick={() => setView('main')}
            className="p-2 hover:bg-white/50 transition-all rounded-full z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">客服中心</h1>
        </div>
      </div>

      {/* Chat Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="px-4 py-1 bg-gray-200/50 text-gray-400 text-[10px] rounded-full font-bold uppercase tracking-widest">
            今天
          </span>
        </div>

        <AnimatePresence initial={false}>
          {chatHistory.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.sender === 'bot' ? (
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#5DBE61]/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-6 h-6 text-[#5DBE61]" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`flex flex-col gap-1 max-w-[75%] ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-1">
                  {msg.sender === 'bot' ? '好吃助手' : '我'}
                </span>
                <div className={`p-4 rounded-lg shadow-sm text-sm leading-relaxed ${
                  msg.sender === 'bot' 
                    ? 'bg-white text-gray-700 rounded-tl-none border border-gray-100' 
                    : 'bg-[#5DBE61] text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Suggestions Card */}
        <div className="bg-white/60 backdrop-blur-md rounded-lg p-6 shadow-sm border border-white/40">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">猜您想问</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button 
                key={i}
                onClick={() => handleSend(q)}
                className="px-4 py-2 bg-white text-gray-600 text-xs rounded-full hover:bg-[#5DBE61] hover:text-white transition-all font-medium border border-gray-100 shadow-sm active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Input */}
      <div className="bg-white px-4 py-4 pb-10 flex items-center gap-3 border-t border-gray-100">
        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
          <Mic className="w-6 h-6" />
        </button>
        <div className="flex-1 relative">
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(message)}
            placeholder="请输入您的问题..."
            className="w-full bg-gray-50 rounded-full py-3 px-5 text-sm focus:outline-none focus:ring-1 focus:ring-[#5DBE61]/30 transition-all border border-gray-100"
          />
        </div>
        <div className="flex items-center gap-1">
          {message.trim() ? (
            <button 
              onClick={() => handleSend(message)}
              className="p-2 bg-[#5DBE61] text-white rounded-full transition-all shadow-lg shadow-[#5DBE61]/20 active:scale-90"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <ClipboardList className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <ImageIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
