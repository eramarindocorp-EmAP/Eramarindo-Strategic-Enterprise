import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  FileText,
  Moon,
  Sun,
  Globe,
  Bell,
  CreditCard,
  Menu,
  X,
  Lock,
  CloudCheck,
  CloudOff,
  RefreshCw,
  Compass,
  CheckCircle,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    fontSize,
    setFontSize,
    activeView,
    setActiveView,
    setPdfModalOpen,
    setPaymentModalOpen,
    setTourOpen,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
    isOnline,
    isSyncing,
    syncNow,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [a11yMenuOpen, setA11yMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelId: 'Beranda', labelEn: 'Home' },
    { id: 'strategy', labelId: 'Strategi 3-Fold', labelEn: '3-Fold Strategy' },
    { id: 'sectors', labelId: 'Ekosistem Sektor', labelEn: 'Sectors' },
    { id: 'governance', labelId: 'EMAP Way & OE', labelEn: 'EMAP Way & OE' },
    { id: 'e2ee', labelId: 'Keamanan E2EE', labelEn: 'E2EE Vault' },
    { id: 'cms', labelId: 'Warta CMS', labelEn: 'Corporate News' },
    { id: 'admin', labelId: 'Dasbor Admin', labelEn: 'Admin Portal' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      {/* Top micro corporate bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs bg-slate-900 text-slate-300 dark:bg-black dark:text-slate-400 border-b border-slate-800">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {language === 'id' ? 'Master of the High Court of Indonesia Registered' : 'Registered on Master of High Court of Indonesia'}
          </span>
          <span className="text-slate-400">
            {language === 'id' ? 'Slogan:' : 'Motto:'} <strong className="text-white">"Satu Standar, Satu Komando"</strong>
          </span>
          <span className="text-slate-400">
            {language === 'id' ? 'Manajer Fund:' : 'Fund Manager:'} <span className="text-slate-200">Eramarindo Corp</span> | PT. Eramarindo Anugerah Pratama
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Cloud Sync Status */}
          <button
            onClick={syncNow}
            disabled={isSyncing}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title={language === 'id' ? 'Sinkronisasi Cloud' : 'Sync to Cloud'}
          >
            {isOnline ? (
              <CloudCheck className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
            ) : (
              <CloudOff className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>
              {isSyncing
                ? language === 'id' ? 'Sinkronisasi...' : 'Syncing...'
                : isOnline
                ? language === 'id' ? 'Cloud Terhubung' : 'Cloud Online'
                : language === 'id' ? 'Offline (Lokal)' : 'Offline (Local)'}
            </span>
          </button>

          <span className="text-slate-600">|</span>

          {/* Quick PDF Deck Button */}
          <button
            onClick={() => setPdfModalOpen(true)}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Dokumen PDF 2026' : 'Strategic PDF Deck'}</span>
          </button>

          <span className="text-slate-600">|</span>

          {/* Tour guide */}
          <button
            onClick={() => setTourOpen(true)}
            className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'id' ? 'Panduan Tur' : 'Quick Tour'}</span>
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-cyan-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
            <span className="tracking-tighter">EMAP</span>
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
              PT. Eramarindo Anugerah Pratama
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
              <span>Eramarindo Corp & Group Company</span>
              <span className="text-blue-600 dark:text-cyan-400">● 2026</span>
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center space-x-1 font-medium text-sm">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id)}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-cyan-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {language === 'id' ? link.labelId : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Real-time Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                if (!notifDropdownOpen) markNotificationsAsRead();
              }}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Notifikasi Real-time"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    {language === 'id' ? 'Pusat Notifikasi Real-time' : 'Real-time Push Center'}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {notifications.length} {language === 'id' ? 'terbaru' : 'recent'}
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 py-1">
                  {notifications.map((item) => (
                    <div key={item.id} className="py-2.5 px-1 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  {language === 'id' ? 'Dilindungi enkripsi end-to-end' : 'Protected by end-to-end encryption'}
                </div>
              </div>
            )}
          </div>

          {/* Accessibility font-size menu */}
          <div className="relative">
            <button
              onClick={() => setA11yMenuOpen(!a11yMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
              title="Aksesibilitas Ukuran Teks"
            >
              A±
            </button>
            {a11yMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 z-50 text-xs">
                <div className="font-semibold text-slate-500 mb-1 px-2">{language === 'id' ? 'Ukuran Font' : 'Font Size'}</div>
                <div className="grid grid-cols-3 gap-1">
                  {(['normal', 'large', 'x-large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setFontSize(size);
                        setA11yMenuOpen(false);
                      }}
                      className={`p-1.5 rounded text-center cursor-pointer ${
                        fontSize === size
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {size === 'normal' ? '100%' : size === 'large' ? '115%' : '130%'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={language === 'id' ? 'Ganti Bahasa ke English' : 'Switch Language to Indonesian'}
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Ganti Mode Tampilan"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* Payment Gateway Trigger Button */}
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-700/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>{language === 'id' ? 'Injeksi Modal / Gateway' : 'Capital Gateway'}</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {language === 'id' ? link.labelId : link.labelEn}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setPdfModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>PDF Deck 2026</span>
            </button>

            <button
              onClick={() => {
                setPaymentModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment Gateway</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
