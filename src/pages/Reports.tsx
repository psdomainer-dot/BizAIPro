import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Reports() {
  const { quotations, invoices, customers, followUps } = useAppContext();
  const [period, setPeriod] = useState('month');

  const totalRevenue = invoices.filter((i: any) => i.status === 'paid').reduce((s: number, i: any) => s + i.total, 0);
  const totalPending = invoices.filter((i: any) => i.status !== 'paid').reduce((s: number, i: any) => s + i.total, 0);
  const quoteConversion = quotations.length > 0 ? Math.round((quotations.filter((q: any) => q.status === 'accepted').length / quotations.length) * 100) : 0;
  const avgQuoteValue = quotations.length > 0 ? Math.round(quotations.reduce((s: number, q: any) => s + q.total, 0) / quotations.length) : 0;

  const monthlyData = [
    { month: 'Oct', revenue: 8500, expenses: 4200, quotes: 5 },
    { month: 'Nov', revenue: 12000, expenses: 5100, quotes: 7 },
    { month: 'Dec', revenue: 9800, expenses: 4800, quotes: 4 },
    { month: 'Jan', revenue: 15000, expenses: 6200, quotes: 8 },
    { month: 'Feb', revenue: 11500, expenses: 5500, quotes: 6 },
    { month: 'Mar', revenue: 14200, expenses: 5800, quotes: 9 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  const topCustomers = [
    { name: 'TechCorp Inc.', revenue: 11500, projects: 3 },
    { name: 'Design Studio', revenue: 4500, projects: 2 },
    { name: 'Marketing Co.', revenue: 8500, projects: 4 },
    { name: 'Startup.io', revenue: 8000, projects: 1 },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Reports & Analytics</h4>
          <p className="text-muted mb-0">Business performance insights</p>
        </div>
        <div className="d-flex gap-2">
          <select className="form-select form-select-sm" style={{ width: 'auto' }} value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn btn-sm btn-outline-primary"><i className="fas fa-download me-1"></i>Export</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <small className="text-muted">Total Revenue</small>
            <h4 className="fw-bold mt-1">${totalRevenue.toLocaleString()}</h4>
            <div className="d-flex align-items-center mt-2">
              <span className="badge bg-success bg-opacity-10 text-success me-2"><i className="fas fa-arrow-up"></i> 12.5%</span>
              <small className="text-muted">vs last period</small>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <small className="text-muted">Pending Amount</small>
            <h4 className="fw-bold mt-1">${totalPending.toLocaleString()}</h4>
            <div className="d-flex align-items-center mt-2">
              <span className="badge bg-warning bg-opacity-10 text-warning me-2">{invoices.filter((i: any) => i.status === 'overdue').length} overdue</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <small className="text-muted">Quote Conversion</small>
            <h4 className="fw-bold mt-1">{quoteConversion}%</h4>
            <div className="progress mt-2" style={{ height: 6 }}>
              <div className="progress-bar bg-success" style={{ width: `${quoteConversion}%` }}></div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="stat-card">
            <small className="text-muted">Avg. Quote Value</small>
            <h4 className="fw-bold mt-1">${avgQuoteValue.toLocaleString()}</h4>
            <div className="d-flex align-items-center mt-2">
              <span className="badge bg-info bg-opacity-10 text-info me-2">{quotations.length} total quotes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Revenue Chart */}
        <div className="col-lg-8">
          <div className="card-custom">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Revenue Trend</span>
              <div className="d-flex gap-3">
                <span className="d-flex align-items-center gap-1"><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--primary)' }}></span><small>Revenue</small></span>
                <span className="d-flex align-items-center gap-1"><span style={{ width: 12, height: 12, borderRadius: 3, background: '#e2e8f0' }}></span><small>Expenses</small></span>
              </div>
            </div>
            <div className="p-4">
              <div className="d-flex align-items-end gap-3" style={{ height: 220 }}>
                {monthlyData.map((d, i) => (
                  <div key={i} className="flex-fill d-flex flex-column align-items-center" style={{ height: '100%' }}>
                    <div className="d-flex gap-1 align-items-end flex-fill w-100 justify-content-center">
                      <div style={{ width: '35%', maxWidth: 30, height: `${(d.revenue / maxRevenue) * 100}%`, background: 'var(--primary)', borderRadius: '4px 4px 0 0' }} title={`Revenue: $${d.revenue.toLocaleString()}`}></div>
                      <div style={{ width: '35%', maxWidth: 30, height: `${(d.expenses / maxRevenue) * 100}%`, background: '#e2e8f0', borderRadius: '4px 4px 0 0' }} title={`Expenses: $${d.expenses.toLocaleString()}`}></div>
                    </div>
                    <small className="text-muted mt-2" style={{ fontSize: '0.75rem' }}>{d.month}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="col-lg-4">
          <div className="card-custom h-100">
            <div className="card-header">Top Customers by Revenue</div>
            <div className="p-3">
              {topCustomers.map((c, idx) => (
                <div key={idx} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${idx * 80}, 70%, 90%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="fw-bold" style={{ fontSize: '0.8rem', color: `hsl(${idx * 80}, 70%, 40%)` }}>{idx + 1}</span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>{c.name}</h6>
                    <small className="text-muted">{c.projects} projects</small>
                  </div>
                  <strong style={{ color: 'var(--primary)' }}>${c.revenue.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="row g-4 mt-2">
        <div className="col-lg-6">
          <div className="card-custom">
            <div className="card-header">Customer Distribution</div>
            <div className="p-4">
              <div className="d-flex justify-content-around align-items-center">
                <div className="text-center">
                  <div style={{ width: 100, height: 100, borderRadius: '50%', border: '8px solid #10b981', borderRightColor: '#e2e8f0', borderBottomColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <span className="fw-bold">{customers.filter((c: any) => c.status === 'active').length}</span>
                  </div>
                  <small className="text-muted mt-2 d-block">Active</small>
                </div>
                <div className="text-center">
                  <div style={{ width: 100, height: 100, borderRadius: '50%', border: '8px solid #06b6d4', borderRightColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <span className="fw-bold">{customers.filter((c: any) => c.status === 'lead').length}</span>
                  </div>
                  <small className="text-muted mt-2 d-block">Leads</small>
                </div>
                <div className="text-center">
                  <div style={{ width: 100, height: 100, borderRadius: '50%', border: '8px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <span className="fw-bold">{customers.filter((c: any) => c.status === 'inactive').length}</span>
                  </div>
                  <small className="text-muted mt-2 d-block">Inactive</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card-custom">
            <div className="card-header">Follow-up Performance</div>
            <div className="p-4">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Calls</small>
                  <small>{followUps.filter((f: any) => f.type === 'call').length} total</small>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress-bar bg-success" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Emails</small>
                  <small>{followUps.filter((f: any) => f.type === 'email').length} total</small>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress-bar bg-primary" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Meetings</small>
                  <small>{followUps.filter((f: any) => f.type === 'meeting').length} total</small>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress-bar bg-warning" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <small>Tasks</small>
                  <small>{followUps.filter((f: any) => f.type === 'task').length} total</small>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress-bar bg-info" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
