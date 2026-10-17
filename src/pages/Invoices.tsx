import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

export default function Invoices() {
  const { invoices, customers, addInvoice, updateInvoice, deleteInvoice } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    customerId: '', items: [{ id: uuidv4(), description: '', quantity: 1, unitPrice: 0, total: 0 }], dueDate: ''
  });

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === formData.customerId);
    const items = formData.items.map(item => ({ ...item, total: item.quantity * item.unitPrice }));
    const total = items.reduce((sum, item) => sum + item.total, 0);
    addInvoice({
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      customerId: formData.customerId,
      customerName: `${customer?.name} - ${customer?.company}`,
      items, total, status: 'pending',
      dueDate: formData.dueDate,
      createdAt: new Date().toISOString().split('T')[0]
    });
    setShowModal(false);
    setFormData({ customerId: '', items: [{ id: uuidv4(), description: '', quantity: 1, unitPrice: 0, total: 0 }], dueDate: '' });
  };

  const addItem = () => {
    setFormData(prev => ({ ...prev, items: [...prev.items, { id: uuidv4(), description: '', quantity: 1, unitPrice: 0, total: 0 }] }));
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        updated.total = updated.quantity * updated.unitPrice;
        return updated;
      })
    }));
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = { pending: 'warning', paid: 'success', overdue: 'danger', cancelled: 'secondary' };
    return <span className={`badge bg-${colors[status]} badge-status`}>{status}</span>;
  };

  const detail = showDetail ? invoices.find(i => i.id === showDetail) : null;

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.total, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Invoices</h5>
          <p className="text-muted small mb-0">Track payments and manage billing</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg"></i> New Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card stat-card">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon" style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#28a745' }}><i className="bi bi-check-circle"></i></div>
              <div><small className="text-muted">Paid</small><h5 className="mb-0 fw-bold">${totalPaid.toLocaleString()}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon" style={{ background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107' }}><i className="bi bi-clock"></i></div>
              <div><small className="text-muted">Pending</small><h5 className="mb-0 fw-bold">${totalPending.toLocaleString()}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon" style={{ background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}><i className="bi bi-exclamation-triangle"></i></div>
              <div><small className="text-muted">Overdue</small><h5 className="mb-0 fw-bold">${totalOverdue.toLocaleString()}</h5></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        {['all', 'pending', 'paid', 'overdue', 'cancelled'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)} {f === 'all' ? `(${invoices.length})` : `(${invoices.filter(i => i.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card table-card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Invoice #</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id}>
                  <td className="ps-4 fw-medium">{inv.id}</td>
                  <td>{inv.customerName}</td>
                  <td className="fw-medium">${inv.total.toLocaleString()}</td>
                  <td>{getStatusBadge(inv.status)}</td>
                  <td>{inv.dueDate}</td>
                  <td>{inv.createdAt}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => setShowDetail(inv.id)} title="View"><i className="bi bi-eye"></i></button>
                      {inv.status === 'pending' && (
                        <button className="btn btn-sm btn-outline-success" onClick={() => updateInvoice(inv.id, { status: 'paid', paidAt: new Date().toISOString().split('T')[0] })} title="Mark Paid"><i className="bi bi-check-lg"></i></button>
                      )}
                      {inv.status === 'pending' && (
                        <button className="btn btn-sm btn-outline-warning" onClick={() => updateInvoice(inv.id, { status: 'overdue' })} title="Mark Overdue"><i className="bi bi-exclamation-triangle"></i></button>
                      )}
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteInvoice(inv.id)} title="Delete"><i className="bi bi-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-5 text-muted"><i className="bi bi-inbox fs-1 d-block mb-2"></i>No invoices found</div>}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invoice {detail.id}</h5>
                <button className="btn-close" onClick={() => setShowDetail(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6"><strong>Customer:</strong> {detail.customerName}</div>
                  <div className="col-md-6"><strong>Status:</strong> {getStatusBadge(detail.status)}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6"><strong>Due Date:</strong> {detail.dueDate}</div>
                  <div className="col-md-6"><strong>Created:</strong> {detail.createdAt}</div>
                  {detail.paidAt && <div className="col-md-6"><strong>Paid At:</strong> {detail.paidAt}</div>}
                </div>
                <table className="table table-sm">
                  <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
                  <tbody>
                    {detail.items.map(item => (
                      <tr key={item.id}><td>{item.description}</td><td>{item.quantity}</td><td>${item.unitPrice.toLocaleString()}</td><td>${item.total.toLocaleString()}</td></tr>
                    ))}
                  </tbody>
                  <tfoot><tr><th colSpan={3} className="text-end">Total:</th><th>${detail.total.toLocaleString()}</th></tr></tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Invoice</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Customer</label>
                      <select className="form-select" required value={formData.customerId} onChange={e => setFormData(prev => ({ ...prev, customerId: e.target.value }))}>
                        <option value="">Select customer...</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Due Date</label>
                      <input type="date" className="form-control" required value={formData.dueDate} onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))} />
                    </div>
                  </div>
                  <h6 className="fw-bold">Line Items</h6>
                  {formData.items.map((item) => (
                    <div key={item.id} className="row g-2 mb-2 align-items-end">
                      <div className="col-md-5">
                        <input type="text" className="form-control form-control-sm" placeholder="Description" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} required />
                      </div>
                      <div className="col-md-2">
                        <input type="number" className="form-control form-control-sm" placeholder="Qty" min="1" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))} required />
                      </div>
                      <div className="col-md-3">
                        <input type="number" className="form-control form-control-sm" placeholder="Unit Price" min="0" step="0.01" value={item.unitPrice || ''} onChange={e => updateItem(item.id, 'unitPrice', Number(e.target.value))} required />
                      </div>
                      <div className="col-md-1"><span className="small fw-medium">${item.total.toLocaleString()}</span></div>
                      <div className="col-md-1">{formData.items.length > 1 && <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}><i className="bi bi-x"></i></button>}</div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addItem}><i className="bi bi-plus"></i> Add Item</button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Invoice</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
