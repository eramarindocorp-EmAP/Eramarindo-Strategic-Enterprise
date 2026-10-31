import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { encryptData, decryptData, EncryptedPayload, generateSHA256 } from '../utils/crypto';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
  RefreshCw,
  Terminal,
  AlertTriangle,
  Fingerprint,
} from 'lucide-react';

export const E2EESecurityVault: React.FC = () => {
  const { language, securityStatus, addNotification } = useApp();

  const [plainInput, setPlainInput] = useState(
    'PERJANJIAN SINDIKASI MODAL 2026: PT. Eramarindo Anugerah Pratama mengalokasikan ekuitas US$ 50,000,000 untuk konsorsium seismik lepas pantai dengan jaminan escrow bankable status.'
  );
  const [passkey, setPasskey] = useState('EMAP-MASTER-SECURITY-KEY-2026');
  const [encryptedPayload, setEncryptedPayload] = useState<EncryptedPayload | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);

  // Decryption testing
  const [decryptPasskey, setDecryptPasskey] = useState('EMAP-MASTER-SECURITY-KEY-2026');
  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [decryptError, setDecryptError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEncrypt = async () => {
    if (!plainInput.trim()) return;
    setIsEncrypting(true);
    setDecryptError(null);
    setDecryptedText(null);

    try {
      const payload = await encryptData(plainInput, passkey);
      setEncryptedPayload(payload);
      addNotification(
        'Data Dienkripsi (AES-256-GCM)',
        'Pesan sensitif berhasil dienkripsi dengan standar militer AES-GCM 256-bit.',
        'security'
      );
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedPayload) return;
    setDecryptError(null);
    try {
      const original = await decryptData(encryptedPayload, decryptPasskey);
      setDecryptedText(original);
      addNotification('Data Didekripsi', 'Integritas pesan terverifikasi dan berhasil dibuka kembali.', 'security');
    } catch (err: any) {
      setDecryptError(err.message || 'Kunci sandi tidak cocok!');
    }
  };

  const handleCopyCipher = () => {
    if (!encryptedPayload) return;
    navigator.clipboard.writeText(JSON.stringify(encryptedPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="e2ee" className="py-16 sm:py-24 bg-slate-900 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            CYBER DEFENSE & ZERO-KNOWLEDGE CRYPTOGRAPHY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'id'
              ? 'Bilik Enkripsi End-to-End (E2EE) & Perlindungan Data Sensitif'
              : 'End-to-End Encryption (E2EE) Vault & Sensitive Data Protection'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'id'
              ? 'Seluruh data perbankan, sindikasi modal, identitas investor, dan dokumen legalitas EMAP dilindungi dengan Web Crypto API AES-256-GCM dan verifikasi hash integritas SHA-256.'
              : 'All banking transactions, capital syndications, investor credentials, and legal deeds are shielded via browser-native AES-256-GCM and SHA-256 tamper-proof digest.'}
          </p>
        </div>

        {/* Security Health KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold uppercase">Cyber Health Score</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {securityStatus.cyberHealthScore}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Indeks Kesiapan Pertahanan</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold uppercase">Standar Enkripsi</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 mt-1">
              AES-256-GCM
            </div>
            <div className="text-[11px] text-slate-400 mt-1">PBKDF2 100k Iterations</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold uppercase">Audit Hash Integrity</div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-amber-400 mt-1">
              SHA-256
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Zero Data Tampering</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold uppercase">Autentikasi Akun</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
              <Fingerprint className="w-5 h-5 text-emerald-400" />
              <span>2FA & Biometric</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">TOTP + WebAuthn Siap</div>
          </div>
        </div>

        {/* Interactive E2EE Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Encryption Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg text-white">
                  {language === 'id' ? '1. Enkripsi Pesan / Dokumen' : '1. Encrypt Message / Doc'}
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                CLIENT-SIDE
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {language === 'id' ? 'Data Sensitif / Perjanjian Investasi (Plaintext):' : 'Sensitive Text Payload:'}
              </label>
              <textarea
                rows={4}
                value={plainInput}
                onChange={(e) => setPlainInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {language === 'id' ? 'Kunci Enkripsi Rahasia (Passkey):' : 'Secret Encryption Passkey:'}
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleEncrypt}
              disabled={isEncrypting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>
                {isEncrypting
                  ? 'Menghasilkan Cipher AES-256...'
                  : language === 'id' ? 'Enkripsi Secara Kriptografis' : 'Cryptographically Encrypt'}
              </span>
            </button>

            {/* Ciphertext Output */}
            {encryptedPayload && (
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400">Hasil Ciphertext & Proof:</span>
                  <button
                    onClick={handleCopyCipher}
                    className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tersalin' : 'Salin JSON'}</span>
                  </button>
                </div>

                <div className="font-mono text-[10px] text-slate-300 space-y-1.5 break-all max-h-40 overflow-y-auto">
                  <div>
                    <span className="text-slate-500">IV (12 bytes): </span>
                    <span className="text-amber-400">{encryptedPayload.iv}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Salt (16 bytes): </span>
                    <span className="text-purple-400">{encryptedPayload.salt}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Ciphertext (Base64): </span>
                    <span className="text-emerald-400">{encryptedPayload.ciphertext}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">SHA-256 Digest: </span>
                    <span className="text-cyan-400">{encryptedPayload.hash}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Decryption Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Unlock className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-lg text-white">
                  {language === 'id' ? '2. Uji Dekripsi & Verifikasi Integritas' : '2. Decrypt & Verify Integrity'}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                AUDIT ENGINE
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Uji validasi penerima: masukkan kunci sandi untuk mendekripsi ciphertext di atas kembali ke teks asli. Jika kunci salah, data tidak dapat diuraikan sama sekali (Zero-Knowledge).'
                : 'Validation testing: input the passkey to decrypt the ciphertext above back to original form. Mismatched passkeys produce cryptographic errors.'}
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {language === 'id' ? 'Masukkan Kunci Dekripsi:' : 'Enter Decryption Passkey:'}
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={decryptPasskey}
                  onChange={(e) => setDecryptPasskey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-300 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleDecrypt}
              disabled={!encryptedPayload}
              className={`w-full py-3 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                encryptedPayload
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>{language === 'id' ? 'Dekripsi & Buktikan Integritas' : 'Decrypt & Verify'}</span>
            </button>

            {decryptError && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{decryptError}</span>
              </div>
            )}

            {decryptedText && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dekripsi Berhasil & Hash SHA-256 Cocok 100%</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/90 p-3 rounded-xl border border-slate-800 font-mono">
                  {decryptedText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
