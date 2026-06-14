import React, { useState } from 'react';
import { GrcStateProvider, useGrcState } from './state';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { BoardroomView } from './components/BoardroomView';
import { ComplianceView } from './components/ComplianceView';
import { AroAssessorView } from './components/AroAssessorView';
import { CiaBiaClassificationView } from './components/CiaBiaClassificationView';
import { AwarenessTrainingView } from './components/AwarenessTrainingView';
import { AssumedLedgerView } from './components/AssumedLedgerView';
import { LicensingJourneysView } from './components/LicensingJourneysView';

function GrcAppContent() {
  const [activeTab, setActiveTab ] = useState('dashboard');
  const { isRTL } = useGrcState();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'boardroom':
        return <BoardroomView />;
      case 'compliance':
        return <ComplianceView />;
      case 'aro':
        return <AroAssessorView />;
      case 'assets':
        return <CiaBiaClassificationView />;
      case 'training':
        return <AwarenessTrainingView />;
      case 'blockchain':
        return <AssumedLedgerView />;
      case 'setup':
        return <LicensingJourneysView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen flex font-sans overflow-hidden bg-[#030815]"
    >
      {/* 1. Left Sidebar Navigation Panel Stretching Full Height */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main content block split vertically */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Utilities Panel */}
        <Header />

        {/* Scrollable primary detail workspace view */}
        <main className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-[#0c1e3d]/20 to-[#020613]">
          <div className="max-w-[1600px] mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GrcStateProvider>
      <GrcAppContent />
    </GrcStateProvider>
  );
}

