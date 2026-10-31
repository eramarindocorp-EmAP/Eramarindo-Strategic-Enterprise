import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateTransactionReceiptPDF } from '../utils/pdfExport';
import {
  X,
  CreditCard,
  QrCode,
  Globe,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Download,
  AlertCircle,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const PaymentGatewayModal: React.FC = () => {
  const {
    paymentModalOpen,
    setPaymentModalOpen,
    selectedSectorForInvestment,
    setSelectedSectorForInvestment,
    createTransaction,
    language,
    sectors,
  } = useApp();

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [method, setMethod] = useState<'Bank Transfer' | 'QRIS' | 'SWIFT Wire' | 'Escrow Deposit'>('Bank Transfer');
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [amount, setAmount] = useState<number>(50000000); // 50 million IDR default
  const [investorName, setInvestorName] = useState('PT. Global Synergy Capital');
  const [investorEmail, setInvestorEmail] = useState('investor@synergy-capital.com');
  const [sectorTarget, setSectorTarget] = useState(
    selectedSectorForInvestment ? selectedSectorForInvestment.titleId : 'Minyak & Gas (Oil & Gas)'
  );
  const [createdTx, setCreatedTx] = useState<any>(null);

  if (!paymentModalOpen) return null;

  const handleCurrencyChange = (c: 'IDR' | 'USD') => {
    setCurrency(c);
    if (c === 'USD') {
      setAmount(100000); // $100k
      if (method === 'QRIS') setMethod('SWIFT Wire');
    } else {
      setAmount(50000000); // 50m IDR
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(async () => {
      const tx = await createTransaction({
        investorName,
        investorEmail,
        method,
        amount: Number(amount),
        currency,
        sectorTarget,
      });

      setCreatedTx(tx);
      setStep('success');
    }, 1800);
  };

  const handleDownloadReceipt = () => {
    if (createdTx) {
      generateTransactionReceiptPDF(createdTx);
    }
  };

  const handleClose = () => {
    setPaymentModalOpen(false);
    setSelectedSectorForInvestment(null);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm">
                EMAP Gateway &bull;{' '}
                <span className="text-emerald-400 font-mono text-xs">AES-256 E2EE</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {language === 'id' ? 'Sistem Pembayaran Pihak Ketiga & Rekening Escrow' : '3rd-Party Payment & Escrow Settlement'}
              </div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleProcessPayment} className="p-6 space-y-4">
            {/* Currency & Payment Rail selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                {language === 'id' ? 'Pilih Jalur Transaksi & Mata Uang' : 'Select Transaction Rail & Currency'}
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('IDR')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currency === 'IDR'
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  🇮🇩 Rupiah (IDR - LDI)
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('USD')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  🌐 US Dollar (USD - FDI)
                </button>
              </div>

              {/* Methods */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('Bank Transfer')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    method === 'Bank Transfer'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs">Virtual Account (BCA/Mandiri)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('QRIS')}
                  disabled={currency === 'USD'}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    currency === 'USD' ? 'opacity-40 cursor-not-allowed' : ''
                  } ${
                    method === 'QRIS'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs">QRIS Dinamis 24/7</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('SWIFT Wire')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    method === 'SWIFT Wire'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Globe className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-xs">SWIFT / Wire International</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('Escrow Deposit')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    method === 'Escrow Deposit'
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs">Escrow Custody Vault</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {language === 'id' ? 'Sektor Portofolio Tujuan' : 'Target Portfolio Sector'}
                </label>
                <select
                  value={sectorTarget}
                  onChange={(e) => setSectorTarget(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  {sectors.map((s) => (
                    <option key={s.id} value={s.titleId}>
                      {s.titleId} ({s.investmentScale})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {language === 'id' ? 'Nominal Transaksi' : 'Transaction Amount'} ({currency})
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={1}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {language === 'id' ? 'Entitas / Nama Investor' : 'Investor Entity / Name'}
                  </label>
                  <input
                    type="text"
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Email Verifikasi Notifikasi Real-time
                </label>
                <input
                  type="email"
                  value={investorEmail}
                  onChange={(e) => setInvestorEmail(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Simulated QR Code if QRIS selected */}
            {method === 'QRIS' && (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-4">
                <div className="w-20 h-20 bg-white p-1 rounded-lg border flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-slate-900" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">QRIS Standar Bank Indonesia</div>
                  <div className="text-slate-500">NMID: ID102026048194819</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">Tersinkronisasi Real-Time</div>
                </div>
              </div>
            )}

            {/* Disclaimer & Security */}
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-300 text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-500" />
              <span>
                {language === 'id'
                  ? 'Setiap transaksi diverifikasi instan dengan bukti hash kriptografis SHA-256 dan notifikasi push real-time.'
                  : 'Every transaction is instantly validated with SHA-256 cryptographic proof and real-time push dispatch.'}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white font-bold text-sm shadow-lg shadow-blue-700/20 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{language === 'id' ? 'Proses Injeksi Modal Sekarang' : 'Process Capital Injection'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PROCESSING */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto"></div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'id' ? 'Memvalidasi Transaksi Kriptografis...' : 'Validating Cryptographic Transaction...'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Menghubungkan ke gateway pihak ketiga &bull; Membuat signature SHA-256 &bull; Mengirimkan push notification.
            </p>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 'success' && createdTx && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {language === 'id' ? 'Transaksi Modal Berhasil!' : 'Transaction Successfully Verified!'}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'id'
                  ? 'Dana telah dialokasikan secara aman dalam rekening Escrow EMAP.'
                  : 'Funds securely allocated within the EMAP Custody Escrow structure.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Nomor Referensi:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {createdTx.referenceNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Investor:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {createdTx.investorName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sektor:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {createdTx.sectorTarget}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Jumlah:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {createdTx.currency === 'IDR'
                    ? `Rp ${createdTx.amount.toLocaleString('id-ID')}`
                    : `$ ${createdTx.amount.toLocaleString('en-US')}`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-750">
                <div className="text-[10px] text-slate-400">Security Hash:</div>
                <div className="font-mono text-[9px] text-cyan-600 dark:text-cyan-400 break-all">
                  {createdTx.e2eeEncryptedHash}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'id' ? 'Unduh Bukti Transaksi PDF' : 'Download PDF Receipt'}</span>
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                {language === 'id' ? 'Selesai' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
