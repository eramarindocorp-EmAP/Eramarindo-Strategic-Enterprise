import { Transaction } from '../types';

export function exportTransactionsToCSV(transactions: Transaction[], filename = 'emap_transaksi.csv') {
  const headers = ['ID', 'Reference', 'Date', 'Investor Name', 'Email', 'Payment Method', 'Sector Target', 'Currency', 'Amount', 'Status', 'Security Hash'];

  const rows = transactions.map((t) => [
    `"${t.id}"`,
    `"${t.referenceNumber}"`,
    `"${t.date}"`,
    `"${t.investorName.replace(/"/g, '""')}"`,
    `"${t.investorEmail}"`,
    `"${t.method}"`,
    `"${t.sectorTarget}"`,
    `"${t.currency}"`,
    t.amount,
    `"${t.status}"`,
    `"${t.e2eeEncryptedHash}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportTransactionsToExcel(transactions: Transaction[]) {
  // Generates XML-based Excel Spreadsheet (real opening in Microsoft Excel without external heavy library)
  const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Worksheet ss:Name="Transaksi_EMAP">
  <Table>
   <Row>
    <Cell><Data ss:Type="String">ID Transaksi</Data></Cell>
    <Cell><Data ss:Type="String">Referensi</Data></Cell>
    <Cell><Data ss:Type="String">Tanggal</Data></Cell>
    <Cell><Data ss:Type="String">Nama Investor</Data></Cell>
    <Cell><Data ss:Type="String">Email</Data></Cell>
    <Cell><Data ss:Type="String">Metode</Data></Cell>
    <Cell><Data ss:Type="String">Sektor</Data></Cell>
    <Cell><Data ss:Type="String">Mata Uang</Data></Cell>
    <Cell><Data ss:Type="String">Nominal</Data></Cell>
    <Cell><Data ss:Type="String">Status</Data></Cell>
    <Cell><Data ss:Type="String">E2EE Hash</Data></Cell>
   </Row>
   ${transactions
     .map(
       (t) => `
   <Row>
    <Cell><Data ss:Type="String">${t.id}</Data></Cell>
    <Cell><Data ss:Type="String">${t.referenceNumber}</Data></Cell>
    <Cell><Data ss:Type="String">${t.date}</Data></Cell>
    <Cell><Data ss:Type="String">${t.investorName}</Data></Cell>
    <Cell><Data ss:Type="String">${t.investorEmail}</Data></Cell>
    <Cell><Data ss:Type="String">${t.method}</Data></Cell>
    <Cell><Data ss:Type="String">${t.sectorTarget}</Data></Cell>
    <Cell><Data ss:Type="String">${t.currency}</Data></Cell>
    <Cell><Data ss:Type="Number">${t.amount}</Data></Cell>
    <Cell><Data ss:Type="String">${t.status}</Data></Cell>
    <Cell><Data ss:Type="String">${t.e2eeEncryptedHash}</Data></Cell>
   </Row>`
     )
     .join('')}
  </Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `EMAP_Transaksi_${Date.now()}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
