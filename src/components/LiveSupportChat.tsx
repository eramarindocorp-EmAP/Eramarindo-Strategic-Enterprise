import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Headphones,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const LiveSupportChat: React.FC = () => {
  const { language, addNotification } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'bot',
      text:
        language === 'id'
          ? 'Halo! Selamat datang di Layanan Dukungan Korporat 24/7 PT. Eramarindo Anugerah Pratama. Ada yang dapat kami bantu mengenai sindikasi modal FDI/LDI atau portofolio aset strategis?'
          : 'Welcome to the 24/7 Corporate Support Desk of PT. Eramarindo Anugerah Pratama. How may we assist you regarding FDI/LDI fund syndications or strategic asset portfolios?',
      time: 'Online',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    language === 'id' ? 'Bagaimana cara injeksi modal FDI/LDI?' : 'How to execute FDI/LDI capital injection?',
    language === 'id' ? 'Di mana legalitas resmi Eramarindo terdaftar?' : 'Where is Eramarindo officially registered?',
    language === 'id' ? 'Bagaimana sistem keamanan data E2EE EMAP?' : 'How does the E2EE security vault work?',
    language === 'id' ? 'Hubungi kantor Ir. Ferdynand Marthing' : 'Contact Ir. Ferdynand Marthing office',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Automated smart corporate response
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('injeksi') || lower.includes('fdi') || lower.includes('modal') || lower.includes('invest')) {
        botResponse =
          language === 'id'
            ? 'Injeksi modal dapat dilakukan via tombol "Injeksi Modal / Gateway" di navigasi atas. Kami mendukung Virtual Account (BCA/Mandiri), QRIS dinamis, SWIFT Wire internasional (USD), serta rekening penampung Escrow terverifikasi.'
            : 'Capital injection can be completed via the "Capital Gateway" button. We support Virtual Accounts, QRIS, international SWIFT wires in USD, and custodial escrow accounts.';
      } else if (lower.includes('legalitas') || lower.includes('daftar') || lower.includes('court') || lower.includes('sah')) {
        botResponse =
          language === 'id'
            ? 'PT. Eramarindo Anugerah Pratama terdaftar resmi pada Master of the High Court of Indonesia dengan kepatuhan hukum penuh di bawah grup Eramarindo Corp.'
            : 'PT. Eramarindo Anugerah Pratama is officially registered at the Master of the High Court of Indonesia under full statutory compliance with Eramarindo Corp & Group Company.';
      } else if (lower.includes('ferdynand') || lower.includes('marthing') || lower.includes('kantor') || lower.includes('kontak')) {
        botResponse =
          language === 'id'
            ? 'Manajemen dipimpin oleh Ir. Ferdynand Marthing. Anda dapat menghubungi via email: eramarindocorp@gmail.com atau telepon hotline: +62 812 68 51 4369 di Gedung The Kensington Office Tower Lt. 2, Kelapa Gading, Jakarta Utara.'
            : 'Management is spearheaded by Ir. Ferdynand Marthing. Direct communication desk: eramarindocorp@gmail.com or phone +62 812 68 51 4369 at The Kensington Office Tower 2nd Floor, Kelapa Gading, Jakarta.';
      } else if (lower.includes('e2ee') || lower.includes('keamanan') || lower.includes('enkripsi')) {
        botResponse =
          language === 'id'
            ? 'Sistem kami menggunakan enkripsi klien Web Crypto AES-256-GCM dengan hashing SHA-256 dan arsitektur Zero-Knowledge untuk melindungi seluruh dokumen dan transaksi modal Anda.'
            : 'Our platform enforces browser-native AES-256-GCM encryption with SHA-256 hashing and Zero-Knowledge architecture safeguarding all confidential transactions.';
      } else {
        botResponse =
          language === 'id'
            ? `Terima kasih atas pertanyaan Anda mengenai "${text}". Tiket bantuan telah dibuat dan tim operasional EMAP 24/7 kami siap mendampingi Anda.`
            : `Thank you for your inquiry regarding "${text}". An automated dispatch ticket has been logged for our 24/7 EMAP operational desk.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      addNotification('Respon Layanan 24/7', 'Agen bantuan korporat telah merespon pertanyaan Anda.', 'system');
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all cursor-pointer group"
          aria-label="Buka Layanan Pelanggan 24/7"
        >
          <div className="relative">
            <Headphones className="w-5 h-5 text-cyan-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-900 absolute -top-1 -right-1 animate-pulse"></span>
          </div>
          <span className="hidden sm:inline">
            {language === 'id' ? 'Layanan 24/7' : '24/7 Support Desk'}
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[520px] animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">EMAP Corporate Desk 24/7</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Petugas Aktif Melayani</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                    E
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-750 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[9px] opacity-60 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick chips */}
          <div className="p-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="text-[10px] px-2 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 cursor-pointer text-left truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={language === 'id' ? 'Ketik pertanyaan Anda...' : 'Type your inquiry...'}
              className="flex-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-xs text-slate-900 dark:text-white"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
