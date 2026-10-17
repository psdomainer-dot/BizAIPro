import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { customers, quotations, invoices, followUps, setCurrentPage } = useAppContext();

  const totalRevenue = invoices.filter((i: any) => i.status === 'paid').reduce((sum: number, i: any) => sum + i.total, 0);
  const pendingInvoices = invoices.filter((i: any) => i.status === 'sent' || i.status === 'overdue').reduce((sum: number, i: any) => sum + i.total, 0);
  const activeCustomers = customers.filter((c: any) => c.status === 'active').length;
  const pendingFollowUps = followUps.filter((f: any) => !f.completed).length;

  const recentActivities = [
    { icon: 'fas fa-file-invoice-dollar', color: '#10b981', text: 'Invoice INV-2024-001 paid by TechCorp Inc.', time: '2 hours ago' },
    { icon: 'fas fa-file-invoice', color: '#4f46e5', text: 'New quotation QT-2024-003 created for Startup.io', time: '5 hours ago' },
    { icon: 'fas fa-user-plus', color: '#06b6d4', text: 'New customer Mike Chen added as lead', time: '1 day ago' },
    { icon: 'fas fa-exclamation-triangle', color: '#ef4444', text: 'Invoice INV-2024-003 is overdue', time: '2 days ago' },
    { icon: 'fas fa-check-circle', color: '#10b981', text: 'Follow-up completed for Design Studio', time: '3 days ago' },
  ];

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: 'fas fa-dollar-sign', color: '#10b981', bg: '#ecfdf5', change: '+12.5%' },
    { label: 'Pending Invoices', value: `$${pendingInvoices.toLocaleString()}`, icon: 'fas fa-clock', color: '#f59e0b', bg: '#fffbeb', change: '-3.2%' },
    { label: 'Active Customers', value: activeCustomers.toString(), icon: 'fas fa-users', color: '#4f46e5', bg: '#eef2ff', change: '+2 new' },
    { label: 'Pending Follow-ups', value: pendingFollowUps.toString(), icon: 'fas fa-tasks', color: '#ef4444', bg: '#fef2f2', change: 'Action needed' },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-lg-3 col-md-6">
            <div className="stat-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>{stat.label}</p>
                  <h4 className="fw-bold mb-1">{stat.value}</h4>
                  <small style={{ color: stat.color, fontSize: '0.8rem' }}>{stat.change}</small>
                </div>
                <div className="icon" style={{ background: stat.bg, color: stat.color }}>
                  <i className={stat.icon}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Revenue Chart Placeholder */}
        <div className="col-lg-8">
          <div className="card-custom">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Revenue Overview</span>
              <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <div className="p-4">
              <div className="d-flex align-items-end gap-2" style={{ height: 200 }}>
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div key={i} className="flex-fill d-flex flex-column align-items-center justify-content-end" style={{ height: '100%' }}>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: 40,
                        height: `${h}%`,
                        background: i === 11 ? 'var(--primary)' : '#e2e8f0',
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.3s'
                      }}
                    ></div>
                    <small className="text-muted mt-2" style={{ fontSize: '0.65rem' }}>
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4">
          <div className="card-custom h-100">
            <div className="card-header">
              <span>Recent Activity</span>
            </div>
            <div className="p-3">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="d-flex gap-3 mb-3 pb-3 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${activity.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={activity.icon} style={{ color: activity.color, fontSize: '0.8rem' }}></i>
                  </div>
                  <div>
                    <p className="mb-0" style={{ fontSize: '0.85rem' }}>{activity.text}</p>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4 mt-2">
        <div className="col-12">
          <div className="card-custom">
            <div className="card-header">Quick Actions</div>
            <div className="p-4">
              <div className="row g-3">
                <div className="col-md-3 col-6">
                  <button className="btn btn-outline-primary w-100 py-3" onClick={() => setCurrentPage('quotations')}>
                    <i className="fas fa-file-invoice-dollar mb-2 d-block"></i>
                    <small>New Quotation</small>
                  </button>
                </div>
                <div className="col-md-3 col-6">
                  <button className="btn btn-outline-success w-100 py-3" onClick={() => setCurrentPage('invoices')}>
                    <i className="fas fa-file-invoice mb-2 d-block"></i>
                    <small>New Invoice</small>
                  </button>
                </div>
                <div className="col-md-3 col-6">
                  <button className="btn btn-outline-info w-100 py-3" onClick={() => setCurrentPage('customers')}>
                    <i className="fas fa-user-plus mb-2 d-block"></i>
                    <small>Add Customer</small>
                  </button>
                </div>
                <div className="col-md-3 col-6">
                  <button className="btn btn-outline-warning w-100 py-3" onClick={() => setCurrentPage('ai-assistant')}>
                    <i className="fas fa-robot mb-2 d-block"></i>
                    <small>Ask AI</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
