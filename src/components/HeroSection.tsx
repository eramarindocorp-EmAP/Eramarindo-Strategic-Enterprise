import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  CreditCard,
  Shield,
  TrendingUp,
  Globe2,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    language,
    setPdfModalOpen,
    setPaymentModalOpen,
    setActiveView,
    sectors,
    setSelectedSectorForInvestment,
    setTourOpen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuickSectors = searchQuery.trim()
    ? sectors.filter(
        (s) =>
          s.titleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.featuredProject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.subsectors.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* Background Grid Pattern & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-emerald-500/10 blur-3xl pointer-events-none rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-cyan-300 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
            PROJECT & FUND MANAGEMENT 2026
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            Master of the High Court of Indonesia
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            <span className="block text-slate-900 dark:text-slate-100">PT. Eramarindo Anugerah Pratama</span>
            <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 dark:from-cyan-400 dark:via-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">
              {language === 'id'
                ? 'Katalisator Ekuitas Swasta & Aset Strategis Indonesia'
                : 'Catalyst for Sustainable Private Equity & Strategic Assets'}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            {language === 'id'
              ? 'Modul Terintegrasi Pengelolaan Foreign Direct Investment (FDI) & Local Direct Investment (LDI). Mengubah aset mangkrak menjadi bankable dengan tata kelola aktif dan target ROI 3x lipat.'
              : 'Integrated Module for Foreign Direct Investment (FDI) & Local Direct Investment (LDI). Transforming stalled high-value assets into institutional bankability with minimum 3x target ROI.'}
          </p>

          {/* Slogan Banner */}
          <div className="inline-block py-1.5 px-5 rounded-xl bg-slate-900 text-white dark:bg-slate-800/80 border border-slate-700 text-xs sm:text-sm font-semibold tracking-wider">
            {language === 'id' ? 'Satu Standar, Satu Komando' : 'One Standard, One Command'} &bull;{' '}
            <span className="text-cyan-400">Ir. Ferdynand Marthing</span>
          </div>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setPdfModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-800 hover:to-cyan-800 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-900/20 hover:scale-105 transition-all cursor-pointer"
            >
              <FileText className="w-5 h-5 text-cyan-300" />
              <span>{language === 'id' ? 'Buka Dokumen PDF Resmi (Deck 2026)' : 'View Official PDF Deck (2026)'}</span>
            </button>

            <button
              onClick={() => setPaymentModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold text-sm sm:text-base shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'id' ? 'Simulasi Injeksi Modal (FDI/LDI)' : 'Capital Injection Gateway'}</span>
            </button>

            <button
              onClick={() => setActiveView('e2ee')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{language === 'id' ? 'Bilik Enkripsi E2EE' : 'E2EE Vault'}</span>
            </button>
          </div>
        </div>

        {/* Live Filter & Advanced Search Box */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="relative rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 sm:p-2.5 transition-all">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-slate-400 ml-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'id'
                    ? 'Cari sektor, proyek (cth: Minyak & Gas, Food Estate, Offshore, Surya, Finansial)...'
                    : 'Search sectors, projects (e.g., Oil & Gas, Food Estate, Offshore, Solar, Finance)...'
                }
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick search live results dropdown */}
            {searchQuery.trim() && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 max-h-64 overflow-y-auto space-y-2">
                <div className="text-xs font-semibold text-slate-400 px-2">
                  {language === 'id' ? 'Hasil Pencarian Sektor:' : 'Matching Strategic Sectors:'} ({filteredQuickSectors.length})
                </div>
                {filteredQuickSectors.length > 0 ? (
                  filteredQuickSectors.map((sec) => (
                    <div
                      key={sec.id}
                      onClick={() => {
                        setSelectedSectorForInvestment(sec);
                        setActiveView('sectors');
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">
                          {language === 'id' ? sec.titleId : sec.titleEn}
                        </div>
                        <div className="text-xs text-slate-500">{sec.featuredProject}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          ROI: {sec.targetRoi}
                        </span>
                        <div className="text-[11px] text-slate-400">{sec.investmentScale}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-500 py-3 text-center">
                    {language === 'id' ? 'Tidak ada sektor yang cocok.' : 'No sectors matching query.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 4 Corporate Metrics Pillars */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-colors">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              {language === 'id' ? 'Target Pengembalian' : 'Target Return (ROI)'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-cyan-400 mt-1">
              3x Lipat
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {language === 'id' ? 'Early partial exit + retained equity' : 'Early partial exit + retained equity'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-colors">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              {language === 'id' ? 'Portofolio Sektor' : 'Strategic Sectors'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              12 Sektor
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {language === 'id' ? 'Energi, Pangan, & Layanan Esensial' : 'Energy, Food, & Essential Services'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/50 transition-colors">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              {language === 'id' ? 'Kehadiran Global' : 'Global Coordinates'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-300 mt-1">
              5 Wilayah
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Jakarta, Berlin, London, JHB, Nevada
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/50 transition-colors">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              {language === 'id' ? 'Standar Eksekusi' : 'Standard of Governance'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              EMAP WAY
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {language === 'id' ? 'Satu Standar, Satu Komando' : 'One Standard, One Command'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
