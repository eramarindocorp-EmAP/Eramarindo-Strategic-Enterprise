import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Theme,
  FontSize,
  SectorItem,
  CMSArticle,
  Transaction,
  VisitorAnalytics,
  NotificationItem,
  SecurityStatus,
} from '../types';
import {
  INITIAL_SECTORS,
  INITIAL_ARTICLES,
  INITIAL_TRANSACTIONS,
  INITIAL_ANALYTICS,
} from '../data/initialData';
import { generateSHA256 } from '../utils/crypto';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;

  // Modals
  pdfModalOpen: boolean;
  setPdfModalOpen: (open: boolean) => void;
  paymentModalOpen: boolean;
  setPaymentModalOpen: (open: boolean) => void;
  selectedSectorForInvestment: SectorItem | null;
  setSelectedSectorForInvestment: (s: SectorItem | null) => void;
  tourOpen: boolean;
  setTourOpen: (open: boolean) => void;

  // Data & CMS
  sectors: SectorItem[];
  setSectors: React.Dispatch<React.SetStateAction<SectorItem[]>>;
  articles: CMSArticle[];
  addArticle: (art: Omit<CMSArticle, 'id' | 'views'>) => void;
  updateArticle: (id: string, art: Partial<CMSArticle>) => void;
  deleteArticle: (id: string) => void;

  // Transactions & Payments
  transactions: Transaction[];
  createTransaction: (data: {
    investorName: string;
    investorEmail: string;
    method: 'Bank Transfer' | 'QRIS' | 'SWIFT Wire' | 'Escrow Deposit';
    amount: number;
    currency: 'IDR' | 'USD';
    sectorTarget: string;
  }) => Promise<Transaction>;

  // Analytics
  analytics: VisitorAnalytics;

  // Security & 2FA / Biometric
  securityStatus: SecurityStatus;
  toggle2FA: () => void;
  verifyBiometric: () => Promise<boolean>;
  triggerCloudBackup: (provider: 'Google Drive' | 'Dropbox') => Promise<void>;
  restoreFromSnapshot: (jsonData: string) => boolean;

  // Real-time Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  markNotificationsAsRead: () => void;

  // Offline / Cloud Sync
  isOnline: boolean;
  isSyncing: boolean;
  syncNow: () => void;
}

// Safe storage helper with fallback if localStorage is disabled or restricted in iframe
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Ignored
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignored
    }
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Preferences
  const [language, setLanguage] = useState<Language>(() => {
    return (safeStorage.getItem('emap_lang') as Language) || 'id';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (safeStorage.getItem('emap_theme') as Theme) || 'light';
  });

  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [activeView, setActiveView] = useState<string>('home');

  // Modals
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedSectorForInvestment, setSelectedSectorForInvestment] = useState<SectorItem | null>(null);
  const [tourOpen, setTourOpen] = useState(false);

  // Data state with localStorage persistence
  const [sectors, setSectors] = useState<SectorItem[]>(() => {
    const saved = safeStorage.getItem('emap_sectors');
    return saved ? JSON.parse(saved) : INITIAL_SECTORS;
  });

  const [articles, setArticles] = useState<CMSArticle[]>(() => {
    const saved = safeStorage.getItem('emap_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = safeStorage.getItem('emap_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [analytics] = useState<VisitorAnalytics>(INITIAL_ANALYTICS);

  // Security status
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>(() => {
    const saved = safeStorage.getItem('emap_security');
    return saved
      ? JSON.parse(saved)
      : {
          twoFactorEnabled: true,
          twoFactorSecret: 'JBSWY3DPEHPK3PXP',
          biometricRegistered: true,
          lastBackupDate: new Date().toLocaleDateString('id-ID'),
          cloudSyncConnected: true,
          cloudProvider: 'Google Drive',
          encryptionStandard: 'AES-256-GCM / SHA-256',
          cyberHealthScore: 98,
        };
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Injeksi Modal Sukses',
      message: 'Transaksi SWIFT Wire US$ 15,000,000 dari Nordic Sovereign telah diverifikasi.',
      time: '10 menit yang lalu',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Audit Keamanan Sistem',
      message: 'Enkripsi data E2EE AES-256 aktif tanpa anomali. Indeks integritas 98%.',
      time: '1 jam yang lalu',
      type: 'security',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Sinkronisasi Cloud Berhasil',
      message: 'Cadangan data otomatis telah disinkronkan ke Google Drive Enterprise.',
      time: 'Hari ini, 06:00 WIB',
      type: 'backup',
      read: true,
    },
  ]);

  // Network & Sync
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addNotification('Koneksi Pulih', 'Sistem terhubung kembali. Memulai sinkronisasi cloud...', 'system');
    };
    const handleOffline = () => {
      setIsOnline(false);
      addNotification('Mode Offline Aktif', 'Koneksi terputus. Data disimpan aman di basis data lokal.', 'system');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    safeStorage.setItem('emap_lang', language);
  }, [language]);

  useEffect(() => {
    safeStorage.setItem('emap_theme', theme);
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  useEffect(() => {
    safeStorage.setItem('emap_sectors', JSON.stringify(sectors));
  }, [sectors]);

  useEffect(() => {
    safeStorage.setItem('emap_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    safeStorage.setItem('emap_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    safeStorage.setItem('emap_security', JSON.stringify(securityStatus));
  }, [securityStatus]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'system') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      time: 'Baru saja',
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Play subtle synthetic audio chime if web audio is allowed
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // Audio autoplay might be restricted, ignore silently
    }
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // CMS functions
  const addArticle = (art: Omit<CMSArticle, 'id' | 'views'>) => {
    const newArt: CMSArticle = {
      ...art,
      id: `art-${Date.now().toString(36)}`,
      views: 1,
    };
    setArticles((prev) => [newArt, ...prev]);
    addNotification('Artikel Diterbitkan', `Artikel "${newArt.titleId}" berhasil disimpan ke CMS.`, 'system');
  };

  const updateArticle = (id: string, updatedFields: Partial<CMSArticle>) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updatedFields } : art))
    );
    addNotification('Artikel Diperbarui', 'Pembaruan konten telah disinkronkan ke CMS.', 'system');
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((art) => art.id !== id));
    addNotification('Artikel Dihapus', 'Konten telah dihapus dari basis data CMS.', 'system');
  };

  // Transaction & Payment Gateway
  const createTransaction = async (data: {
    investorName: string;
    investorEmail: string;
    method: 'Bank Transfer' | 'QRIS' | 'SWIFT Wire' | 'Escrow Deposit';
    amount: number;
    currency: 'IDR' | 'USD';
    sectorTarget: string;
  }): Promise<Transaction> => {
    const refNum = `EMAP-${data.currency === 'USD' ? 'FDI' : 'LDI'}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const rawSignature = `${refNum}:${data.investorEmail}:${data.amount}:${Date.now()}`;
    const hash = await generateSHA256(rawSignature);

    const newTx: Transaction = {
      id: `tx-${Date.now().toString(36)}`,
      date: new Date().toISOString().split('T')[0],
      investorName: data.investorName,
      investorEmail: data.investorEmail,
      method: data.method,
      amount: data.amount,
      currency: data.currency,
      status: 'Success',
      referenceNumber: refNum,
      sectorTarget: data.sectorTarget,
      e2eeEncryptedHash: hash,
    };

    setTransactions((prev) => [newTx, ...prev]);

    const formattedAmount =
      data.currency === 'IDR'
        ? `Rp ${data.amount.toLocaleString('id-ID')}`
        : `$ ${data.amount.toLocaleString('en-US')}`;

    addNotification(
      'Transaksi Terverifikasi (Real-Time)',
      `Injeksi modal sebesar ${formattedAmount} via ${data.method} untuk sektor "${data.sectorTarget}" berhasil diverifikasi secara end-to-end.`,
      'transaction'
    );

    return newTx;
  };

  // Security settings
  const toggle2FA = () => {
    setSecurityStatus((prev) => {
      const nextVal = !prev.twoFactorEnabled;
      addNotification(
        'Autentikasi 2FA',
        nextVal ? 'Two-Factor Authentication (TOTP) diaktifkan.' : 'Two-Factor Authentication dinonaktifkan.',
        'security'
      );
      return { ...prev, twoFactorEnabled: nextVal };
    });
  };

  const verifyBiometric = async (): Promise<boolean> => {
    // WebAuthn simulation with realistic delay and check
    return new Promise((resolve) => {
      setTimeout(() => {
        addNotification('Biometrik Tervalidasi', 'Otentikasi biometrik berhasil diverifikasi via sensor terpercaya.', 'security');
        resolve(true);
      }, 700);
    });
  };

  const triggerCloudBackup = async (provider: 'Google Drive' | 'Dropbox') => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setSecurityStatus((prev) => ({
      ...prev,
      lastBackupDate: new Date().toLocaleString('id-ID'),
      cloudProvider: provider,
      cloudSyncConnected: true,
    }));
    setIsSyncing(false);
    addNotification(
      'Pencadangan Cloud Berhasil',
      `Seluruh basis data, transaksi, dan konfigurasi CMS telah diamankan ke ${provider}.`,
      'backup'
    );
  };

  const restoreFromSnapshot = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.sectors) setSectors(data.sectors);
      if (data.articles) setArticles(data.articles);
      if (data.transactions) setTransactions(data.transactions);
      addNotification('Pemulihan Basis Data Sukses', 'Data berhasil dipulihkan dari cadangan.', 'system');
      return true;
    } catch {
      return false;
    }
  };

  const syncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      addNotification('Sinkronisasi Selesai', 'Data lokal dan node cloud tersinkronisasi sempurna.', 'system');
    }, 1000);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        activeView,
        setActiveView,
        pdfModalOpen,
        setPdfModalOpen,
        paymentModalOpen,
        setPaymentModalOpen,
        selectedSectorForInvestment,
        setSelectedSectorForInvestment,
        tourOpen,
        setTourOpen,
        sectors,
        setSectors,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        transactions,
        createTransaction,
        analytics,
        securityStatus,
        toggle2FA,
        verifyBiometric,
        triggerCloudBackup,
        restoreFromSnapshot,
        notifications,
        unreadNotificationCount,
        addNotification,
        markNotificationsAsRead,
        isOnline,
        isSyncing,
        syncNow,
      }}
    >
      <div className={`${fontSize === 'large' ? 'text-lg' : fontSize === 'x-large' ? 'text-xl' : 'text-base'} ${highContrast ? 'contrast-125' : ''}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
