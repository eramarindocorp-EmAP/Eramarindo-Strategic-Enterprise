import React from 'react';
import { useApp } from '../context/AppContext';
import { CORPORATE_INFO } from '../data/initialData';
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  Globe2,
  FileCheck,
  Award,
  ChevronRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setPdfModalOpen, setActiveView, setPaymentModalOpen } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Top Banner / Corporate Credentials */}
      <div className="bg-blue-950/70 border-b border-blue-900/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-sm sm:text-base">
                {language === 'id' ? 'Status Legalitas & Kepatuhan Sah' : 'Legal Compliance & Registered Standing'}
              </div>
              <div className="text-xs text-emerald-400 font-medium">
                {language === 'id'
                  ? 'Terdaftar resmi pada Master of the High Court of Indonesia'
                  : 'Officially Registered on the Master of the High Court of Indonesia'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>AES-256-GCM Military Grade</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>EMAP Way Operational Excellence</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
              <FileCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>FDI & LDI Registered Framework</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Identity & Management */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm">
              EMAP
            </div>
            <span className="text-white font-bold text-base">PT. Eramarindo Anugerah Pratama</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'id'
              ? 'Katalisator utama untuk kelas aset ekuitas swasta yang berkelanjutan di Indonesia & Global. Bertindak sebagai kemitraan & manajemen proyek FDI / LDI.'
              : 'Primary catalyst for sustainable private equity asset classes in Indonesia & globally. Acting as execution partner & active project management.'}
          </p>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              {language === 'id' ? 'Manajemen Korporat' : 'Executive Leadership'}
            </div>
            <div className="text-white font-bold text-sm">{CORPORATE_INFO.managementLeader}</div>
            <div className="text-xs text-cyan-400">{CORPORATE_INFO.groupName}</div>
          </div>

          <div className="text-xs text-slate-400 italic">
            "{language === 'id' ? CORPORATE_INFO.mottoId : CORPORATE_INFO.mottoEn}"
          </div>
        </div>

        {/* Col 2: Indonesian Operations HQ */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
            {language === 'id' ? 'Operasional Utama (Indonesia)' : 'Core Operations (Indonesia)'}
          </h4>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="space-y-1">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>HQ 1 - Executive Governance</span>
              </div>
              <p className="text-slate-400 pl-5">
                Gedung The Kensington Office Tower Lt. 2, Kelapa Gading, Jakarta Utara 14240, Indonesia
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>HQ 2 - Maritime & Logistics Base</span>
              </div>
              <p className="text-slate-400 pl-5">
                Swasembada Barat 26 No.43A, Tanjung Priok, Jakarta Utara 14320, Indonesia
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-1 pl-5">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${CORPORATE_INFO.email}`} className="hover:text-white transition-colors">
                  {CORPORATE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${CORPORATE_INFO.phone}`} className="hover:text-white transition-colors">
                  {CORPORATE_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Global Presence */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>{language === 'id' ? 'Kehadiran Global' : 'Global Desks'}</span>
          </h4>

          <div className="space-y-2.5 text-xs">
            {CORPORATE_INFO.globalBranches.map((branch, i) => (
              <div key={i} className="flex items-start justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <div>
                  <div className="text-white font-semibold">{branch.city}</div>
                  <div className="text-slate-400 text-[11px]">{branch.country}</div>
                </div>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {branch.region}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setPdfModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-900/50 hover:bg-blue-800/50 border border-blue-700/50 text-cyan-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>{language === 'id' ? 'Unduh Ringkasan PDF Strategis' : 'Download Strategic PDF Deck'}</span>
            </button>
          </div>
        </div>

        {/* Col 4: Quick Navigation & Portals */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
            {language === 'id' ? 'Navigasi Portal' : 'Portal Modules'}
          </h4>

          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => setActiveView('strategy')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                <span>{language === 'id' ? 'Strategi Tiga Lapis (3-Fold)' : '3-Fold Strategy Model'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('sectors')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                <span>{language === 'id' ? '12 Sektor Ekosistem Riil' : '12 Strategic Ecosystem Sectors'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('governance')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                <span>{language === 'id' ? 'EMAP Way (Operational Excellence)' : 'EMAP Way (Operational Excellence)'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('e2ee')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                <span>{language === 'id' ? 'Bilik Enkripsi End-to-End (E2EE)' : 'E2EE Cryptographic Vault'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('cms')}
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                <span>{language === 'id' ? 'Publikasi & Warta CMS' : 'CMS Publications & Warta'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('admin')}
                className="flex items-center gap-1.5 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language === 'id' ? 'Dasbor Admin & Manajemen Database' : 'Admin & Database Management'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setPaymentModalOpen(true)}
                className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'id' ? 'Gerbang Pembayaran & Injeksi Modal' : 'Payment Gateway & Escrow'}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} PT. Eramarindo Anugerah Pratama | Eramarindo Corp & Group Company. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Privasi & Keamanan Enkripsi</span>
            <span>Syarat & Kepatuhan FDI/LDI</span>
            <span>24/7 Monitoring Desk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
