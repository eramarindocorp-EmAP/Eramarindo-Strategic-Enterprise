import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle,
  Shield,
} from 'lucide-react';

export const PdfViewerModal: React.FC = () => {
  const { pdfModalOpen, setPdfModalOpen, language } = useApp();
  const [activeSlide, setActiveSlide] = useState(1);

  if (!pdfModalOpen) return null;

  const pdfUrl = '/assets/aistudio/Eramarindo_Strategic_Fund_Management_2026_1aa0c272.pdf';

  const slideSummaries = [
    { page: 1, title: 'Cover: PT. Eramarindo Anugerah Pratama', desc: 'Modul Terintegrasi: Pengelolaan Ekuitas & Aset Strategis Indonesia 2026. Ir. Ferdynand Marthing.' },
    { page: 2, title: 'Katalisator Utama Ekuitas Swasta', desc: 'Aliran Modal FDI/LDI -> Katalisator Ekuitas Berkelanjutan -> Dampak Sosial & Pengembalian Finansial Tinggi.' },
    { page: 3, title: 'Dasbor Korporat & Infrastruktur', desc: 'Legalitas Master of High Court of Indonesia. HQ 1 The Kensington & HQ 2 Tanjung Priok. Berlin, London, JHB, Nevada.' },
    { page: 4, title: 'Mandat Investasi: Dampak Sosial Kuat', desc: 'Prinsip Dampak: Perempuan (Inklusif), Pemuda (Dewan Pemuda Nasional / NYC), dan Kelompok Rentan.' },
    { page: 5, title: 'Model Investasi Terintegrasi: 3-Fold Strategy', desc: '1. Identifikasi & Akuisisi -> 2. Pengembangan & Pembiayaan -> 3. Ekstraksi Nilai & Retained Equity (Min 3x ROI).' },
    { page: 6, title: 'Keunggulan Kompetitif: Pasif vs Manajemen Aktif', desc: 'Perbandingan komprehensif peran pasif vs kemitraan aktif Eramarindo mengambil alih aset mangkrak menjadi bankable.' },
    { page: 7, title: 'Sistem Manajemen Operasional (OE - EMAP WAY)', desc: 'Melindungi Manusia & Lingkungan: Keselamatan Kerja, Keandalan Proses, Efisiensi & Keamanan, Stakeholder.' },
    { page: 8, title: 'Fondasi Integritas: 4 Pilar & 4 Prinsip', desc: 'Pilar: Spiritual ("Put God First"), Sinergi, Tim, Fokus. Prinsip: I Walk The Talk, I Do The Right Thing, I Speak Truth, No Compromise Environment.' },
    { page: 9, title: 'Peta Ekosistem Portofolio: Diversifikasi Sektor', desc: 'Kedaulatan Energi & Infra, Ketahanan Pangan & Alam, Layanan Esensial & Masa Depan (12 Sektor Vital).' },
    { page: 10, title: 'Fokus Eksekusi 1: Energi, Migas & Maritim', desc: 'Eksplorasi seismik lepas pantai dan infrastruktur petrokimia darat berskala internasional.' },
    { page: 11, title: 'Fokus Eksekusi 2: Ketahanan Pangan & Akuakultur', desc: 'Food Estate agrikultur modern skala besar dan KEK industri perikanan dengan fasilitas pengolahan higienis.' },
    { page: 12, title: 'Efek Roda Gila Eramarindo (The Value Flywheel)', desc: 'Injeksi Modal -> Proyek Aktif & OE -> Ekosistem Riil -> Ekstraksi Nilai & Dividen Berputar Berkelanjutan.' },
    { page: 13, title: 'Mulai Kemitraan Terintegrasi & Kontak', desc: 'Kontak: eramarindocorp@gmail.com, Telp +62 812 68 51 4369, Kantor Pusat The Kensington & Swasembada Priok.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm">
              <FileText className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                <span>Eramarindo_Strategic_Fund_Management_2026.pdf</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  VERIFIED
                </span>
              </div>
              <div className="text-xs text-slate-400">
                PT. Eramarindo Anugerah Pratama &bull; Ir. Ferdynand Marthing &bull; 13 Slides
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="Eramarindo_Strategic_Fund_Management_2026.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Unduh PDF' : 'Download PDF'}</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Buka di Tab Baru"
            >
              <Maximize2 className="w-4 h-4" />
            </a>

            <button
              onClick={() => setPdfModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split view of interactive presentation synopsis and embedded PDF frame */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left / Sidebar: Slide index and Executive Synopsis */}
          <div className="w-full lg:w-80 bg-slate-950 border-r border-slate-800 p-4 overflow-y-auto space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {language === 'id' ? 'Indeks Slide Resmi' : 'Official Slide Index'}
            </div>
            {slideSummaries.map((s) => (
              <button
                key={s.page}
                onClick={() => setActiveSlide(s.page)}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                  activeSlide === s.page
                    ? 'bg-blue-900/60 border border-blue-500/60 text-white shadow-sm'
                    : 'bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-cyan-400">Slide {s.page}</span>
                  {activeSlide === s.page && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <div className="text-xs font-semibold leading-tight text-slate-100">{s.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {s.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Right: PDF Viewer Container */}
          <div className="flex-1 flex flex-col bg-slate-900 relative">
            <div className="p-3 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Ringkasan Slide {activeSlide}:</span>
                <span className="text-cyan-400 truncate max-w-md">
                  {slideSummaries[activeSlide - 1].title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled={activeSlide <= 1}
                  onClick={() => setActiveSlide((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-mono">{activeSlide} / 13</span>
                <button
                  disabled={activeSlide >= 13}
                  onClick={() => setActiveSlide((p) => Math.min(13, p + 1))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Native Viewer / Fallback Frame */}
            <div className="flex-1 w-full h-full bg-slate-950 p-2 overflow-hidden flex flex-col items-center justify-center">
              <iframe
                src={`${pdfUrl}#page=${activeSlide}`}
                title="Eramarindo Strategic Fund Management 2026"
                className="w-full h-full rounded-2xl border border-slate-800 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Banner */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Hak Cipta Dokumen &bull; PT. Eramarindo Anugerah Pratama &bull; 2026</span>
          </div>
          <div>
            Email: <span className="text-white">eramarindocorp@gmail.com</span> | Telepon: <span className="text-white">+62 812 68 51 4369</span>
          </div>
        </div>
      </div>
    </div>
  );
};
