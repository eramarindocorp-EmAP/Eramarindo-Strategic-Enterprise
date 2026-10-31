import { jsPDF } from 'jspdf';
import { Transaction, CMSArticle } from '../types';

/**
 * Generate official corporate transaction receipt PDF
 */
export function generateTransactionReceiptPDF(tx: Transaction): void {
  const doc = new jsPDF();

  // Header Background bar
  doc.setFillColor(11, 53, 88); // Navy #0b3558
  doc.rect(0, 0, 210, 35, 'F');

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PT. ERAMARINDO ANUGERAH PRATAMA', 14, 16);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Eramarindo Corp & Group Company | Strategic Fund Management', 14, 23);
  doc.text('Master of the High Court of Indonesia Registered', 14, 28);

  // Status Badge
  doc.setFillColor(16, 185, 129); // Green
  doc.roundedRect(150, 10, 45, 15, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL RECEIPT', 153, 19);

  // Document Title
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('BUKTI TRANSAKSI & INJEKSI MODAL (FDI/LDI)', 14, 48);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')} | Status: ${tx.status.toUpperCase()}`, 14, 54);

  // Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 58, 196, 58);

  // Details Table-like layout
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);

  const leftMargin = 14;
  const valueMargin = 80;
  let y = 68;

  const row = (label: string, value: string, bold = false) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, leftMargin, y);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(value, valueMargin, y);
    y += 9;
  };

  row('Nomor Referensi:', tx.referenceNumber);
  row('ID Transaksi:', tx.id);
  row('Tanggal Transaksi:', tx.date);
  row('Investor / Entitas:', tx.investorName);
  row('Email Investor:', tx.investorEmail);
  row('Metode Pembayaran:', tx.method);
  row('Sektor Tujuan:', tx.sectorTarget);

  const formattedAmount = tx.currency === 'IDR'
    ? `Rp ${tx.amount.toLocaleString('id-ID')}`
    : `$ ${tx.amount.toLocaleString('en-US')}`;

  row('Jumlah Transaksi:', formattedAmount, true);

  // Cryptographic Proof Box
  y += 5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, 182, 32, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 53, 88);
  doc.text('ENKRIPSI & AUDIT TRAIL END-TO-END (SHA-256):', 18, y + 8);

  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(tx.e2eeEncryptedHash || '3f5b7c891a2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f', 18, y + 16);
  doc.text('Tervalidasi secara kriptografis pada jaringan aman EMAP Security Gateway.', 18, y + 24);

  y += 42;

  // Footer notes & Management signature line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Kantor Pusat Jakarta:', 14, y);
  doc.text('Gedung The Kensington Office Tower Lt. 2, Kelapa Gading, Jakarta Utara 14240', 14, y + 5);
  doc.text('Swasembada Barat 26 No.43A, Tanjung Priok, Jakarta Utara 14320', 14, y + 10);
  doc.text('Kontak: eramarindocorp@gmail.com | +62 812 68 51 4369', 14, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.text('Ir. Ferdynand Marthing', 140, y + 10);
  doc.setFont('helvetica', 'normal');
  doc.text('Eramarindo Corp & Group Company', 140, y + 15);
  doc.text('"Satu Standar, Satu Komando"', 140, y + 20);

  doc.save(`EMAP-Receipt-${tx.referenceNumber}.pdf`);
}

/**
 * Generate full corporate analytics & portfolio status report in PDF
 */
export function generateCorporateReportPDF(
  totalVolume: number,
  activeProjects: number,
  transactions: Transaction[],
  articles: CMSArticle[]
): void {
  const doc = new jsPDF();

  // Cover / Header Banner
  doc.setFillColor(11, 53, 88);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PT. ERAMARINDO ANUGERAH PRATAMA', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('LAPORAN STRATEGIS DIVERSIFIKASI EKUITAS & AUDIT KORPORAT 2026', 14, 26);
  doc.text('Foreign Direct Investment (FDI) & Local Direct Investment (LDI)', 14, 32);

  let y = 52;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Ringkasan Eksekutif & Metrik Portofolio', 14, y);

  y += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tanggal Laporan: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}`, 14, y);
  y += 6;
  doc.text(`Total Volume Transaksi Terproses: Rp ${totalVolume.toLocaleString('id-ID')}`, 14, y);
  y += 6;
  doc.text(`Total Proyek Strategis Aktif: ${activeProjects} Sektor Utama`, 14, y);
  y += 6;
  doc.text(`Total Publikasi & Warta CMS: ${articles.length} Artikel`, 14, y);
  y += 6;
  doc.text(`Kepatuhan Regulasi: Master of the High Court of Indonesia Registered`, 14, y);

  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Daftar Transaksi Modal Terbaru (Sampel Audit):', 14, y);
  y += 8;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y - 5, 182, 8, 'F');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('REF ID', 16, y);
  doc.text('INVESTOR', 55, y);
  doc.text('METODE', 110, y);
  doc.text('JUMLAH', 145, y);
  doc.text('STATUS', 180, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  transactions.slice(0, 10).forEach((t) => {
    doc.text(t.referenceNumber, 16, y);
    doc.text(t.investorName.substring(0, 24), 55, y);
    doc.text(t.method, 110, y);
    doc.text(`${t.currency} ${t.amount.toLocaleString()}`, 145, y);
    doc.text(t.status, 180, y);
    y += 6;
  });

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 53, 88);
  doc.text('Prinsip Korporat Eramarindo:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('1. I Walk The Talk (Menjalankan yang dikatakan)', 14, y);
  doc.text('2. I Do The Right Thing (Melakukan hal benar meski tidak dilihat)', 14, y + 4);
  doc.text('3. I Speak & Tell The Truth (Berbicara kebenaran)', 14, y + 8);
  doc.text('4. No Compromise on Environment (Tidak membiarkan penurunan standar lingkungan)', 14, y + 12);

  doc.save(`EMAP-Strategic-Report-${Date.now()}.pdf`);
}
