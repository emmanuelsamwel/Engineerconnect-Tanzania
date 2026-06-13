import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language } from '../types';
import { Send, FileText, Image, Volume2, Plus, ShieldCheck } from 'lucide-react';

interface ChatDashboardProps {
  language: Language;
  chatMessages: ChatMessage[];
  onSendMessage: (text: string, fileUrl?: string, isVoiceNote?: boolean) => void;
  partnerName: string;
  partnerRole: string;
}

export default function ChatDashboard({
  language,
  chatMessages: initialMessages,
  onSendMessage,
  partnerName,
  partnerRole
}: ChatDashboardProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Voice Recording Simulator
  useEffect(() => {
    let interval: any;
    if (recording) {
      interval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordTimer(0);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const startVoiceRecording = () => {
    setRecording(true);
  };

  const stopVoiceRecording = () => {
    setRecording(false);
    // Add simulated voice note to chat
    onSendMessage(
      language === 'sw' ? '🎙️ Ujumbe wa sauti wa Kiswahili uliotumwa' : '🎙️ Swahili Voice Note (0:04s)',
      undefined,
      true
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate sending file link representation
    onSendMessage(
      `📑 Diagnostic Attachment: ${file.name}`,
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&auto=format&fit=crop&q=80',
      false
    );
  };

  return (
    <div id="chat-channel-box" className="p-4 rounded-xl bg-slate-800/40 border border-white/5 h-[480px] flex flex-col justify-between text-xs">
      {/* Partner Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-center line-height-8 leading-8 text-xs select-none">
            {partnerName[0]}
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-100 flex items-center gap-1">
              <span>{partnerName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </h4>
            <p className="text-[9px] text-slate-500 font-mono uppercase">{partnerRole}</p>
          </div>
        </div>

        <span className="flex items-center space-x-1 text-[9px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          <span>ONLINE SECURE FEED</span>
        </span>
      </div>

      {/* Message Feed Canvas */}
      <div
        ref={scrollRef}
        className="flex-1 my-3 overflow-y-auto space-y-3 pr-1 scrolls-custom font-sans"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((m) => {
          const isSenderCustomer = m.sender === 'customer';
          return (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${
                isSenderCustomer ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`p-2.5 rounded-2xl leading-relaxed text-xs ${
                  isSenderCustomer 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-slate-900 border border-white/10 text-slate-150 rounded-bl-none'
                }`}
              >
                {m.text}

                {/* Simulated file photo if included */}
                {m.fileUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-white/10 relative max-w-[180px]">
                    <img src={m.fileUrl} alt="Attached Diagnose Asset" className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[9px] font-mono uppercase bg-black/60 px-1.5 py-0.5 rounded text-yellow-300">ATTACHED SCHEMATIC</span>
                    </div>
                  </div>
                )}

                {/* Voice Note representation */}
                {m.isVoiceNote && (
                  <div className="flex items-center space-x-2 mt-1 px-2 py-1.5 rounded-lg bg-black/25">
                    <button className="p-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {/* Pulsing wave visualizer */}
                    <div className="flex items-end space-x-0.5 h-4 w-12 pt-1">
                      <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                      <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">0:04s</span>
                  </div>
                )}
              </div>
              <span className="text-[8px] text-slate-500 font-mono mt-0.5 px-1">{m.timestamp}</span>
            </div>
          );
        })}
      </div>

      {/* Simulated Active Voice Wave Overlay */}
      {recording && (
        <div className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 animate-pulse">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            <span className="font-mono text-[10px]">RECORDING VOICE NOTE: {recordTimer}s</span>
          </div>
          <button
            onClick={stopVoiceRecording}
            className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded text-[9px]"
          >
            Stop
          </button>
        </div>
      )}

      {/* Input controls utility */}
      <div className="flex items-center space-x-2 border-t border-white/5 pt-2.5">
        <label className="p-2 bg-slate-900 border border-white/10 hover:border-emerald-500/30 rounded-lg text-slate-400 text-center cursor-pointer hover:text-white transition">
          <Image className="w-4 h-4 text-emerald-400" />
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Swahili Voice Note button */}
        <button
          onMouseDown={startVoiceRecording}
          onMouseUp={stopVoiceRecording}
          onTouchStart={startVoiceRecording}
          onTouchEnd={stopVoiceRecording}
          className="p-2 bg-slate-900 border border-white/10 hover:border-rose-500/30 rounded-lg text-slate-400 hover:text-white transition"
          title="Hold to record Swahili vocal notes"
        >
          🎙️
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder={language === 'sw' ? 'Andika ujumbe hapa...' : 'Send message or technical query...'}
          className="flex-1 bg-slate-900 border border-white/10 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
        />

        <button
          onClick={handleSend}
          className="p-2 py-2 px-3.5 bg-emerald-500 hover:bg-emerald-450 rounded-lg text-slate-950 font-bold tracking-wider hover:opacity-95 text-[10px] transition"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-center text-[9px] text-slate-550 font-mono mt-1 select-none">
        Supports attachments up to 25MB. encrypted under security regulations.
      </div>
    </div>
  );
}
