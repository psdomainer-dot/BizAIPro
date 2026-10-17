import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Layout() {
  const { subscription, companyInfo } = useApp();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/quotations') return 'Quotations';
    if (path === '/invoices') return 'Invoices';
    if (path === '/customers') return 'Customers';
    if (path === '/followups') return 'Follow-ups';
    if (path === '/reports') return 'Reports & Analytics';
    if (path === '/ai-assistant') return 'AI Assistant';
    if (path === '/subscription') return 'Subscription';
    if (path === '/settings') return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside className="sidebar" id="sidebar">
        <div className="sidebar-brand">
          <h4><i className="bi bi-lightning-charge-fill me-2"></i>BizAI Pro</h4>
          <small>AI Business Assistant</small>
        </div>
        <nav className="sidebar-nav">
          <ul className="list-unstyled">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                <i className="bi bi-grid-1x2-fill"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/quotations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-file-earmark-text"></i>
                <span>Quotations</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/invoices" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-receipt"></i>
                <span>Invoices</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/customers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-people"></i>
                <span>Customers</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/followups" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-bell"></i>
                <span>Follow-ups</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-bar-chart-line"></i>
                <span>Reports</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ai-assistant" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-robot"></i>
                <span>AI Assistant</span>
              </NavLink>
            </li>
            <li className="nav-item mt-3">
              <NavLink to="/subscription" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-gem"></i>
                <span>Subscription</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-gear"></i>
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="px-3 pb-3 mt-auto">
          <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <small className="d-block mb-1">AI Credits</small>
            <div className="progress-custom mb-2">
              <div className="progress-bar" style={{ width: `${(subscription.aiCreditsUsed / subscription.aiCreditsLimit) * 100}%`, background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)' }}></div>
            </div>
            <small className="opacity-75">{subscription.aiCreditsUsed}/{subscription.aiCreditsLimit} used</small>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <header className="top-header">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-dark d-md-none" onClick={() => document.getElementById('sidebar')?.classList.toggle('show')}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5 className="mb-0 fw-bold">{getPageTitle()}</h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <button className="btn btn-light btn-sm rounded-circle">
                <i className="bi bi-bell"></i>
              </button>
              <span className="notification-dot"></span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 36, height: 36, fontSize: '0.85rem' }}>
                {companyInfo.name.charAt(0).toUpperCase()}
              </div>
              <span className="d-none d-md-inline fw-medium small">{companyInfo.name}</span>
            </div>
          </div>
        </header>
        <div className="page-content fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
