import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StrategicFramework } from './components/StrategicFramework';
import { PortfolioExplorer } from './components/PortfolioExplorer';
import { OperationalExcellence } from './components/OperationalExcellence';
import { ImpactAndGovernance } from './components/ImpactAndGovernance';
import { CmsPublicationsView } from './components/CmsPublicationsView';
import { E2EESecurityVault } from './components/E2EESecurityVault';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/Footer';
import { PdfViewerModal } from './components/PdfViewerModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { LiveSupportChat } from './components/LiveSupportChat';
import { InteractiveTour } from './components/InteractiveTour';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <StrategicFramework />
            <PortfolioExplorer />
            <OperationalExcellence />
            <ImpactAndGovernance />
            <E2EESecurityVault />
            <CmsPublicationsView />
          </>
        )}

        {activeView === 'strategy' && (
          <div className="pt-4">
            <StrategicFramework />
          </div>
        )}

        {activeView === 'sectors' && (
          <div className="pt-4">
            <PortfolioExplorer />
          </div>
        )}

        {activeView === 'governance' && (
          <div className="pt-4">
            <OperationalExcellence />
            <ImpactAndGovernance />
          </div>
        )}

        {activeView === 'e2ee' && (
          <div className="pt-4">
            <E2EESecurityVault />
          </div>
        )}

        {activeView === 'cms' && (
          <div className="pt-4">
            <CmsPublicationsView />
          </div>
        )}

        {activeView === 'admin' && <AdminDashboard />}
      </div>

      <Footer />

      {/* Global Modals & Floating Helpers */}
      <PdfViewerModal />
      <PaymentGatewayModal />
      <LiveSupportChat />
      <InteractiveTour />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
