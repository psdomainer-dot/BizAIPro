import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function FollowUps() {
  const { followUps, customers, addFollowUp, updateFollowUp, deleteFollowUp } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    customerId: '', type: 'call' as 'call' | 'email' | 'meeting' | 'task',
    subject: '', description: '', dueDate: ''
  });

  const filtered = filter === 'all' ? followUps : followUps.filter(f => f.status === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === formData.customerId);
    addFollowUp({
      id: String(Date.now()),
      customerId: formData.customerId,
      customerName: customer?.name || '',
      type: formData.type,
      subject: formData.subject,
      description: formData.description,
      dueDate: formData.dueDate,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    });
    setShowModal(false);
    setFormData({ customerId: '', type: 'call', subject: '', description: '', dueDate: '' });
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = { call: 'bi-telephone', email: 'bi-envelope', meeting: 'bi-camera-video', task: 'bi-check2-square' };
    const colors: Record<string, string> = { call: '#0d6efd', email: '#6f42c1', meeting: '#20c997', task: '#fd7e14' };
    return <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: `${colors[type]}20`, color: colors[type] }}><i className={`bi ${icons[type]}`}></i></div>;
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = { pending: 'warning', completed: 'success', overdue: 'danger' };
    return <span className={`badge bg-${colors[status]} badge-status`}>{status}</span>;
  };

  const today = new Date().toISOString().split('T')[0];
  const pendingCount = followUps.filter(f => f.status === 'pending').length;
  const overdueCount = followUps.filter(f => f.status === 'pending' && f.dueDate < today).length;
  const completedToday = followUps.filter(f => f.status === 'completed').length;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Follow-ups</h5>
          <p className="text-muted small mb-0">Stay on top of your customer communications</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg"></i> New Follow-up
        </button>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card stat-card">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon" style={{ background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107' }}><i className="bi bi-clock"></i></div>
              <div><small className="text-muted">Pending</small><h5 className="mb-0 fw-bold">{pendingCount}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon" style={{ background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}><i className="bi bi-exclamation-circle"></i></div>
              <div><small className="text-muted">Overdue</small><h5 className="mb-0 fw-bold">{overdueCount}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon" style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#28a745' }}><i className="bi bi-check-circle"></i></div>
              <div><small className="text-muted">Completed</small><h5 className="mb-0 fw-bold">{completedToday}</h5></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-3">
        {['all', 'pending', 'completed', 'overdue'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Follow-up List */}
      <div className="card table-card">
        <div className="card-body p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-bell-slash fs-1 d-block mb-2"></i>
              <p>No follow-ups found</p>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {filtered.sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map(followUp => (
                <div key={followUp.id} className="list-group-item p-3 border-0 border-bottom">
                  <div className="d-flex align-items-start gap-3">
                    {getTypeIcon(followUp.type)}
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1 fw-bold">{followUp.subject}</h6>
                          <small className="text-muted"><i className="bi bi-person me-1"></i>{followUp.customerName}</small>
                        </div>
                        {getStatusBadge(followUp.status)}
                      </div>
                      <p className="small text-muted mt-1 mb-2">{followUp.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted"><i className="bi bi-calendar me-1"></i>Due: {followUp.dueDate}</small>
                        <div className="d-flex gap-1">
                          {followUp.status === 'pending' && (
                            <button className="btn btn-sm btn-outline-success" onClick={() => updateFollowUp(followUp.id, { status: 'completed' })}>
                              <i className="bi bi-check-lg"></i> Complete
                            </button>
                          )}
                          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteFollowUp(followUp.id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Follow-up</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Customer *</label>
                    <select className="form-select" required value={formData.customerId} onChange={e => setFormData(prev => ({ ...prev, customerId: e.target.value }))}>
                      <option value="">Select customer...</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type *</label>
                    <select className="form-select" value={formData.type} onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as any }))}>
                      <option value="call">Phone Call</option>
                      <option value="email">Email</option>
                      <option value="meeting">Meeting</option>
                      <option value="task">Task</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subject *</label>
                    <input type="text" className="form-control" required value={formData.subject} onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows={3} value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date *</label>
                    <input type="date" className="form-control" required value={formData.dueDate} onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Follow-up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
