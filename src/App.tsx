import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Quotations from './pages/Quotations';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import FollowUps from './pages/FollowUps';
import Reports from './pages/Reports';
import AIAssistant from './pages/AIAssistant';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';

function AppContent() {
  const { currentPage } = useAppContext();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'quotations': return <Quotations />;
      case 'invoices': return <Invoices />;
      case 'customers': return <Customers />;
      case 'followups': return <FollowUps />;
      case 'reports': return <Reports />;
      case 'ai-assistant': return <AIAssistant />;
      case 'subscription': return <Subscription />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
