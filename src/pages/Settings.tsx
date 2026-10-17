import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { companyInfo, setCompanyInfo, isInstalled, setIsInstalled } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [wizardStep, setWizardStep] = useState(1);
  const [formData, setFormData] = useState(companyInfo);
  const [showWizard, setShowWizard] = useState(!isInstalled);
  const [dbConfig, setDbConfig] = useState({ host: 'localhost', port: '3306', name: 'bizai_db', user: 'root', password: '' });
  const [installProgress, setInstallProgress] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const runInstallation = () => {
    setInstallProgress(0);
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalled(true);
          setShowWizard(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const wizardSteps = [
    { icon: 'bi-welcome', title: 'Welcome', description: 'Welcome to BizAI Pro setup wizard' },
    { icon: 'bi-building', title: 'Company Info', description: 'Tell us about your business' },
    { icon: 'bi-database', title: 'Database', description: 'Configure your database connection' },
    { icon: 'bi-gear', title: 'Install', description: 'Install and configure the system' },
    { icon: 'bi-check-circle', title: 'Complete', description: 'You\'re all set!' },
  ];

  if (showWizard) {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card table-card">
            <div className="card-body p-4">
              {/* Progress */}
              <div className="d-flex justify-content-between mb-4">
                {wizardSteps.map((step, i) => (
                  <div key={i} className="text-center" style={{ flex: 1 }}>
                    <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${i + 1 <= wizardStep ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 40, height: 40 }}>
                      <i className={`bi ${step.icon}`}></i>
                    </div>
                    <small className={`d-none d-md-block ${i + 1 <= wizardStep ? 'fw-bold' : 'text-muted'}`}>{step.title}</small>
                  </div>
                ))}
              </div>
              <hr />

              {/* Step 1: Welcome */}
              {wizardStep === 1 && (
                <div className="wizard-step">
                  <div className="step-icon"><i className="bi bi-lightning-charge-fill"></i></div>
                  <h4 className="fw-bold mb-3">Welcome to BizAI Pro!</h4>
                  <p className="text-muted mb-4">This wizard will guide you through the initial setup of your AI Business Assistant. It will only take a few minutes.</p>
                  <div className="row g-3 text-start mb-4">
                    <div className="col-md-4 text-center">
                      <i className="bi bi-file-earmark-text fs-3 text-primary d-block mb-2"></i>
                      <small>Quotations & Invoices</small>
                    </div>
                    <div className="col-md-4 text-center">
                      <i className="bi bi-people fs-3 text-primary d-block mb-2"></i>
                      <small>Customer Management</small>
                    </div>
                    <div className="col-md-4 text-center">
                      <i className="bi bi-robot fs-3 text-primary d-block mb-2"></i>
                      <small>AI-Powered Insights</small>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg" onClick={() => setWizardStep(2)}>Get Started <i className="bi bi-arrow-right"></i></button>
                </div>
              )}

              {/* Step 2: Company Info */}
              {wizardStep === 2 && (
                <div>
                  <h5 className="fw-bold mb-4"><i className="bi bi-building me-2"></i>Company Information</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Company Name *</label>
                      <input type="text" className="form-control" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input type="email" className="form-control" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input type="text" className="form-control" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input type="text" className="form-control" value={formData.address} onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-secondary" onClick={() => setWizardStep(1)}><i className="bi bi-arrow-left"></i> Back</button>
                    <button className="btn btn-primary" onClick={() => setWizardStep(3)} disabled={!formData.name || !formData.email}>Next <i className="bi bi-arrow-right"></i></button>
                  </div>
                </div>
              )}

              {/* Step 3: Database */}
              {wizardStep === 3 && (
                <div>
                  <h5 className="fw-bold mb-4"><i className="bi bi-database me-2"></i>Database Configuration</h5>
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Configure your MySQL database connection. In this demo, the system uses localStorage for data persistence.
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Database Host</label>
                      <input type="text" className="form-control" value={dbConfig.host} onChange={e => setDbConfig(prev => ({ ...prev, host: e.target.value }))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Port</label>
                      <input type="text" className="form-control" value={dbConfig.port} onChange={e => setDbConfig(prev => ({ ...prev, port: e.target.value }))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Database Name</label>
                      <input type="text" className="form-control" value={dbConfig.name} onChange={e => setDbConfig(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Username</label>
                      <input type="text" className="form-control" value={dbConfig.user} onChange={e => setDbConfig(prev => ({ ...prev, user: e.target.value }))} />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" value={dbConfig.password} onChange={e => setDbConfig(prev => ({ ...prev, password: e.target.value }))} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-secondary" onClick={() => setWizardStep(2)}><i className="bi bi-arrow-left"></i> Back</button>
                    <button className="btn btn-primary" onClick={() => setWizardStep(4)}>Next <i className="bi bi-arrow-right"></i></button>
                  </div>
                </div>
              )}

              {/* Step 4: Install */}
              {wizardStep === 4 && (
                <div className="wizard-step">
                  <div className="step-icon"><i className="bi bi-gear-fill"></i></div>
                  <h5 className="fw-bold mb-3">Installing BizAI Pro</h5>
                  {installProgress === 0 ? (
                    <>
                      <p className="text-muted mb-4">Ready to install. This will set up your database, create tables, and configure the system.</p>
                      <div className="text-start mb-4">
                        <div className="d-flex align-items-center gap-2 mb-2"><i className="bi bi-check-circle text-success"></i><small>Create database tables</small></div>
                        <div className="d-flex align-items-center gap-2 mb-2"><i className="bi bi-check-circle text-success"></i><small>Set up user permissions</small></div>
                        <div className="d-flex align-items-center gap-2 mb-2"><i className="bi bi-check-circle text-success"></i><small>Configure AI services</small></div>
                        <div className="d-flex align-items-center gap-2 mb-2"><i className="bi bi-check-circle text-success"></i><small>Initialize default data</small></div>
                        <div className="d-flex align-items-center gap-2"><i className="bi bi-check-circle text-success"></i><small>Finalize setup</small></div>
                      </div>
                      <button className="btn btn-primary btn-lg" onClick={runInstallation}>
                        <i className="bi bi-download me-2"></i>Install Now
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="progress-custom mb-3" style={{ height: 12 }}>
                        <div className="progress-bar" style={{ width: `${installProgress}%`, background: 'var(--primary-gradient)', transition: 'width 0.3s ease' }}></div>
                      </div>
                      <p className="text-muted">{installProgress < 100 ? `Installing... ${installProgress}%` : 'Installation complete!'}</p>
                      {installProgress >= 100 && (
                        <button className="btn btn-success btn-lg mt-3" onClick={() => setWizardStep(5)}>
                          Continue <i className="bi bi-arrow-right"></i>
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Step 5: Complete */}
              {wizardStep === 5 && (
                <div className="wizard-step">
                  <div className="step-icon" style={{ background: 'linear-gradient(135deg, #28a745, #20c997)' }}><i className="bi bi-check-lg"></i></div>
                  <h4 className="fw-bold mb-3">Installation Complete!</h4>
                  <p className="text-muted mb-4">BizAI Pro has been successfully installed and configured. You're ready to start managing your business with AI assistance.</p>
                  <div className="row g-3 text-start mb-4">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded">
                        <h6><i className="bi bi-lightning-charge text-warning me-2"></i>Quick Start</h6>
                        <small className="text-muted">Add your first customer and create a quotation to get started.</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded">
                        <h6><i className="bi bi-book text-primary me-2"></i>Documentation</h6>
                        <small className="text-muted">Check our guides to learn about all features.</small>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg" onClick={() => { setCompanyInfo(formData); setIsInstalled(true); setShowWizard(false); }}>
                    <i className="bi bi-rocket-takeoff me-2"></i>Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold mb-1">Settings</h5>
          <p className="text-muted small mb-0">Manage your application settings and preferences</p>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={() => { setShowWizard(true); setWizardStep(1); }}>
          <i className="bi bi-arrow-repeat me-1"></i>Run Upgrade Wizard
        </button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {[
          { id: 'general', icon: 'bi-gear', label: 'General' },
          { id: 'system', icon: 'bi-hdd', label: 'System Info' },
          { id: 'backup', icon: 'bi-cloud-upload', label: 'Backup & Data' },
          { id: 'about', icon: 'bi-info-circle', label: 'About' },
        ].map(tab => (
          <li key={tab.id} className="nav-item">
            <button className={`nav-link ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <i className={`bi ${tab.icon} me-1`}></i>{tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="card table-card">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Company Information</h6>
            {saved && <div className="alert alert-success alert-dismissible fade show"><i className="bi bi-check-circle me-2"></i>Settings saved successfully!<button className="btn-close" onClick={() => setSaved(false)}></button></div>}
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-control" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" value={formData.address} onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3"><i className="bi bi-check-lg me-1"></i>Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* System Info Tab */}
      {activeTab === 'system' && (
        <div className="card table-card">
          <div className="card-body">
            <h6 className="fw-bold mb-3">System Information</h6>
            <table className="table table-sm">
              <tbody>
                <tr><td className="fw-medium" style={{ width: '30%' }}>Application</td><td>BizAI Pro</td></tr>
                <tr><td className="fw-medium">Version</td><td>2.1.0</td></tr>
                <tr><td className="fw-medium">Frontend</td><td>React 18 + Bootstrap 5</td></tr>
                <tr><td className="fw-medium">Backend</td><td>Procedural PHP 8.x + MySQLi</td></tr>
                <tr><td className="fw-medium">Database</td><td>MySQL 8.0 (simulated with localStorage)</td></tr>
                <tr><td className="fw-medium">Installation Status</td><td><span className="badge bg-success">Installed</span></td></tr>
                <tr><td className="fw-medium">Last Updated</td><td>{new Date().toLocaleDateString()}</td></tr>
                <tr><td className="fw-medium">License</td><td>Commercial - Active</td></tr>
                <tr><td className="fw-medium">Server</td><td>Apache/Nginx Compatible</td></tr>
                <tr><td className="fw-medium">PHP Version Required</td><td>&gt;= 8.0</td></tr>
                <tr><td className="fw-medium">MySQL Version Required</td><td>&gt;= 5.7</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === 'backup' && (
        <div className="card table-card">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Backup & Data Management</h6>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 border rounded">
                  <h6><i className="bi bi-download me-2 text-primary"></i>Export Data</h6>
                  <p className="small text-muted">Download all your data as a JSON file for backup purposes.</p>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => {
                    const data = { customers: JSON.parse(localStorage.getItem('bizai_customers') || '[]'), quotations: JSON.parse(localStorage.getItem('bizai_quotations') || '[]'), invoices: JSON.parse(localStorage.getItem('bizai_invoices') || '[]'), followUps: JSON.parse(localStorage.getItem('bizai_followups') || '[]') };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = `bizai-backup-${new Date().toISOString().split('T')[0]}.json`;
                    a.click(); URL.revokeObjectURL(url);
                  }}>
                    <i className="bi bi-file-earmark-arrow-down me-1"></i>Export Backup
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded">
                  <h6><i className="bi bi-upload me-2 text-success"></i>Import Data</h6>
                  <p className="small text-muted">Restore data from a previously exported backup file.</p>
                  <button className="btn btn-outline-success btn-sm" onClick={() => alert('Import functionality: In production, this would upload and parse a JSON backup file.')}>
                    <i className="bi bi-file-earmark-arrow-up me-1"></i>Import Backup
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded">
                  <h6><i className="bi bi-arrow-repeat me-2 text-warning"></i>Upgrade System</h6>
                  <p className="small text-muted">Run the upgrade wizard to update to the latest version.</p>
                  <button className="btn btn-outline-warning btn-sm" onClick={() => { setShowWizard(true); setWizardStep(1); }}>
                    <i className="bi bi-arrow-repeat me-1"></i>Run Upgrade
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded">
                  <h6><i className="bi bi-trash me-2 text-danger"></i>Reset Data</h6>
                  <p className="small text-muted">Clear all data and reset to defaults. This cannot be undone.</p>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => { if (confirm('Are you sure? This will delete all data!')) { localStorage.clear(); window.location.reload(); } }}>
                    <i className="bi bi-trash me-1"></i>Reset All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="card table-card">
          <div className="card-body text-center py-5">
            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80, background: 'var(--primary-gradient)' }}>
              <i className="bi bi-lightning-charge-fill text-white" style={{ fontSize: '2rem' }}></i>
            </div>
            <h4 className="fw-bold">BizAI Pro</h4>
            <p className="text-muted">AI Business Assistant for SMEs</p>
            <p className="small text-muted">Version 2.1.0 | Built with React, Bootstrap & AI</p>
            <hr className="my-4" />
            <div className="row g-3 justify-content-center">
              <div className="col-md-3 text-center">
                <i className="bi bi-file-earmark-text fs-4 text-primary d-block mb-1"></i>
                <small>Quotations</small>
              </div>
              <div className="col-md-3 text-center">
                <i className="bi bi-receipt fs-4 text-success d-block mb-1"></i>
                <small>Invoices</small>
              </div>
              <div className="col-md-3 text-center">
                <i className="bi bi-people fs-4 text-info d-block mb-1"></i>
                <small>Customers</small>
              </div>
              <div className="col-md-3 text-center">
                <i className="bi bi-robot fs-4 text-warning d-block mb-1"></i>
                <small>AI Assistant</small>
              </div>
            </div>
            <hr className="my-4" />
            <p className="small text-muted mb-0">© 2026 BizAI Pro. All rights reserved.</p>
            <p className="small text-muted">Designed for small businesses, consultants, and agencies.</p>
          </div>
        </div>
      )}
    </div>
  );
}
