import React from 'react';
import { useApp } from '../context/AppContext';
import { CORPORATE_INFO } from '../data/initialData';
import {
  Users,
  Heart,
  Briefcase,
  ShieldCheck,
  Building,
  Globe,
  MapPin,
  Scale,
  Sparkles,
} from 'lucide-react';

export const ImpactAndGovernance: React.FC = () => {
  const { language } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Mandat Investasi: Dampak Sosial */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              {language === 'id' ? 'Mandat Dampak Sosial (ESG)' : 'Social Impact Mandate (ESG)'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'id'
                ? 'Pertumbuhan Ekonomi dengan Dampak Sosial yang Kuat'
                : 'Economic Growth with Strong Social Impact'}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'id'
                ? 'Fund memastikan seluruh investasi memiliki dampak sosial dan ekonomi yang terukur dan kuat, berakar pada komunitas lokal dan pelestarian lingkungan hidup.'
                : 'The Fund mandates that all capital allocations generate measurable, profound social and economic impact rooted in local communities and eco-preservation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Women */}
            <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-400 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-lg">
                  👩
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'id' ? 'Perempuan (Women)' : 'Women Empowerment'}
                </h3>
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Pemberdayaan Ekonomi Inklusif
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id'
                    ? 'Membuka akses permodalan usaha tani pesisir, pelatihan kepemimpinan industri pengolahan ikan, dan kesetaraan kesempatan manajerial di seluruh anak usaha EMAP.'
                    : 'Unlocking capital access for coastal female enterprises, processing leadership training, and equal managerial pathways across EMAP subsidiaries.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 font-semibold">
                ✔ 40%+ Keterlibatan Tenaga Kerja Inklusif
              </div>
            </div>

            {/* Youth */}
            <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg">
                  🏛️
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'id' ? 'Pemuda (Youth)' : 'Youth & Future Leaders'}
                </h3>
                <div className="text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                  Dewan Pemuda Nasional (NYC)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id'
                    ? 'Representasi kuat melalui kemitraan strategis Dewan Pemuda Nasional (National Youth Council) guna mencetak kader insinyur maritim, agritech, dan analis keuangan muda.'
                    : 'Direct representation via the National Youth Council to foster young maritime engineers, agritech innovators, and next-gen financial analysts.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 font-semibold">
                ✔ Kemitraan Resmi National Youth Council
              </div>
            </div>

            {/* Socially Disadvantaged */}
            <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-400 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                  🤝
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'id' ? 'Kelompok Rentan' : 'Socially Disadvantaged'}
                </h3>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Penciptaan Lapangan Kerja Riil
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id'
                    ? 'Intervensi sosial langsung pada wilayah 3T (Terdepan, Terluar, Tertinggal) dengan penyerapan tenaga kerja lokal di food estate, tambak, dan logistik maritim.'
                    : 'Direct social intervention across frontier regions with prioritized local hiring across food estates, aquaculture farms, and maritime logistics nodes.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 font-semibold">
                ✔ 15,000+ Serapan Tenaga Kerja Ditargetkan
              </div>
            </div>
          </div>
        </div>

        {/* Dasbor Korporat: Legalitas Sah & Global */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                CORPORATE GOVERNANCE DASHBOARD
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {language === 'id'
                  ? 'Infrastruktur Pengelolaan Reksa Dana yang Sah dan Global'
                  : 'Legitimate & Global Fund Governance Infrastructure'}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <Scale className="w-4 h-4" />
              <span>{CORPORATE_INFO.legalStatusId}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Box 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-400">Status & Registrasi</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                FDI & LDI Registered
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Fokus Fund: Foreign Direct Investment & Local Direct Investment.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-400">Manajemen & Kemitraan</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Eramarindo Corp
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Manajemen Proyek & Aset: PT. Eramarindo Anugerah Pratama.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-400">Kehadiran Global</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                4 Kantor Internasional
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Berlin (Jerman), London (Inggris), Johannesburg (Afrika Selatan), Nevada (AS).
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-400">Pimpinan Tertinggi</div>
              <div className="font-bold text-sm text-blue-600 dark:text-cyan-400">
                {CORPORATE_INFO.managementLeader}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Eramarindo Corp & Group Company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
