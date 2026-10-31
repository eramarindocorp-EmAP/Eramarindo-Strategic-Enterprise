export type Language = 'id' | 'en';
export type Theme = 'light' | 'dark';
export type FontSize = 'normal' | 'large' | 'x-large';

export interface SectorItem {
  id: string;
  category: 'energy' | 'food' | 'essential';
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  subsectors: string[];
  status: 'Active' | 'Development' | 'Pipeline';
  targetRoi: string;
  iconName: string;
  featuredProject: string;
  investmentScale: string;
}

export interface CMSArticle {
  id: string;
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  author: string;
  category: 'Strategy' | 'FDI / LDI' | 'ESG & Impact' | 'Corporate News' | 'Press Release';
  date: string;
  status: 'Published' | 'Draft' | 'Archived';
  views: number;
  readTime: string;
}

export interface Transaction {
  id: string;
  date: string;
  investorName: string;
  investorEmail: string;
  method: 'Bank Transfer' | 'QRIS' | 'SWIFT Wire' | 'Escrow Deposit';
  amount: number;
  currency: 'IDR' | 'USD';
  status: 'Success' | 'Pending' | 'Processing' | 'Failed';
  referenceNumber: string;
  sectorTarget: string;
  e2eeEncryptedHash: string;
}

export interface VisitorAnalytics {
  totalVisitors: number;
  activeNow: number;
  pageViews: number;
  bounceRate: string;
  avgDuration: string;
  countryDistribution: { country: string; flag: string; visitors: number; share: number }[];
  deviceDistribution: { device: string; percentage: number }[];
  dailyViews: { day: string; views: number; unique: number }[];
}

export interface SecurityStatus {
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  biometricRegistered: boolean;
  lastBackupDate: string;
  cloudSyncConnected: boolean;
  cloudProvider: 'Google Drive' | 'Dropbox' | 'None';
  encryptionStandard: string;
  cyberHealthScore: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'transaction' | 'security' | 'system' | 'backup';
  read: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  sender: string;
  email: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  timestamp: string;
}
