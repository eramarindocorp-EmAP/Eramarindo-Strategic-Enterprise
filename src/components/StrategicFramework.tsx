import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CORPORATE_INFO } from '../data/initialData';
import {
  TrendingUp,
  Shield,
  Layers,
  Repeat,
  CheckCircle2,
  Users,
  Target,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';

export const StrategicFramework: React.FC = () => {
  const { language, setPaymentModalOpen, setPdfModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'3fold' | 'pillars' | 'flywheel' | 'comparison'>('3fold');

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            {language === 'id' ? 'Arsitektur Strategis 2026' : 'Strategic Architecture 2026'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'id'
              ? 'Model Investasi Terintegrasi & Fondasi Integritas'
              : 'Integrated Investment Model & Foundation of Integrity'}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            {language === 'id'
              ? 'Membangun ekosistem berkelanjutan melalui kemitraan aktif, peningkatan status kelayakan perbankan (bankable), dan tata kelola berakar pada nilai-nilai luhur.'
              : 'Building sustainable ecosystems through active partnerships, bankability elevation, and governance grounded in uncompromising principles.'}
          </p>

          {/* Tab selector */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab('3fold')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === '3fold'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'id' ? 'Strategi Tiga Lapis' : '3-Fold Strategy'}
            </button>
            <button
              onClick={() => setActiveTab('flywheel')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'flywheel'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'id' ? 'Efek Roda Gila (Flywheel)' : 'Value Flywheel'}
            </button>
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'pillars'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'id' ? '4 Pilar & Prinsip' : '4 Pillars & Principles'}
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'id' ? 'Pasif vs Aktif EMAP' : 'Passive vs Active EMAP'}
            </button>
          </div>
        </div>

        {/* TAB 1: 3-FOLD STRATEGY */}
        {activeTab === '3fold' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CORPORATE_INFO.threeFoldStrategy.map((item, idx) => (
                <div
                  key={idx}
                  className="relative p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:border-blue-500/50 transition-all shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-xl bg-blue-700 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
                        {item.step}
                      </span>
                      <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400 bg-blue-100 dark:bg-blue-950/80 px-2.5 py-1 rounded-full">
                        Tahap {item.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                      {language === 'id' ? item.titleId : item.titleEn}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {language === 'id' ? item.descId : item.descEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/80 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>
                      {idx === 0
                        ? language === 'id' ? 'Harga Rasional & Due Diligence' : 'Rational Valuation & Due Diligence'
                        : idx === 1
                        ? language === 'id' ? 'Peningkatan Status Bankable' : 'Bankability Elevation'
                        : language === 'id' ? 'Target ROI 3x & Retained Equity' : '3x Target ROI & Retained Equity'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategy Highlights Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 to-indigo-950 text-white border border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  {language === 'id' ? 'Hasil Strategis Utama' : 'Key Strategic Deliverable'}
                </div>
                <div className="text-lg sm:text-xl font-bold">
                  {language === 'id'
                    ? 'Target Pengembalian Modal Minimal 3x Lipat + Aliran Anuitas Jangka Panjang'
                    : 'Minimum 3x Capital Return Target + Perpetual Long-Term Annuity Flows'}
                </div>
                <div className="text-xs text-slate-300">
                  {language === 'id'
                    ? 'Pengamanan ekuitas permanen (retained equity) untuk generasi masa depan Indonesia.'
                    : 'Permanent retained equity protection for future generations of Indonesia.'}
                </div>
              </div>

              <button
                onClick={() => setPaymentModalOpen(true)}
                className="shrink-0 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer"
              >
                {language === 'id' ? 'Konsultasi Sindikasi Modal' : 'Syndicate Capital Inquiry'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: THE VALUE FLYWHEEL */}
        {activeTab === 'flywheel' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORPORATE_INFO.flywheelSteps.map((f, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-base">
                      {f.step}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {language === 'id' ? f.titleId : f.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {language === 'id' ? f.descId : f.descEn}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    <span>{language === 'id' ? 'Siklus Berkelanjutan' : 'Continuous Cycle'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-center max-w-3xl mx-auto">
              <Repeat className="w-8 h-8 text-blue-600 dark:text-cyan-400 mx-auto mb-2 animate-spin-slow" />
              <div className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'id'
                  ? 'Efek Roda Gila Eramarindo (The Value Flywheel)'
                  : 'The Eramarindo Value Flywheel'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl mx-auto">
                {language === 'id'
                  ? 'Setiap exit parsial dan success fee yang dipanen langsung diinjeksi kembali untuk mengakuisisi aset mangkrak baru, menciptakan putaran nilai ekonomi yang terus berputar.'
                  : 'Every partial exit and harvested success fee is directly reinjected into acquiring new stalled assets, creating an accelerating economic value loop.'}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: 4 PILLARS & 4 PRINCIPLES */}
        {activeTab === 'pillars' && (
          <div className="space-y-12 animate-fadeIn">
            {/* 4 Integrity Pillars */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                {language === 'id' ? '4 Pilar Fondasi Integritas' : '4 Pillars of Integrity'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CORPORATE_INFO.fourPillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-400 flex items-center justify-center mb-4">
                      {pillar.id === 1 && <Shield className="w-5 h-5" />}
                      {pillar.id === 2 && <HeartHandshake className="w-5 h-5" />}
                      {pillar.id === 3 && <Users className="w-5 h-5" />}
                      {pillar.id === 4 && <Target className="w-5 h-5" />}
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {language === 'id' ? pillar.nameId : pillar.nameEn}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {language === 'id' ? pillar.ruleId : pillar.ruleEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Corporate Principles */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  {language === 'id' ? 'Komitmen Tata Kelola' : 'Governance Commitment'}
                </div>
                <h4 className="text-2xl font-extrabold text-white mt-1">
                  {language === 'id' ? '4 Prinsip Korporat Eramarindo' : '4 Corporate Principles of Eramarindo'}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CORPORATE_INFO.fourPrinciples.map((pr) => (
                  <div key={pr.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <span className="text-xs font-mono font-bold text-cyan-400">0{pr.id}</span>
                    <h5 className="font-bold text-base text-white mt-1">{pr.title}</h5>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {language === 'id' ? pr.descId : pr.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PASSIVE VS ACTIVE COMPARISON */}
        {activeTab === 'comparison' && (
          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md animate-fadeIn">
            <div className="bg-slate-900 text-white p-5 text-center font-bold text-lg">
              {language === 'id'
                ? 'Keunggulan Kompetitif: Pendekatan Pasif Tradisional vs. Manajemen Proyek Aktif Eramarindo'
                : 'Competitive Advantage: Traditional Passive Approach vs. Eramarindo Active Management'}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    <th className="p-4 w-1/4">Dimensi Strategis</th>
                    <th className="p-4 w-1/3 bg-slate-200/50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400">
                      Pendekatan Tradisional
                    </th>
                    <th className="p-4 w-5/12 bg-blue-100/60 dark:bg-blue-950/60 text-blue-900 dark:text-cyan-300">
                      Ekosistem Eramarindo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-xs sm:text-sm">
                  <tr>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">Peran (Role)</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-850/50">
                      Pasif, sekadar penyedia modal saja.
                    </td>
                    <td className="p-4 font-semibold text-blue-900 dark:text-cyan-200 bg-blue-50/50 dark:bg-blue-950/30">
                      Kemitraan Aktif, mengerahkan tim ahli & jejaring untuk mencapai kelayakan bankable.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">Fase Intervensi</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-850/50">
                      Hanya masuk pada proyek yang sudah matang.
                    </td>
                    <td className="p-4 font-semibold text-blue-900 dark:text-cyan-200 bg-blue-50/50 dark:bg-blue-950/30">
                      Mampu mengambil alih proyek mangkrak (stalled) bernilai tinggi karena kendala pengalaman/dana.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">Target Nilai</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-850/50">
                      Keuntungan capital gain standar terbatas.
                    </td>
                    <td className="p-4 font-semibold text-blue-900 dark:text-cyan-200 bg-blue-50/50 dark:bg-blue-950/30">
                      Target 3x money return + success fee + anuitas dividen jangka panjang permanen.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">Dampak Eksternal (ESG)</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-850/50">
                      Sekadar metrik ESG sekunder / checklist formalitas.
                    </td>
                    <td className="p-4 font-semibold text-blue-900 dark:text-cyan-200 bg-blue-50/50 dark:bg-blue-950/30">
                      Mandat utama bagi komunitas lokal, Dewan Pemuda Nasional (NYC), dan perempuan.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
