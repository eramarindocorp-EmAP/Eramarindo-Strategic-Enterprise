import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectorItem } from '../types';
import {
  Flame,
  Anchor,
  Zap,
  Building2,
  Pickaxe,
  Wheat,
  Fish,
  Droplets,
  Cpu,
  Landmark,
  HeartPulse,
  GraduationCap,
  Filter,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Briefcase,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  Anchor,
  Zap,
  Building2,
  Pickaxe,
  Wheat,
  Fish,
  Droplets,
  Cpu,
  Landmark,
  HeartPulse,
  GraduationCap,
};

export const PortfolioExplorer: React.FC = () => {
  const { language, sectors, setPaymentModalOpen, setSelectedSectorForInvestment } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'energy' | 'food' | 'essential'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectorDetail, setActiveSectorDetail] = useState<SectorItem | null>(null);

  const categories = [
    { id: 'all', labelId: 'Semua 12 Sektor', labelEn: 'All 12 Sectors' },
    { id: 'energy', labelId: 'Kedaulatan Energi & Infrastruktur', labelEn: 'Energy Sovereignty & Infra' },
    { id: 'food', labelId: 'Ketahanan Pangan & Alam', labelEn: 'Food Security & Nature' },
    { id: 'essential', labelId: 'Layanan Esensial & Masa Depan', labelEn: 'Essential Services & Tech' },
  ];

  const filteredSectors = sectors.filter((s) => {
    const matchCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchStatus = selectedStatus === 'all' || s.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchSearch =
      !searchQuery.trim() ||
      s.titleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.featuredProject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subsectors.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchStatus && matchSearch;
  });

  const handleInitiateInvestment = (sector: SectorItem) => {
    setSelectedSectorForInvestment(sector);
    setPaymentModalOpen(true);
  };

  return (
    <section id="sectors" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              {language === 'id' ? 'Ekosistem Portofolio Riil' : 'Real Ecosystem Portfolio'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'id'
                ? 'Peta Ekosistem: Diversifikasi Sektor Strategis Indonesia'
                : 'Ecosystem Map: Strategic Indonesian Sector Diversification'}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
              {language === 'id'
                ? 'Alokasi modal terstruktur mencakup 12 sektor vital dengan fokus eksekusi aktif, kepatuhan ESG, dan anuitas berkelanjutan.'
                : 'Structured capital allocations across 12 vital sectors with active operational governance, ESG compliance, and sustainable annuities.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-semibold">
              {filteredSectors.length} {language === 'id' ? 'Sektor Terfilter' : 'Sectors Available'}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id as unknown as typeof selectedCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {language === 'id' ? c.labelId : c.labelEn}
                </button>
              ))}
            </div>

            {/* Status select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="all">{language === 'id' ? 'Semua Status' : 'All Status'}</option>
                <option value="active">Active (Eksekusi)</option>
                <option value="development">Development (Pengembangan)</option>
                <option value="pipeline">Pipeline (Sindikasi)</option>
              </select>
            </div>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'id'
                  ? 'Cari nama sektor, proyek unggulan, atau sub-sektor...'
                  : 'Search sector name, flagship project, or subsectors...'
              }
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSectors.map((sector) => {
            const IconComponent = ICON_MAP[sector.iconName] || Briefcase;

            return (
              <div
                key={sector.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-900/50 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                          sector.status === 'Active'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : sector.status === 'Development'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {sector.status}
                      </span>
                      <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                        ROI: {sector.targetRoi}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                    {language === 'id' ? sector.titleId : sector.titleEn}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {language === 'id' ? sector.descriptionId : sector.descriptionEn}
                  </p>

                  {/* Featured Project */}
                  <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      {language === 'id' ? 'Proyek Unggulan' : 'Featured Asset'}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                      {sector.featuredProject}
                    </div>
                    <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold mt-1">
                      {sector.investmentScale}
                    </div>
                  </div>

                  {/* Subsector pills */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {sector.subsectors.slice(0, 3).map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {sub}
                      </span>
                    ))}
                    {sector.subsectors.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md text-slate-400">
                        +{sector.subsectors.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveSectorDetail(sector)}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {language === 'id' ? 'Detail Portofolio' : 'View Spec'}
                  </button>

                  <button
                    onClick={() => handleInitiateInvestment(sector)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 cursor-pointer"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-cyan-300" />
                    <span>{language === 'id' ? 'Injeksi Modal' : 'Invest / Syndicate'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sector Detail Modal */}
        {activeSectorDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="max-w-xl w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                    {activeSectorDetail.category.toUpperCase()} SECTOR
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {language === 'id' ? activeSectorDetail.titleId : activeSectorDetail.titleEn}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveSectorDetail(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'id' ? activeSectorDetail.descriptionId : activeSectorDetail.descriptionEn}
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <div className="text-slate-400">Target ROI Pengembalian:</div>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {activeSectorDetail.targetRoi} (Min 3x Lipat)
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Skala Kebutuhan Modal:</div>
                  <div className="text-base font-bold text-blue-600 dark:text-cyan-400">
                    {activeSectorDetail.investmentScale}
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-slate-400">Proyek Unggulan Aktif:</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {activeSectorDetail.featuredProject}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-500 mb-2">
                  {language === 'id' ? 'Sub-sektor Terintegrasi:' : 'Integrated Sub-sectors:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeSectorDetail.subsectors.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 text-xs font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setActiveSectorDetail(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {language === 'id' ? 'Tutup' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    const sec = activeSectorDetail;
                    setActiveSectorDetail(null);
                    handleInitiateInvestment(sec);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md"
                >
                  {language === 'id' ? 'Inisiasi Aliran Dana' : 'Initiate Capital Inflow'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
