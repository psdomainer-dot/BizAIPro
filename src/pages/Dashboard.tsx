import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { customers, quotations, invoices, followUps, subscription } = useApp();

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);
  const pendingAmount = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.total, 0);
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.total, 0);
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const pendingFollowUps = followUps.filter(f => f.status === 'pending').length;

  const revenueData = [
    { month: 'Sep', revenue: 4200 },
    { month: 'Oct', revenue: 5800 },
    { month: 'Nov', revenue: 7200 },
    { month: 'Dec', revenue: 6100 },
    { month: 'Jan', revenue: totalRevenue + pendingAmount },
  ];

  const invoiceStatusData = [
    { name: 'Paid', value: invoices.filter(i => i.status === 'paid').length, color: '#28a745' },
    { name: 'Pending', value: invoices.filter(i => i.status === 'pending').length, color: '#ffc107' },
    { name: 'Overdue', value: invoices.filter(i => i.status === 'overdue').length, color: '#dc3545' },
  ];

  const recentActivity = [
    { icon: 'bi-file-earmark-check', text: `Quotation Q-002 accepted by ${quotations[1]?.customerName || 'Client'}`, time: '2 hours ago', color: 'success' },
    { icon: 'bi-cash-stack', text: `Payment received - $${invoices[0]?.total || 0}`, time: '5 hours ago', color: 'primary' },
    { icon: 'bi-person-plus', text: `New lead: ${customers[2]?.name || 'New Customer'}`, time: '1 day ago', color: 'info' },
    { icon: 'bi-bell', text: `Follow-up reminder: ${followUps[0]?.subject || 'Task'}`, time: '1 day ago', color: 'warning' },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Total Revenue</p>
                  <h3 className="fw-bold mb-0">${totalRevenue.toLocaleString()}</h3>
                  <small className="text-success"><i className="bi bi-arrow-up"></i> 12% vs last month</small>
                </div>
                <div className="stat-icon" style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#28a745' }}>
                  <i className="bi bi-currency-dollar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Pending Amount</p>
                  <h3 className="fw-bold mb-0">${pendingAmount.toLocaleString()}</h3>
                  <small className="text-warning">{invoices.filter(i => i.status === 'pending').length} invoices</small>
                </div>
                <div className="stat-icon" style={{ background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107' }}>
                  <i className="bi bi-clock-history"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Active Customers</p>
                  <h3 className="fw-bold mb-0">{activeCustomers}</h3>
                  <small className="text-muted">of {customers.length} total</small>
                </div>
                <div className="stat-icon" style={{ background: 'rgba(13, 110, 253, 0.1)', color: '#0d6efd' }}>
                  <i className="bi bi-people"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Pending Follow-ups</p>
                  <h3 className="fw-bold mb-0">{pendingFollowUps}</h3>
                  <small className={overdueAmount > 0 ? 'text-danger' : 'text-muted'}>
                    {overdueAmount > 0 ? `$${overdueAmount.toLocaleString()} overdue` : 'All on track'}
                  </small>
                </div>
                <div className="stat-icon" style={{ background: 'rgba(111, 66, 193, 0.1)', color: '#6f42c1' }}>
                  <i className="bi bi-bell"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="chart-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Revenue Overview</h6>
              <span className="badge bg-light text-dark">Last 5 months</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" fontSize={12} />
                <YAxis stroke="#999" fontSize={12} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="chart-container h-100">
            <h6 className="fw-bold mb-3">Invoice Status</h6>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={invoiceStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="d-flex justify-content-center gap-3 mt-2">
              {invoiceStatusData.map((item, i) => (
                <div key={i} className="d-flex align-items-center gap-1">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }}></div>
                  <small>{item.name}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card table-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">Recent Activity</h6>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="list-group-item d-flex align-items-center gap-3 px-4 py-3 border-0">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center`} style={{ width: 40, height: 40, background: `var(--bs-${activity.color})`, opacity: 0.9 }}>
                      <i className={`bi ${activity.icon} text-white`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 small">{activity.text}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card table-card h-100">
            <div className="card-header">
              <h6 className="fw-bold mb-0">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <a href="#/quotations" className="btn btn-outline-primary d-flex align-items-center gap-2 justify-content-start">
                  <i className="bi bi-plus-circle"></i> New Quotation
                </a>
                <a href="#/invoices" className="btn btn-outline-success d-flex align-items-center gap-2 justify-content-start">
                  <i className="bi bi-plus-circle"></i> New Invoice
                </a>
                <a href="#/customers" className="btn btn-outline-info d-flex align-items-center gap-2 justify-content-start">
                  <i className="bi bi-person-plus"></i> Add Customer
                </a>
                <a href="#/ai-assistant" className="btn btn-outline-purple d-flex align-items-center gap-2 justify-content-start" style={{ borderColor: '#6f42c1', color: '#6f42c1' }}>
                  <i className="bi bi-robot"></i> Ask AI Assistant
                </a>
              </div>
              <hr />
              <div className="text-center">
                <small className="text-muted">Plan: <strong className="text-capitalize">{subscription.plan}</strong></small>
                <div className="progress-custom mt-2">
                  <div className="progress-bar bg-primary" style={{ width: `${(subscription.aiCreditsUsed / subscription.aiCreditsLimit) * 100}%` }}></div>
                </div>
                <small className="text-muted mt-1 d-block">{subscription.aiCreditsLimit - subscription.aiCreditsUsed} AI credits remaining</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
