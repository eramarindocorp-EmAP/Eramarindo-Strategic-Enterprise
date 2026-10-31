import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Activity,
  Lock,
  Users2,
  Flame,
  Wheat,
  Ship,
  Sparkles,
  CheckCircle,
  Eye,
  Award,
} from 'lucide-react';

export const OperationalExcellence: React.FC = () => {
  const { language, setPdfModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'emap-way' | 'fokus-migas' | 'fokus-pangan'>('emap-way');

  return (
    <section id="governance" className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            {language === 'id' ? 'Standar Tata Kelola Operasional' : 'Operational Governance Standard'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'id'
              ? 'Sistem Manajemen Operasional (OE): Melindungi Manusia & Lingkungan'
              : 'Operational Excellence (OE) System: Protecting People & Environment'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'id'
              ? 'Membantu visi EMAP untuk menjadi perusahaan energi, migas, dan industri global yang paling dikagumi karena keunggulan SDM, integritas kemitraan, dan kinerjanya.'
              : 'Supporting EMAP’s vision to be the most admired global energy, oil & gas, and industrial enterprise renowned for exceptional talent, trusted partnerships, and performance.'}
          </p>

          {/* Navigation sub-tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('emap-way')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'emap-way'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              EMAP WAY (4 Kuadran OE)
            </button>
            <button
              onClick={() => setActiveTab('fokus-migas')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'fokus-migas'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {language === 'id' ? 'Fokus 1: Energi & Maritim' : 'Focus 1: Energy & Maritime'}
            </button>
            <button
              onClick={() => setActiveTab('fokus-pangan')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'fokus-pangan'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {language === 'id' ? 'Fokus 2: Pangan & Akuakultur' : 'Focus 2: Food & Aquaculture'}
            </button>
          </div>
        </div>

        {/* Tab 1: EMAP WAY Circular Visualizer */}
        {activeTab === 'emap-way' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Center Circle & 4 Quadrants */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Quadrant 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 hover:border-emerald-500 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {language === 'id'
                      ? 'Keselamatan & Kesehatan Tenaga Kerja'
                      : 'Occupational Health & Safety (OHS)'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id'
                    ? 'Target Zero Harm. Mengutamakan perlindungan jiwa pekerja di rig lepas pantai, fasilitas petrokimia darat, maupun armada kapal survei.'
                    : 'Target Zero Harm. Prioritizing life preservation across offshore drilling rigs, onshore petrochemical refineries, and marine survey vessels.'}
                </p>
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  ✔ ISO 45001 & Golden Rules Alignment
                </div>
              </div>

              {/* Quadrant 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 hover:border-blue-500 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {language === 'id'
                      ? 'Keandalan Proses & Integritas Aset'
                      : 'Process Reliability & Asset Integrity'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id'
                    ? 'Menjamin seluruh fasilitas beroperasi dengan ketersediaan tinggi tanpa kebocoran, downtime mendadak, atau degradasi infrastruktur kritis.'
                    : 'Ensuring critical plant operations achieve maximum uptime with zero leaks, zero unexpected outages, and robust asset longevity.'}
                </p>
                <div className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400">
                  ✔ Predictive Maintenance & High Reliability
                </div>
              </div>

              {/* Quadrant 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 hover:border-cyan-500 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold">
                    <Users2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {language === 'id'
                      ? 'Manajemen Pemangku Kepentingan'
                      : 'Stakeholder Governance & Community'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id'
                    ? 'Kemitraan erat dengan regulator perbankan, masyarakat adat, dewan pemuda, serta entitas hukum pengadilan tinggi untuk kepastian investasi.'
                    : 'Close alignment with regulatory banking authorities, indigenous communities, national youth councils, and high court compliance.'}
                </p>
                <div className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                  ✔ Social License to Operate & Trust
                </div>
              </div>

              {/* Quadrant 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 hover:border-amber-500 transition-all shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {language === 'id'
                      ? 'Efisiensi, Biaya & Keamanan Siber'
                      : 'Efficiency, Security & Cyber Defense'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id'
                    ? 'Optimalisasi OPEX, audit rantai pasok digital tanpa celah, serta perlindungan kriptografis data transaksi modal berstandar internasional.'
                    : 'OPEX optimization, airtight digital supply chain auditing, and international standard cryptographic protection of capital transaction data.'}
                </p>
                <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  ✔ Cost Discipline & 24/7 Security
                </div>
              </div>
            </div>

            {/* Core Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white text-center max-w-2xl mx-auto border border-emerald-700/40">
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
                EMAP WAY CORE
              </span>
              <div className="font-extrabold text-lg mt-0.5">
                "Nilai Perlindungan Manusia dan Lingkungan"
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fokus Eksekusi 1: Energi & Migas */}
        {activeTab === 'fokus-migas' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
            <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-7 h-7 text-amber-400" />
                <h3 className="text-2xl font-bold">
                  {language === 'id'
                    ? 'Fokus Eksekusi 1: Energi, Migas, dan Eksplorasi Maritim'
                    : 'Execution Focus 1: Energy, Oil & Gas, and Marine Exploration'}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mb-8">
                {language === 'id'
                  ? 'Pengerahan armada kapal dan teknologi tinggi seismik untuk kedaulatan energi maritim Indonesia, dipadukan dengan infrastruktur petrokimia darat berdaya saing global.'
                  : 'Deployment of specialized fleet vessels and high-tech seismic technologies for Indonesian maritime sovereignty, unified with world-class onshore petrochemical refining capacity.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    Offshore Exploration
                  </div>
                  <div className="text-base font-bold text-white">
                    Eksplorasi Minyak & Gas & Seismik (Offshore)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pengerahan armada kapal survei geofisika dan teknologi seismik kedalaman tinggi untuk memetakan cadangan hidrokarbon baru di cekungan laut lepas.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    Onshore Infrastructure
                  </div>
                  <div className="text-base font-bold text-white">
                    Infrastruktur Petrokimia & Darat (Onshore)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Membangun kapasitas pengolahan dan jaringan distribusi yang andal, mengurangi ketergantungan impor bahan baku polimer dan bahan bakar cair nasional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Fokus Eksekusi 2: Ketahanan Pangan & Food Estate */}
        {activeTab === 'fokus-pangan' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
            <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <Wheat className="w-7 h-7 text-emerald-400" />
                <h3 className="text-2xl font-bold">
                  {language === 'id'
                    ? 'Fokus Eksekusi 2: Ketahanan Pangan (Food Estate) & Akuakultur'
                    : 'Execution Focus 2: Food Estate Resilience & Aquaculture'}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mb-8">
                {language === 'id'
                  ? 'Skalabilitas agrikultur modern untuk menjamin rantai pasok domestik dan pemberdayaan petani lokal, disinergikan dengan Kawasan Ekonomi Khusus (KEK) perikanan komersial.'
                  : 'Modern mechanized agriculture guaranteeing domestic food reserves, synchronized with Special Economic Zone (KEK) commercial marine processing and export hubs.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                    Domestic Supply Chain
                  </div>
                  <div className="text-base font-bold text-white">
                    Ketahanan Pangan Indonesia (Food Estate)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Mekanisasi sawah dan lumbung jagung terpadu dengan irigasi presisi, benih unggul tersertifikasi, serta kepastian harga serap bagi kelompok tani.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    Marine Economic Zones
                  </div>
                  <div className="text-base font-bold text-white">
                    Industri Perikanan & Kawasan Ekonomi Khusus (KEK)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Fasilitas pemrosesan modern berstandar HACCP/FDA, pabrik es bertenaga surya, dan armada penangkapan ikan tuna bernilai ekspor tinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
