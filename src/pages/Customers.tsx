import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Customers() {
  const { customers, addCustomer } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', company: '', status: 'lead' as const });

  const filtered = customers.filter((c: any) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCreate = () => {
    addCustomer({
      id: Date.now().toString(),
      ...newCustomer,
      createdAt: new Date().toISOString().split('T')[0]
    });
    setShowModal(false);
    setNewCustomer({ name: '', email: '', phone: '', company: '', status: 'lead' });
  };

  const statusColors: Record<string, string> = { active: 'bg-success', inactive: 'bg-secondary', lead: 'bg-info' };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Customers</h4>
          <p className="text-muted mb-0">Manage your client relationships</p>
        </div>
        <button className="btn btn-primary-custom" onClick={() => setShowModal(true)}>
          <i className="fas fa-user-plus me-2"></i>Add Customer
        </button>
      </div>

      {/* Search & Filter */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white"><i className="fas fa-search text-muted"></i></span>
            <input type="text" className="form-control" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="lead">Lead</option>
          </select>
        </div>
        <div className="col-md-3">
          <div className="d-flex gap-2">
            <span className="badge bg-success p-2">{customers.filter((c: any) => c.status === 'active').length} Active</span>
            <span className="badge bg-info p-2">{customers.filter((c: any) => c.status === 'lead').length} Leads</span>
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="row g-4">
        {filtered.map((c: any) => (
          <div key={c.id} className="col-md-6 col-lg-4">
            <div className="card-custom p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-white fw-bold">{c.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">{c.name}</h6>
                    <small className="text-muted">{c.company}</small>
                  </div>
                </div>
                <span className={`badge badge-status ${statusColors[c.status]}`}>{c.status}</span>
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="fas fa-envelope text-muted" style={{ width: 16 }}></i>
                  <small>{c.email}</small>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="fas fa-phone text-muted" style={{ width: 16 }}></i>
                  <small>{c.phone}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-calendar text-muted" style={{ width: 16 }}></i>
                  <small>Since {c.createdAt}</small>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary flex-fill"><i className="fas fa-envelope me-1"></i>Email</button>
                <button className="btn btn-sm btn-outline-secondary flex-fill"><i className="fas fa-phone me-1"></i>Call</button>
                <button className="btn btn-sm btn-outline-info"><i className="fas fa-ellipsis-v"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Add New Customer</h5><button className="btn-close" onClick={() => setShowModal(false)}></button></div>
              <div className="modal-body">
                <div className="mb-3"><label className="form-label">Full Name</label><input className="form-control" value={newCustomer.name} onChange={e => setNewCustomer(p => ({ ...p, name: e.target.value }))} /></div>
                <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" value={newCustomer.email} onChange={e => setNewCustomer(p => ({ ...p, email: e.target.value }))} /></div>
                <div className="mb-3"><label className="form-label">Phone</label><input className="form-control" value={newCustomer.phone} onChange={e => setNewCustomer(p => ({ ...p, phone: e.target.value }))} /></div>
                <div className="mb-3"><label className="form-label">Company</label><input className="form-control" value={newCustomer.company} onChange={e => setNewCustomer(p => ({ ...p, company: e.target.value }))} /></div>
                <div className="mb-3"><label className="form-label">Status</label>
                  <select className="form-select" value={newCustomer.status} onChange={e => setNewCustomer(p => ({ ...p, status: e.target.value as any }))}>
                    <option value="lead">Lead</option><option value="active">Active</option><option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={handleCreate}>Add Customer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
