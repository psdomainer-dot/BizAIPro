import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Reports() {
  const { customers, quotations, invoices, followUps } = useApp();
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  // Generate data
  const monthlyData = [
    { name: 'Aug', revenue: 3200, expenses: 1800, profit: 1400 },
    { name: 'Sep', revenue: 4200, expenses: 2100, profit: 2100 },
    { name: 'Oct', revenue: 5800, expenses: 2400, profit: 3400 },
    { name: 'Nov', revenue: 7200, expenses: 2800, profit: 4400 },
    { name: 'Dec', revenue: 6100, expenses: 2600, profit: 3500 },
    { name: 'Jan', revenue: 8400, expenses: 3000, profit: 5400 },
  ];

  const customerGrowth = [
    { name: 'Aug', customers: 8 },
    { name: 'Sep', customers: 12 },
    { name: 'Oct', customers: 15 },
    { name: 'Nov', customers: 18 },
    { name: 'Dec', customers: 20 },
    { name: 'Jan', customers: customers.length },
  ];

  const quotationConversion = [
    { name: 'Aug', sent: 5, accepted: 3 },
    { name: 'Sep', sent: 7, accepted: 4 },
    { name: 'Oct', sent: 8, accepted: 6 },
    { name: 'Nov', sent: 6, accepted: 4 },
    { name: 'Dec', sent: 9, accepted: 5 },
    { name: 'Jan', sent: quotations.length, accepted: quotations.filter(q => q.status === 'accepted').length },
  ];

  const totalRevenue = invoices.reduce((s, i) => s + i.total, 0);
  const paidRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const avgInvoiceValue = invoices.length > 0 ? totalRevenue / invoices.length : 0;
  const conversionRate = quotations.length > 0 ? (quotations.filter(q => q.status === 'accepted').length / quotations.length * 100) : 0;
  const followUpCompletion = followUps.length > 0 ? (followUps.filter(f => f.status === 'completed').length / followUps.length * 100) : 0;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Reports & Analytics</h5>
          <p className="text-muted small mb-0">Business performance insights and trends</p>
        </div>
        <div className="d-flex gap-2">
          {(['month', 'quarter', 'year'] as const).map(p => (
            <button key={p} className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPeriod(p)}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <small className="text-muted">Total Revenue</small>
              <h4 className="fw-bold mb-1">${totalRevenue.toLocaleString()}</h4>
              <small className="text-success"><i className="bi bi-arrow-up"></i> 18% growth</small>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <small className="text-muted">Collected</small>
              <h4 className="fw-bold mb-1">${paidRevenue.toLocaleString()}</h4>
              <small className="text-muted">{totalRevenue > 0 ? Math.round(paidRevenue / totalRevenue * 100) : 0}% collection rate</small>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <small className="text-muted">Avg. Invoice</small>
              <h4 className="fw-bold mb-1">${Math.round(avgInvoiceValue).toLocaleString()}</h4>
              <small className="text-muted">{invoices.length} total invoices</small>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <small className="text-muted">Conversion Rate</small>
              <h4 className="fw-bold mb-1">{conversionRate.toFixed(0)}%</h4>
              <small className="text-muted">Quotation acceptance</small>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="chart-container">
            <h6 className="fw-bold mb-3">Revenue & Profit Trend</h6>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" fontSize={12} />
                <YAxis stroke="#999" fontSize={12} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="revenue" stroke="#667eea" fill="rgba(102, 126, 234, 0.1)" strokeWidth={2} />
                <Area type="monotone" dataKey="profit" stroke="#28a745" fill="rgba(40, 167, 69, 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="d-flex gap-3 mt-2">
              <div className="d-flex align-items-center gap-1"><div style={{ width: 12, height: 3, background: '#667eea', borderRadius: 2 }}></div><small>Revenue</small></div>
              <div className="d-flex align-items-center gap-1"><div style={{ width: 12, height: 3, background: '#28a745', borderRadius: 2 }}></div><small>Profit</small></div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="chart-container h-100">
            <h6 className="fw-bold mb-3">Customer Growth</h6>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" fontSize={12} />
                <YAxis stroke="#999" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="#6f42c1" strokeWidth={2} dot={{ fill: '#6f42c1', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="chart-container">
            <h6 className="fw-bold mb-3">Quotation Conversion</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={quotationConversion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" fontSize={12} />
                <YAxis stroke="#999" fontSize={12} />
                <Tooltip />
                <Bar dataKey="sent" fill="#ffc107" radius={[4, 4, 0, 0]} name="Sent" />
                <Bar dataKey="accepted" fill="#28a745" radius={[4, 4, 0, 0]} name="Accepted" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="chart-container">
            <h6 className="fw-bold mb-3">Performance Metrics</h6>
            <div className="mt-4">
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <small className="fw-medium">Follow-up Completion</small>
                  <small className="fw-bold">{followUpCompletion.toFixed(0)}%</small>
                </div>
                <div className="progress-custom">
                  <div className="progress-bar" style={{ width: `${followUpCompletion}%`, background: 'linear-gradient(90deg, #667eea, #764ba2)' }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <small className="fw-medium">Invoice Collection Rate</small>
                  <small className="fw-bold">{totalRevenue > 0 ? Math.round(paidRevenue / totalRevenue * 100) : 0}%</small>
                </div>
                <div className="progress-custom">
                  <div className="progress-bar bg-success" style={{ width: `${totalRevenue > 0 ? paidRevenue / totalRevenue * 100 : 0}%` }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <small className="fw-medium">Customer Retention</small>
                  <small className="fw-bold">{customers.length > 0 ? Math.round(customers.filter(c => c.status === 'active').length / customers.length * 100) : 0}%</small>
                </div>
                <div className="progress-custom">
                  <div className="progress-bar bg-info" style={{ width: `${customers.length > 0 ? customers.filter(c => c.status === 'active').length / customers.length * 100 : 0}%` }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <small className="fw-medium">Quotation Win Rate</small>
                  <small className="fw-bold">{conversionRate.toFixed(0)}%</small>
                </div>
                <div className="progress-custom">
                  <div className="progress-bar bg-warning" style={{ width: `${conversionRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-1">
                  <small className="fw-medium">AI Credits Usage</small>
                  <small className="fw-bold">23%</small>
                </div>
                <div className="progress-custom">
                  <div className="progress-bar" style={{ width: '23%', background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
