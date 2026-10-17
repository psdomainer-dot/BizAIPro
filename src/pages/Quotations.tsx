import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Quotations() {
  const { quotations, customers, addQuotation } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [newQuote, setNewQuote] = useState({
    customer: '',
    items: [{ description: '', qty: 1, price: 0 }],
    validDays: 30
  });

  const filtered = filter === 'all' ? quotations : quotations.filter((q: any) => q.status === filter);

  const statusColors: Record<string, string> = {
    draft: 'bg-secondary',
    sent: 'bg-primary',
    accepted: 'bg-success',
    rejected: 'bg-danger'
  };

  const handleCreateQuote = () => {
    const total = newQuote.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    const today = new Date().toISOString().split('T')[0];
    const validUntil = new Date(Date.now() + newQuote.validDays * 86400000).toISOString().split('T')[0];
    addQuotation({
      id: Date.now().toString(),
      number: `QT-2024-${String(quotations.length + 1).padStart(3, '0')}`,
      customer: newQuote.customer,
      items: newQuote.items,
      total,
      status: 'draft',
      date: today,
      validUntil
    });
    setShowModal(false);
    setNewQuote({ customer: '', items: [{ description: '', qty: 1, price: 0 }], validDays: 30 });
  };

  const addItem = () => {
    setNewQuote(prev => ({ ...prev, items: [...prev.items, { description: '', qty: 1, price: 0 }] }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    setNewQuote(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const removeItem = (index: number) => {
    setNewQuote(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Quotations</h4>
          <p className="text-muted mb-0">Manage your business quotations</p>
        </div>
        <button className="btn btn-primary-custom" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>New Quotation
        </button>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {['all', 'draft', 'sent', 'accepted', 'rejected'].map(s => (
          <button
            key={s}
            className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="badge bg-light text-dark ms-2">
              {s === 'all' ? quotations.length : quotations.filter((q: any) => q.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card-custom">
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Number</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q: any) => (
                <tr key={q.id}>
                  <td><strong>{q.number}</strong></td>
                  <td>{q.customer}</td>
                  <td>{q.items.length} item(s)</td>
                  <td><strong>${q.total.toLocaleString()}</strong></td>
                  <td><span className={`badge badge-status ${statusColors[q.status]}`}>{q.status}</span></td>
                  <td>{q.date}</td>
                  <td>
                    <button className="btn btn-sm btn-light me-1" onClick={() => setSelectedQuotation(q)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-light">
                      <i className="fas fa-edit"></i>
                    </button>
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
              <div className="modal-header">
                <h5 className="modal-title">Create New Quotation</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Customer</label>
                  <select className="form-select" value={newQuote.customer} onChange={e => setNewQuote(prev => ({ ...prev, customer: e.target.value }))}>
                    <option value="">Select customer...</option>
                    {customers.map((c: any) => <option key={c.id} value={c.company}>{c.company}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Valid for (days)</label>
                  <input type="number" className="form-control" value={newQuote.validDays} onChange={e => setNewQuote(prev => ({ ...prev, validDays: parseInt(e.target.value) }))} />
                </div>
                <h6>Items</h6>
                {newQuote.items.map((item, idx) => (
                  <div key={idx} className="row g-2 mb-2 align-items-end">
                    <div className="col-md-5">
                      <input className="form-control form-control-sm" placeholder="Description" value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <input type="number" className="form-control form-control-sm" placeholder="Qty" value={item.qty} onChange={e => updateItem(idx, 'qty', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="col-md-3">
                      <input type="number" className="form-control form-control-sm" placeholder="Price" value={item.price} onChange={e => updateItem(idx, 'price', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(idx)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <button className="btn btn-sm btn-outline-primary mt-2" onClick={addItem}>
                  <i className="fas fa-plus me-1"></i>Add Item
                </button>
                <div className="mt-3 p-3 bg-light rounded">
                  <strong>Total: ${newQuote.items.reduce((sum, item) => sum + (item.qty * item.price), 0).toLocaleString()}</strong>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={handleCreateQuote}>Create Quotation</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedQuotation && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Quotation {selectedQuotation.number}</h5>
                <button className="btn-close" onClick={() => setSelectedQuotation(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6"><strong>Customer:</strong> {selectedQuotation.customer}</div>
                  <div className="col-md-6"><strong>Status:</strong> <span className={`badge ${statusColors[selectedQuotation.status]}`}>{selectedQuotation.status}</span></div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6"><strong>Date:</strong> {selectedQuotation.date}</div>
                  <div className="col-md-6"><strong>Valid Until:</strong> {selectedQuotation.validUntil}</div>
                </div>
                <table className="table table-sm">
                  <thead><tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                  <tbody>
                    {selectedQuotation.items.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td>{item.description}</td>
                        <td>{item.qty}</td>
                        <td>${item.price.toLocaleString()}</td>
                        <td>${(item.qty * item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr><td colSpan={3} className="text-end"><strong>Total</strong></td><td><strong>${selectedQuotation.total.toLocaleString()}</strong></td></tr>
                  </tfoot>
                </table>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedQuotation(null)}>Close</button>
                <button className="btn btn-primary-custom"><i className="fas fa-download me-2"></i>Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
