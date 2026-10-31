import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CMSArticle } from '../types';
import {
  Newspaper,
  Calendar,
  User,
  Clock,
  Eye,
  Search,
  Tag,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const CmsPublicationsView: React.FC = () => {
  const { language, articles, setActiveView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<CMSArticle | null>(null);

  const categories = ['All', 'Strategy', 'FDI / LDI', 'ESG & Impact', 'Corporate News'];

  const filteredArticles = articles.filter((art) => {
    const matchCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      art.titleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerptId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch && art.status === 'Published';
  });

  return (
    <section id="cms" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              {language === 'id' ? 'Sistem Manajemen Konten Terintegrasi' : 'Integrated Corporate CMS'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'id'
                ? 'Warta Korporat, Publikasi Strategis & Rilis Media'
                : 'Corporate News, Strategic Insights & Press Releases'}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
              {language === 'id'
                ? 'Informasi resmi terkini mengenai pergerakan FDI/LDI, pencapaian proyek riil di Indonesia, dan tata kelola EMAP Way.'
                : 'Official dispatches on FDI/LDI developments, real-sector project completions across Indonesia, and EMAP Way governance.'}
            </p>
          </div>

          <button
            onClick={() => setActiveView('admin')}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer self-start md:self-end"
          >
            {language === 'id' ? 'Kelola di CMS Admin →' : 'Manage in Admin CMS →'}
          </button>
        </div>

        {/* Filter & Search */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'id' ? 'Cari artikel warta...' : 'Search news articles...'}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                  {language === 'id' ? article.titleId : article.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'id' ? article.excerptId : article.excerptEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <User className="w-3.5 h-3.5 text-blue-500" />
                  <span>{article.author}</span>
                </div>

                <button
                  onClick={() => setReadingArticle(article)}
                  className="flex items-center gap-1 font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span>{language === 'id' ? 'Baca Selengkapnya' : 'Read Article'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Read Article Modal */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-400 font-bold text-xs uppercase">
                  {readingArticle.category}
                </span>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {language === 'id' ? readingArticle.titleId : readingArticle.titleEn}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                  <span>Penulis: {readingArticle.author}</span>
                  <span>Tanggal: {readingArticle.date}</span>
                  <span>Waktu Baca: {readingArticle.readTime}</span>
                </div>
              </div>

              <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p>{language === 'id' ? readingArticle.contentId : readingArticle.contentEn}</p>
                <p className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 italic">
                  Sumber: Divisi Komunikasi Strategis & Investor Relations &bull; PT. Eramarindo Anugerah Pratama (Eramarindo Corp & Group Company).
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs"
                >
                  {language === 'id' ? 'Selesai Membaca' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
