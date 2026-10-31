import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CMSArticle, Transaction } from '../../types';
import { generateCorporateReportPDF, generateTransactionReceiptPDF } from '../../utils/pdfExport';
import { exportTransactionsToCSV, exportTransactionsToExcel } from '../../utils/csvExport';
import {
  BarChart3,
  Newspaper,
  CreditCard,
  ShieldCheck,
  Cloud,
  FileSpreadsheet,
  FileText,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  Lock,
  Fingerprint,
  CheckCircle2,
  Search,
  Filter,
  RefreshCw,
  HardDrive,
  Globe,
  ExternalLink,
  Sliders,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    language,
    analytics,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    transactions,
    securityStatus,
    toggle2FA,
    verifyBiometric,
    triggerCloudBackup,
    restoreFromSnapshot,
    isSyncing,
    syncNow,
    sectors,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'cms' | 'transactions' | 'security' | 'backup'>('analytics');

  // CMS modal state
  const [cmsModalOpen, setCmsModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    titleId: '',
    titleEn: '',
    excerptId: '',
    excerptEn: '',
    contentId: '',
    contentEn: '',
    author: 'Ir. Ferdynand Marthing',
    category: 'Corporate News' as CMSArticle['category'],
    status: 'Published' as CMSArticle['status'],
    date: new Date().toISOString().split('T')[0],
    readTime: '3 min',
  });

  // Transaction search & filters
  const [txSearch, setTxSearch] = useState('');
  const [txFilterMethod, setTxFilterMethod] = useState('All');

  // Biometric test state
  const [biometricTested, setBiometricTested] = useState(false);

  // Restore snapshot helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        restoreFromSnapshot(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadSnapshot = () => {
    const snapshot = {
      timestamp: new Date().toISOString(),
      sectors,
      articles,
      transactions,
      securityStatus,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EMAP_Database_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleOpenAddCMS = () => {
    setEditingArticleId(null);
    setArticleForm({
      titleId: '',
      titleEn: '',
      excerptId: '',
      excerptEn: '',
      contentId: '',
      contentEn: '',
      author: 'Ir. Ferdynand Marthing',
      category: 'Corporate News',
      status: 'Published',
      date: new Date().toISOString().split('T')[0],
      readTime: '3 min',
    });
    setCmsModalOpen(true);
  };

  const handleOpenEditCMS = (art: CMSArticle) => {
    setEditingArticleId(art.id);
    setArticleForm({
      titleId: art.titleId,
      titleEn: art.titleEn,
      excerptId: art.excerptId,
      excerptEn: art.excerptEn,
      contentId: art.contentId,
      contentEn: art.contentEn,
      author: art.author,
      category: art.category,
      status: art.status,
      date: art.date,
      readTime: art.readTime,
    });
    setCmsModalOpen(true);
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticleId) {
      updateArticle(editingArticleId, articleForm);
    } else {
      addArticle(articleForm);
    }
    setCmsModalOpen(false);
  };

  // Transaction Calculations
  const totalVolumeIDR = transactions
    .filter((t) => t.currency === 'IDR')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = transactions.filter((t) => {
    const matchSearch =
      !txSearch.trim() ||
      t.investorName.toLowerCase().includes(txSearch.toLowerCase()) ||
      t.referenceNumber.toLowerCase().includes(txSearch.toLowerCase()) ||
      t.sectorTarget.toLowerCase().includes(txSearch.toLowerCase());
    const matchMethod = txFilterMethod === 'All' || t.method === txFilterMethod;
    return matchSearch && matchMethod;
  });

  return (
    <div className="py-10 bg-slate-100 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                EMAP ENTERPRISE COMMAND CONSOLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {language === 'id' ? 'Dasbor Eksekutif & Manajemen Konten' : 'Executive Dashboard & CMS Portal'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              PT. Eramarindo Anugerah Pratama &bull; Sesi Aman Ir. Ferdynand Marthing (FDI/LDI)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => generateCorporateReportPDF(totalVolumeIDR, sectors.length, transactions, articles)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ekspor PDF Laporan</span>
            </button>

            <button
              onClick={() => exportTransactionsToExcel(transactions)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ekspor Excel</span>
            </button>

            <button
              onClick={() => exportTransactionsToCSV(transactions)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{language === 'id' ? 'Analitik Pengunjung' : 'Visitor Analytics'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'cms'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>{language === 'id' ? 'Sistem Konten (CMS)' : 'Content CMS'}</span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300 px-1.5 py-0.2 rounded-full">
              {articles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{language === 'id' ? 'Riwayat Transaksi Modal' : 'Transactions & Escrow'}</span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300 px-1.5 py-0.2 rounded-full">
              {transactions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'id' ? 'Keamanan & 2FA' : 'Security & 2FA'}</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>{language === 'id' ? 'Sinkronisasi Cloud' : 'Cloud Sync & Backup'}</span>
          </button>
        </div>

        {/* TAB 1: VISITOR & PERFORMANCE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 font-semibold uppercase">Total Pengunjung</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {analytics.totalVisitors.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14.2% bulan ini</div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 font-semibold uppercase">Aktif Saat Ini (Live)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-cyan-400 mt-1 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>{analytics.activeNow}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Sesi portal real-time</div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 font-semibold uppercase">Tayangan Halaman</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {analytics.pageViews.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Rasio pantulan: {analytics.bounceRate}</div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 font-semibold uppercase">Rata-rata Durasi</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {analytics.avgDuration}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Keterlibatan investor tinggi</div>
              </div>
            </div>

            {/* Daily Traffic Visual Chart & Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Traffic Chart */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {language === 'id' ? 'Tren Kunjungan Harian (Minggu Ini)' : 'Weekly Traffic Overview'}
                    </h3>
                    <p className="text-xs text-slate-500">Aktivitas investor institusional & portal publik</p>
                  </div>
                  <span className="text-xs font-mono text-cyan-600 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded">
                    REALTIME METRICS
                  </span>
                </div>

                {/* SVG Bar Chart */}
                <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
                  {analytics.dailyViews.map((day, i) => {
                    const maxVal = 45000;
                    const heightPercent = Math.round((day.views / maxVal) * 100);
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {(day.views / 1000).toFixed(1)}k
                        </span>
                        <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-40 flex items-end p-1">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full rounded-md bg-gradient-to-t from-blue-700 to-cyan-500 group-hover:from-blue-600 group-hover:to-cyan-400 transition-all duration-300"
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{day.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-500" />
                  <span>{language === 'id' ? 'Distribusi Geografis Investor' : 'Geographic Origin'}</span>
                </h3>

                <div className="space-y-3">
                  {analytics.countryDistribution.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="flex items-center gap-1.5">
                          <span>{item.flag}</span>
                          <span className="text-slate-800 dark:text-slate-200">{item.country}</span>
                        </span>
                        <span className="text-slate-500">{item.share}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${item.share}%` }}
                          className="h-full bg-blue-600 rounded-full"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT MANAGEMENT SYSTEM (CMS) */}
        {activeTab === 'cms' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'id' ? 'Daftar Artikel & Warta Korporat' : 'CMS Article Directory'}
                </h3>
                <p className="text-xs text-slate-500">
                  Kelola publikasi strategi, pembaruan proyek FDI/LDI, dan keterbukaan informasi.
                </p>
              </div>

              <button
                onClick={handleOpenAddCMS}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'id' ? 'Tambah Warta Baru' : 'Create Article'}</span>
              </button>
            </div>

            {/* Articles Table */}
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-4">Judul Artikel</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Penulis</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-white max-w-sm">
                        <div>{art.titleId}</div>
                        <div className="text-[11px] text-slate-400 font-normal truncate">{art.excerptId}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 font-bold text-[10px]">
                          {art.category}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{art.author}</td>
                      <td className="p-4 text-slate-500">{art.date}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            art.status === 'Published'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {art.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditCMS(art)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-cyan-400 cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteArticle(art.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/60 text-red-600 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CMS Edit/Add Modal */}
            {cmsModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                      {editingArticleId ? 'Edit Artikel CMS' : 'Buat Artikel Baru'}
                    </h4>
                    <button onClick={() => setCmsModalOpen(false)} className="text-slate-400 hover:text-white">
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveCMS} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Judul Artikel (Bahasa Indonesia):
                      </label>
                      <input
                        type="text"
                        required
                        value={articleForm.titleId}
                        onChange={(e) => setArticleForm({ ...articleForm, titleId: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Judul Artikel (English):
                      </label>
                      <input
                        type="text"
                        required
                        value={articleForm.titleEn}
                        onChange={(e) => setArticleForm({ ...articleForm, titleEn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Kategori:
                        </label>
                        <select
                          value={articleForm.category}
                          onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white"
                        >
                          <option value="Strategy">Strategy</option>
                          <option value="FDI / LDI">FDI / LDI</option>
                          <option value="ESG & Impact">ESG & Impact</option>
                          <option value="Corporate News">Corporate News</option>
                          <option value="Press Release">Press Release</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          Status:
                        </label>
                        <select
                          value={articleForm.status}
                          onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white"
                        >
                          <option value="Published">Published (Tayang)</option>
                          <option value="Draft">Draft (Konsep)</option>
                          <option value="Archived">Archived (Arsip)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Kutipan Singkat (Ringkasan):
                      </label>
                      <textarea
                        rows={2}
                        value={articleForm.excerptId}
                        onChange={(e) => setArticleForm({ ...articleForm, excerptId: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Isi Konten Lengkap:
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={articleForm.contentId}
                        onChange={(e) => setArticleForm({ ...articleForm, contentId: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setCmsModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-700 text-white font-bold"
                      >
                        Simpan Konten CMS
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TRANSACTIONS & ESCROW */}
        {activeTab === 'transactions' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={txSearch}
                  onChange={(e) => setTxSearch(e.target.value)}
                  placeholder="Cari investor, ref ID, sektor..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Metode:</span>
                <select
                  value={txFilterMethod}
                  onChange={(e) => setTxFilterMethod(e.target.value)}
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <option value="All">Semua Jalur</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="QRIS">QRIS</option>
                  <option value="SWIFT Wire">SWIFT Wire</option>
                  <option value="Escrow Deposit">Escrow Deposit</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-4">Ref ID</th>
                    <th className="p-4">Investor / Entitas</th>
                    <th className="p-4">Sektor Alokasi</th>
                    <th className="p-4">Metode</th>
                    <th className="p-4">Jumlah</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Kuitansi PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-blue-600 dark:text-cyan-400">
                        {tx.referenceNumber}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white">{tx.investorName}</div>
                        <div className="text-[10px] text-slate-400">{tx.investorEmail}</div>
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                        {tx.sectorTarget}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{tx.method}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        {tx.currency === 'IDR'
                          ? `Rp ${tx.amount.toLocaleString('id-ID')}`
                          : `$ ${tx.amount.toLocaleString('en-US')}`}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => generateTransactionReceiptPDF(tx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 hover:bg-blue-100 font-semibold cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & 2FA */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 2FA Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 flex items-center justify-center font-bold">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">
                        Autentikasi Dua Faktor (2FA)
                      </h4>
                      <p className="text-xs text-slate-500">Standar TOTP (Google Authenticator)</p>
                    </div>
                  </div>

                  <button
                    onClick={toggle2FA}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      securityStatus.twoFactorEnabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {securityStatus.twoFactorEnabled ? 'Aktif' : 'Nonaktif'}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kunci Rahasia TOTP:</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {securityStatus.twoFactorSecret}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Perlindungan Akun:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tinggi (Zero Trust)</span>
                  </div>
                </div>
              </div>

              {/* Biometric Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">
                        Otentikasi Biometrik
                      </h4>
                      <p className="text-xs text-slate-500">WebAuthn / TouchID / Sensor Sidik Jari</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    TERDAFTAR
                  </span>
                </div>

                <button
                  onClick={async () => {
                    await verifyBiometric();
                    setBiometricTested(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Fingerprint className="w-4 h-4 text-cyan-400" />
                  <span>{biometricTested ? 'Biometrik Terverifikasi Sukses!' : 'Uji Pemindai Sensor Biometrik'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CLOUD SYNC & BACKUP */}
        {activeTab === 'backup' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Pusat Sinkronisasi & Cadangan Otomatis Berbasis Cloud
                  </h3>
                  <p className="text-xs text-slate-500">
                    Menjaga kedaulatan data korporat terhubung antar perangkat dengan cadangan terjadwal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={isSyncing}
                    onClick={() => triggerCloudBackup('Google Drive')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Cloud className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Cadangkan ke Google Drive</span>
                  </button>

                  <button
                    disabled={isSyncing}
                    onClick={() => triggerCloudBackup('Dropbox')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Cadangkan ke Dropbox</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400">Penyedia Cloud Aktif:</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                    {securityStatus.cloudProvider} Enterprise
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400">Waktu Cadangan Terakhir:</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                    {securityStatus.lastBackupDate}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400">Status Sinkronisasi Lokal:</div>
                  <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tersinkronisasi 100%</span>
                  </div>
                </div>
              </div>

              {/* Snapshot Backup / Restore Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadSnapshot}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Snapshot JSON Basis Data</span>
                  </button>

                  <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pulihkan dari File Backup</span>
                    <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <span className="text-[11px] text-slate-400">
                  Enkripsi snapshot terlindungi standar AES-256.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
