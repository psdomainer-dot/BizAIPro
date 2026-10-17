import React from 'react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentPage, setCurrentPage } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);

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

  const notifications = [
    { icon: 'fas fa-file-invoice-dollar', color: '#10b981', text: 'Invoice INV-2024-001 has been paid', time: '2m ago', unread: true },
    { icon: 'fas fa-exclamation-triangle', color: '#ef4444', text: 'Invoice INV-2024-003 is overdue', time: '1h ago', unread: true },
    { icon: 'fas fa-user-plus', color: '#06b6d4', text: 'New lead: Mike Chen from Startup.io', time: '3h ago', unread: true },
    { icon: 'fas fa-robot', color: '#8b5cf6', text: 'AI: Revenue trend analysis available', time: '5h ago', unread: false },
    { icon: 'fas fa-file-invoice', color: '#4f46e5', text: 'Quotation QT-2024-002 viewed by client', time: '1d ago', unread: false },
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
              {item.id === 'followups' && (
                <span className="badge bg-danger ms-auto" style={{ fontSize: '0.65rem' }}>4</span>
              )}
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
            {/* Search */}
            <div className="d-none d-lg-flex input-group" style={{ width: 220 }}>
              <span className="input-group-text bg-white border-end-0" style={{ borderRight: 'none' }}>
                <i className="fas fa-search text-muted" style={{ fontSize: '0.8rem' }}></i>
              </span>
              <input type="text" className="form-control border-start-0" placeholder="Search..." style={{ fontSize: '0.85rem' }} />
            </div>

            {/* Notifications */}
            <div className="position-relative">
              <button className="btn btn-light btn-sm position-relative" onClick={() => setNotifOpen(!notifOpen)}>
                <i className="fas fa-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>3</span>
              </button>
              {notifOpen && (
                <div className="position-absolute end-0 mt-2" style={{ width: 340, zIndex: 1050, background: '#fff', borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
                  <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                    <strong style={{ fontSize: '0.9rem' }}>Notifications</strong>
                    <span className="badge bg-primary" style={{ fontSize: '0.7rem' }}>3 new</span>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {notifications.map((n, idx) => (
                      <div key={idx} className={`p-3 border-bottom ${n.unread ? 'bg-light' : ''}`} style={{ cursor: 'pointer' }}>
                        <div className="d-flex gap-2">
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${n.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <i className={n.icon} style={{ color: n.color, fontSize: '0.75rem' }}></i>
                          </div>
                          <div>
                            <p className="mb-0" style={{ fontSize: '0.8rem' }}>{n.text}</p>
                            <small className="text-muted" style={{ fontSize: '0.7rem' }}>{n.time}</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <a href="#" className="text-decoration-none" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>View all notifications</a>
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

      {/* Click outside to close notifications */}
      {notifOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 1040 }}
          onClick={() => setNotifOpen(false)}
        ></div>
      )}
    </div>
  );
}
