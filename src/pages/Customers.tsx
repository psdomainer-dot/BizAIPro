import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [formData, setFormData] = useState<{ name: string; email: string; phone: string; company: string; status: 'active' | 'inactive' | 'lead'; notes: string }>({ name: '', email: '', phone: '', company: '', status: 'lead', notes: '' });

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCustomer(editingId, formData);
    } else {
      addCustomer({ ...formData, id: String(Date.now()), lastContact: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString().split('T')[0] });
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', email: '', phone: '', company: '', status: 'lead', notes: '' });
  };

  const handleEdit = (id: string) => {
    const customer = customers.find(c => c.id === id);
    if (customer) {
      setFormData({ name: customer.name, email: customer.email, phone: customer.phone, company: customer.company, status: customer.status, notes: customer.notes });
      setEditingId(id);
      setShowModal(true);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = { active: 'success', inactive: 'secondary', lead: 'info' };
    return <span className={`badge bg-${colors[status]} badge-status`}>{status}</span>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Customers</h5>
          <p className="text-muted small mb-0">Manage your customer relationships</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', phone: '', company: '', status: 'lead', notes: '' }); setShowModal(true); }}>
          <i className="bi bi-person-plus"></i> Add Customer
        </button>
      </div>

      {/* Search and Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex gap-2">
            {['all', 'active', 'inactive', 'lead'].map(f => (
              <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="row g-3">
        {filtered.map(customer => (
          <div key={customer.id} className="col-md-6 col-xl-4">
            <div className="card stat-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: 48, height: 48, background: 'var(--primary-gradient)' }}>
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">{customer.name}</h6>
                      <small className="text-muted">{customer.company}</small>
                    </div>
                  </div>
                  {getStatusBadge(customer.status)}
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-envelope text-muted small"></i>
                    <small>{customer.email}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-telephone text-muted small"></i>
                    <small>{customer.phone}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-calendar text-muted small"></i>
                    <small>Last contact: {customer.lastContact}</small>
                  </div>
                </div>
                {customer.notes && <p className="small text-muted mb-3 fst-italic">"{customer.notes}"</p>}
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={() => handleEdit(customer.id)}>
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => { if (confirm('Delete this customer?')) deleteCustomer(customer.id); }}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-people fs-1 d-block mb-2"></i>
          <p>No customers found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? 'Edit Customer' : 'Add Customer'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Full Name *</label>
                    <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-control" required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Company *</label>
                    <input type="text" className="form-control" required value={formData.company} onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}>
                      <option value="lead">Lead</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control" rows={3} value={formData.notes} onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Customer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
