import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Invoices() {
  const { invoices, customers, addInvoice } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [newInv, setNewInv] = useState({ customer: '', items: [{ description: '', qty: 1, price: 0 }], dueDays: 30 });

  const filtered = filter === 'all' ? invoices : invoices.filter((i: any) => i.status === filter);

  const statusColors: Record<string, string> = { draft: 'bg-secondary', sent: 'bg-primary', paid: 'bg-success', overdue: 'bg-danger' };

  const handleCreate = () => {
    const total = newInv.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + newInv.dueDays * 86400000).toISOString().split('T')[0];
    addInvoice({
      id: Date.now().toString(),
      number: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      customer: newInv.customer,
      items: newInv.items,
      total,
      status: 'draft',
      date: today,
      dueDate
    });
    setShowModal(false);
    setNewInv({ customer: '', items: [{ description: '', qty: 1, price: 0 }], dueDays: 30 });
  };

  const totalPaid = invoices.filter((i: any) => i.status === 'paid').reduce((s: number, i: any) => s + i.total, 0);
  const totalPending = invoices.filter((i: any) => i.status === 'sent').reduce((s: number, i: any) => s + i.total, 0);
  const totalOverdue = invoices.filter((i: any) => i.status === 'overdue').reduce((s: number, i: any) => s + i.total, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Invoices</h4>
          <p className="text-muted mb-0">Track and manage your invoices</p>
        </div>
        <button className="btn btn-primary-custom" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>New Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex align-items-center gap-3">
              <div className="icon" style={{ background: '#ecfdf5', color: '#10b981' }}><i className="fas fa-check-circle"></i></div>
              <div><small className="text-muted">Paid</small><h5 className="mb-0 fw-bold">${totalPaid.toLocaleString()}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex align-items-center gap-3">
              <div className="icon" style={{ background: '#eef2ff', color: '#4f46e5' }}><i className="fas fa-clock"></i></div>
              <div><small className="text-muted">Pending</small><h5 className="mb-0 fw-bold">${totalPending.toLocaleString()}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex align-items-center gap-3">
              <div className="icon" style={{ background: '#fef2f2', color: '#ef4444' }}><i className="fas fa-exclamation-triangle"></i></div>
              <div><small className="text-muted">Overdue</small><h5 className="mb-0 fw-bold">${totalOverdue.toLocaleString()}</h5></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {['all', 'draft', 'sent', 'paid', 'overdue'].map(s => (
          <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="badge bg-light text-dark ms-2">{s === 'all' ? invoices.length : invoices.filter((i: any) => i.status === s).length}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card-custom">
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr><th>Number</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th><th>Due Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((inv: any) => (
                <tr key={inv.id}>
                  <td><strong>{inv.number}</strong></td>
                  <td>{inv.customer}</td>
                  <td><strong>${inv.total.toLocaleString()}</strong></td>
                  <td><span className={`badge badge-status ${statusColors[inv.status]}`}>{inv.status}</span></td>
                  <td>{inv.date}</td>
                  <td>{inv.dueDate}</td>
                  <td>
                    <button className="btn btn-sm btn-light me-1" onClick={() => setSelectedInvoice(inv)}><i className="fas fa-eye"></i></button>
                    <button className="btn btn-sm btn-light"><i className="fas fa-edit"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Create New Invoice</h5><button className="btn-close" onClick={() => setShowModal(false)}></button></div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Customer</label>
                  <select className="form-select" value={newInv.customer} onChange={e => setNewInv(p => ({ ...p, customer: e.target.value }))}>
                    <option value="">Select customer...</option>
                    {customers.map((c: any) => <option key={c.id} value={c.company}>{c.company}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due in (days)</label>
                  <input type="number" className="form-control" value={newInv.dueDays} onChange={e => setNewInv(p => ({ ...p, dueDays: parseInt(e.target.value) }))} />
                </div>
                <h6>Items</h6>
                {newInv.items.map((item, idx) => (
                  <div key={idx} className="row g-2 mb-2 align-items-end">
                    <div className="col-md-5"><input className="form-control form-control-sm" placeholder="Description" value={item.description} onChange={e => { const items = [...newInv.items]; items[idx] = { ...items[idx], description: e.target.value }; setNewInv(p => ({ ...p, items })); }} /></div>
                    <div className="col-md-2"><input type="number" className="form-control form-control-sm" placeholder="Qty" value={item.qty} onChange={e => { const items = [...newInv.items]; items[idx] = { ...items[idx], qty: parseInt(e.target.value) || 0 }; setNewInv(p => ({ ...p, items })); }} /></div>
                    <div className="col-md-3"><input type="number" className="form-control form-control-sm" placeholder="Price" value={item.price} onChange={e => { const items = [...newInv.items]; items[idx] = { ...items[idx], price: parseFloat(e.target.value) || 0 }; setNewInv(p => ({ ...p, items })); }} /></div>
                    <div className="col-md-2"><button className="btn btn-sm btn-outline-danger" onClick={() => setNewInv(p => ({ ...p, items: p.items.filter((_, i) => i !== idx) }))}><i className="fas fa-trash"></i></button></div>
                  </div>
                ))}
                <button className="btn btn-sm btn-outline-primary mt-2" onClick={() => setNewInv(p => ({ ...p, items: [...p.items, { description: '', qty: 1, price: 0 }] }))}><i className="fas fa-plus me-1"></i>Add Item</button>
                <div className="mt-3 p-3 bg-light rounded"><strong>Total: ${newInv.items.reduce((s, i) => s + (i.qty * i.price), 0).toLocaleString()}</strong></div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={handleCreate}>Create Invoice</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedInvoice && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Invoice {selectedInvoice.number}</h5><button className="btn-close" onClick={() => setSelectedInvoice(null)}></button></div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6"><strong>Customer:</strong> {selectedInvoice.customer}</div>
                  <div className="col-md-6"><strong>Status:</strong> <span className={`badge ${statusColors[selectedInvoice.status]}`}>{selectedInvoice.status}</span></div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6"><strong>Date:</strong> {selectedInvoice.date}</div>
                  <div className="col-md-6"><strong>Due Date:</strong> {selectedInvoice.dueDate}</div>
                </div>
                <table className="table table-sm">
                  <thead><tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                  <tbody>
                    {selectedInvoice.items.map((item: any, idx: number) => (
                      <tr key={idx}><td>{item.description}</td><td>{item.qty}</td><td>${item.price.toLocaleString()}</td><td>${(item.qty * item.price).toLocaleString()}</td></tr>
                    ))}
                  </tbody>
                  <tfoot><tr><td colSpan={3} className="text-end"><strong>Total</strong></td><td><strong>${selectedInvoice.total.toLocaleString()}</strong></td></tr></tfoot>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedInvoice(null)}>Close</button>
                <button className="btn btn-primary-custom"><i className="fas fa-download me-2"></i>Download PDF</button>
                <button className="btn btn-success"><i className="fas fa-paper-plane me-2"></i>Send to Customer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
