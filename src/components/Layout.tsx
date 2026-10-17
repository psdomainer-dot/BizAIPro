import React from 'react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentPage, setCurrentPage } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-th-large' },
    { id: 'quotations', label: 'Quotations', icon: 'fas fa-file-invoice-dollar' },
    { id: 'invoices', label: 'Invoices', icon: 'fas fa-file-invoice' },
    { id: 'customers', label: 'Customers', icon: 'fas fa-users' },
    { id: 'followups', label: 'Follow-ups', icon: 'fas fa-tasks' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-chart-bar' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: 'fas fa-robot' },
    { id: 'subscription', label: 'Subscription', icon: 'fas fa-crown' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="p-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-robot text-white"></i>
            </div>
            <div>
              <h5 className="text-white mb-0" style={{ fontSize: '1.1rem' }}>BizAI Pro</h5>
              <small className="text-muted" style={{ fontSize: '0.7rem' }}>Business Assistant</small>
            </div>
          </div>
        </div>
        <nav className="mt-2">
          {navItems.map(item => (
            <a
              key={item.id}
              href="#"
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage(item.id); setSidebarOpen(false); }}
            >
              <i className={item.icon}></i>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-3 mt-auto" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div className="p-3 rounded" style={{ background: 'rgba(79,70,229,0.15)' }}>
            <small className="text-white d-block mb-1">AI Credits</small>
            <div className="progress" style={{ height: 6 }}>
              <div className="progress-bar" style={{ width: '85%', background: 'var(--primary)' }}></div>
            </div>
            <small className="text-muted mt-1 d-block">85/100 credits remaining</small>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        {/* Top Bar */}
        <div className="top-bar d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-link text-dark d-md-none p-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="fas fa-bars fa-lg"></i>
            </button>
            <div>
              <h5 className="mb-0 fw-bold" style={{ textTransform: 'capitalize' }}>
                {currentPage.replace('-', ' ')}
              </h5>
              <small className="text-muted">Welcome back, Admin</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light btn-sm position-relative">
              <i className="fas fa-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>3</span>
            </button>
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-white fw-bold" style={{ fontSize: '0.85rem' }}>A</span>
              </div>
              <span className="d-none d-lg-inline fw-medium" style={{ fontSize: '0.9rem' }}>Admin User</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content fade-in">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
