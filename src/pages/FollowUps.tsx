import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function FollowUps() {
  const { followUps, customers, addFollowUp, toggleFollowUp } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [newFollowUp, setNewFollowUp] = useState({ customer: '', type: 'call' as const, subject: '', notes: '', date: '' });

  const filtered = followUps.filter((f: any) => {
    if (filter === 'pending') return !f.completed;
    if (filter === 'completed') return f.completed;
    return true;
  }).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleCreate = () => {
    addFollowUp({ id: Date.now().toString(), ...newFollowUp, completed: false });
    setShowModal(false);
    setNewFollowUp({ customer: '', type: 'call', subject: '', notes: '', date: '' });
  };

  const typeIcons: Record<string, { icon: string; color: string }> = {
    call: { icon: 'fas fa-phone', color: '#10b981' },
    email: { icon: 'fas fa-envelope', color: '#4f46e5' },
    meeting: { icon: 'fas fa-handshake', color: '#f59e0b' },
    task: { icon: 'fas fa-clipboard-list', color: '#06b6d4' }
  };

  const pendingCount = followUps.filter((f: any) => !f.completed).length;
  const completedCount = followUps.filter((f: any) => f.completed).length;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Follow-ups</h4>
          <p className="text-muted mb-0">Stay on top of your customer interactions</p>
        </div>
        <button className="btn btn-primary-custom" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>New Follow-up
        </button>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex align-items-center gap-3">
              <div className="icon" style={{ background: '#fef2f2', color: '#ef4444' }}><i className="fas fa-exclamation-circle"></i></div>
              <div><small className="text-muted">Pending</small><h5 className="mb-0 fw-bold">{pendingCount}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex align-items-center gap-3">
              <div className="icon" style={{ background: '#ecfdf5', color: '#10b981' }}><i className="fas fa-check-circle"></i></div>
              <div><small className="text-muted">Completed</small><h5 className="mb-0 fw-bold">{completedCount}</h5></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex align-items-center gap-3">
              <div className="icon" style={{ background: '#eef2ff', color: '#4f46e5' }}><i className="fas fa-percentage"></i></div>
              <div><small className="text-muted">Completion Rate</small><h5 className="mb-0 fw-bold">{followUps.length > 0 ? Math.round((completedCount / followUps.length) * 100) : 0}%</h5></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="d-flex gap-2 mb-4">
        {(['all', 'pending', 'completed'] as const).map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Follow-up List */}
      <div className="card-custom">
        <div className="p-3">
          {filtered.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="fas fa-inbox fa-3x mb-3 d-block"></i>
              <p>No follow-ups found</p>
            </div>
          ) : (
            filtered.map((f: any) => (
              <div key={f.id} className={`d-flex align-items-start gap-3 p-3 mb-2 rounded ${f.completed ? 'opacity-50' : ''}`} style={{ background: '#f8fafc' }}>
                <div>
                  <input type="checkbox" className="form-check-input mt-1" checked={f.completed} onChange={() => toggleFollowUp(f.id)} />
                </div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${typeIcons[f.type].color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={typeIcons[f.type].icon} style={{ color: typeIcons[f.type].color }}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1 fw-bold" style={{ textDecoration: f.completed ? 'line-through' : 'none' }}>{f.subject}</h6>
                      <small className="text-muted">{f.customer}</small>
                    </div>
                    <span className="badge bg-light text-dark">{f.date}</span>
                  </div>
                  {f.notes && <p className="mb-0 mt-1" style={{ fontSize: '0.85rem', color: '#64748b' }}>{f.notes}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">New Follow-up</h5><button className="btn-close" onClick={() => setShowModal(false)}></button></div>
              <div className="modal-body">
                <div className="mb-3"><label className="form-label">Customer</label>
                  <select className="form-select" value={newFollowUp.customer} onChange={e => setNewFollowUp(p => ({ ...p, customer: e.target.value }))}>
                    <option value="">Select customer...</option>
                    {customers.map((c: any) => <option key={c.id} value={c.company}>{c.company}</option>)}
                  </select>
                </div>
                <div className="mb-3"><label className="form-label">Type</label>
                  <select className="form-select" value={newFollowUp.type} onChange={e => setNewFollowUp(p => ({ ...p, type: e.target.value as any }))}>
                    <option value="call">Phone Call</option><option value="email">Email</option><option value="meeting">Meeting</option><option value="task">Task</option>
                  </select>
                </div>
                <div className="mb-3"><label className="form-label">Subject</label><input className="form-control" value={newFollowUp.subject} onChange={e => setNewFollowUp(p => ({ ...p, subject: e.target.value }))} /></div>
                <div className="mb-3"><label className="form-label">Notes</label><textarea className="form-control" rows={3} value={newFollowUp.notes} onChange={e => setNewFollowUp(p => ({ ...p, notes: e.target.value }))}></textarea></div>
                <div className="mb-3"><label className="form-label">Date</label><input type="date" className="form-control" value={newFollowUp.date} onChange={e => setNewFollowUp(p => ({ ...p, date: e.target.value }))} /></div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary-custom" onClick={handleCreate}>Create Follow-up</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
