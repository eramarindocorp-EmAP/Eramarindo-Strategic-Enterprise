import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  FileText,
  CreditCard,
  Lock,
  BarChart3,
  Layers,
} from 'lucide-react';

export const InteractiveTour: React.FC = () => {
  const { tourOpen, setTourOpen, language, setPdfModalOpen, setActiveView, setPaymentModalOpen } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  if (!tourOpen) return null;

  const steps = [
    {
      titleId: 'Selamat Datang di Portal Korporat PT. Eramarindo Anugerah Pratama',
      titleEn: 'Welcome to PT. Eramarindo Anugerah Pratama Corporate Portal',
      descId: 'Portal ini dirancang untuk investor Foreign Direct Investment (FDI) & Local Direct Investment (LDI) serta mitra strategis. Mengintegrasikan CMS, basis data tersinkronisasi, keamanan E2EE, dan gerbang pembayaran modal.',
      descEn: 'Engineered for FDI & LDI institutional investors and strategic stakeholders. Features responsive CMS, cloud-synced database, E2EE vault, and real-time capital transaction gateway.',
      icon: Compass,
      actionTextId: 'Mulai Tur',
      actionTextEn: 'Begin Tour',
      onAction: () => setCurrentStep(1),
    },
    {
      titleId: 'Dokumen Strategis Resmi & Deck PDF 2026',
      titleEn: 'Official Strategic Fund Deck PDF (2026)',
      descId: 'Anda dapat meninjau dan mengunduh berkas presentasi resmi 13 slide yang merinci model 3-Fold Strategy, EMAP Way, dan proyeksi anuitas pengembalian modal 3x lipat langsung di dalam aplikasi.',
      descEn: 'Directly view and download the verified 13-slide corporate presentation detailing the 3-Fold Strategy, EMAP Way, and 3x target ROI projections.',
      icon: FileText,
      actionTextId: 'Buka Pratinjau PDF',
      actionTextEn: 'Preview PDF',
      onAction: () => setPdfModalOpen(true),
    },
    {
      titleId: 'Eksplorasi 12 Sektor Ekosistem Portofolio',
      titleEn: '12 Strategic Portfolio Ecosystem Sectors',
      descId: 'Filter dan telusuri portofolio di bidang Minyak & Gas, Lepas Pantai Maritim, Energi Bersih, Food Estate, hingga IT Telekomunikasi dengan pencarian multi-kriteria canggih.',
      descEn: 'Filter and inspect investment opportunities across Oil & Gas, Offshore Marine, Clean Energy, Food Estates, and FinTech with multi-criteria filters.',
      icon: Layers,
      actionTextId: 'Kunjungi Sektor',
      actionTextEn: 'Visit Sectors',
      onAction: () => setActiveView('sectors'),
    },
    {
      titleId: 'Sistem Pembayaran Pihak Ketiga & Rekening Escrow',
      titleEn: '3rd-Party Payment & Escrow Settlement Gateway',
      descId: 'Simulasikan transfer modal melalui Virtual Account, QRIS dinamis 24/7, SWIFT Wire internasional (USD), atau rekening Escrow dengan notifikasi push dan unduhan kuitansi PDF resmi.',
      descEn: 'Execute capital injection via Virtual Accounts, dynamic QRIS, international SWIFT wires, or custodial escrow with push notifications and instant PDF receipt generation.',
      icon: CreditCard,
      actionTextId: 'Buka Gateway Modal',
      actionTextEn: 'Open Gateway',
      onAction: () => setPaymentModalOpen(true),
    },
    {
      titleId: 'Bilik Kriptografi E2EE & Dasbor Admin Eksekutif',
      titleEn: 'E2EE Cryptographic Vault & Executive Admin Dashboard',
      descId: 'Uji enkripsi tingkat militer AES-256-GCM pada bilik keamanan, lalu kelola konten CMS, ekspor laporan ke Excel/PDF/CSV, dan lakukan sinkronisasi cloud di Dasbor Admin.',
      descEn: 'Test military-grade AES-256-GCM encryption in our security vault, manage CMS publications, and export Excel/PDF/CSV reports in the Admin console.',
      icon: BarChart3,
      actionTextId: 'Menuju Dasbor Admin',
      actionTextEn: 'Go to Admin',
      onAction: () => {
        setActiveView('admin');
        setTourOpen(false);
      },
    },
  ];

  const current = steps[currentStep];
  const StepIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        <button
          onClick={() => setTourOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 flex items-center justify-center font-bold">
            <StepIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
              PANDUAN INTERAKTIF &bull; LANGKAH {currentStep + 1} DARI {steps.length}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
              {language === 'id' ? current.titleId : current.titleEn}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {language === 'id' ? current.descId : current.descEn}
        </p>

        {/* Step dots */}
        <div className="flex justify-center gap-2 pt-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentStep
                  ? 'w-6 bg-blue-600'
                  : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={current.onAction}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              {language === 'id' ? current.actionTextId : current.actionTextEn}
            </button>

            {currentStep < steps.length - 1 && (
              <button
                onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                <span>Lanjut</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
