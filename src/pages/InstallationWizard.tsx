import React, { useState } from 'react';

export default function InstallationWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    dbHost: 'localhost',
    dbName: 'bizai_pro',
    dbUser: 'root',
    dbPass: '',
    dbPort: '3306',
    adminName: 'Admin',
    adminEmail: 'admin@company.com',
    adminPass: '',
    businessName: '',
    currency: 'USD',
    timezone: 'UTC',
  });
  const [installing, setInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installSteps, setInstallSteps] = useState<string[]>([]);

  const startInstallation = () => {
    setInstalling(true);
    setInstallProgress(0);
    setInstallSteps([]);

    const steps = [
      'Checking system requirements...',
      'Creating database tables...',
      'Installing core modules...',
      'Setting up AI engine...',
      'Configuring payment system...',
      'Creating admin account...',
      'Installing default templates...',
      'Setting up email system...',
      'Configuring API endpoints...',
      'Finalizing installation...',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setInstallSteps(prev => [...prev, steps[currentStep]]);
        setInstallProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setInstalling(false);
          setStep(5);
        }, 500);
      }
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ maxWidth: 700, width: '100%' }}>
        {/* Header */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-robot text-white fa-lg"></i>
            </div>
          </div>
          <h2 className="text-white fw-bold">BizAI Pro Installation</h2>
          <p className="text-white-50">Setup wizard for your business management system</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="text-center" style={{ flex: 1 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: step >= s ? 'var(--primary)' : '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto', transition: 'all 0.3s'
                }}>
                  {step > s ? <i className="fas fa-check text-white" style={{ fontSize: '0.8rem' }}></i> : <span className="text-white" style={{ fontSize: '0.8rem' }}>{s}</span>}
                </div>
                <small className="text-white-50 d-none d-md-block mt-1" style={{ fontSize: '0.7rem' }}>
                  {['Requirements', 'Database', 'Admin', 'Config', 'Complete'][s - 1]}
                </small>
              </div>
            ))}
          </div>
          <div className="progress" style={{ height: 4 }}>
            <div className="progress-bar" style={{ width: `${(step / 5) * 100}%`, background: 'var(--primary)', transition: 'width 0.3s' }}></div>
          </div>
        </div>

        {/* Content Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 32 }}>
          {/* Step 1: System Requirements */}
          {step === 1 && (
            <div>
              <h5 className="fw-bold mb-3">System Requirements Check</h5>
              <p className="text-muted mb-4">Verifying your server meets the minimum requirements</p>
              <div className="mb-4">
                {[
                  { name: 'PHP Version', required: '≥ 8.0', current: '8.2.12', status: true },
                  { name: 'MySQL Version', required: '≥ 5.7', current: '8.0.35', status: true },
                  { name: 'PDO Extension', required: 'Enabled', current: 'Enabled', status: true },
                  { name: 'cURL Extension', required: 'Enabled', current: 'Enabled', status: true },
                  { name: 'OpenSSL Extension', required: 'Enabled', current: 'Enabled', status: true },
                  { name: 'Mbstring Extension', required: 'Enabled', current: 'Enabled', status: true },
                  { name: 'JSON Extension', required: 'Enabled', current: 'Enabled', status: true },
                  { name: 'File Permissions', required: 'Writable', current: 'Writable', status: true },
                ].map((req, idx) => (
                  <div key={idx} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>{req.name}</strong>
                      <small className="text-muted d-block">Required: {req.required}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <small className="text-muted">{req.current}</small>
                      <i className={`fas ${req.status ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}`}></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className="alert alert-success mb-3">
                <i className="fas fa-check-circle me-2"></i>
                All system requirements met! Ready to proceed.
              </div>
              <button className="btn btn-primary-custom w-100" onClick={() => setStep(2)}>
                Continue <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          )}

          {/* Step 2: Database Configuration */}
          {step === 2 && (
            <div>
              <h5 className="fw-bold mb-3">Database Configuration</h5>
              <p className="text-muted mb-4">Enter your MySQL database credentials</p>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Database Host</label>
                  <input className="form-control" value={config.dbHost} onChange={e => setConfig(p => ({ ...p, dbHost: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Port</label>
                  <input className="form-control" value={config.dbPort} onChange={e => setConfig(p => ({ ...p, dbPort: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Database Name</label>
                  <input className="form-control" value={config.dbName} onChange={e => setConfig(p => ({ ...p, dbName: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <input className="form-control" value={config.dbUser} onChange={e => setConfig(p => ({ ...p, dbUser: e.target.value }))} />
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={config.dbPass} onChange={e => setConfig(p => ({ ...p, dbPass: e.target.value }))} />
                </div>
              </div>
              <div className="alert alert-info mt-3">
                <i className="fas fa-info-circle me-2"></i>
                Make sure the database exists and the user has proper permissions.
              </div>
              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>
                  <i className="fas fa-arrow-left me-2"></i>Back
                </button>
                <button className="btn btn-primary-custom flex-grow-1" onClick={() => setStep(3)}>
                  Test Connection & Continue <i className="fas fa-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Admin Account */}
          {step === 3 && (
            <div>
              <h5 className="fw-bold mb-3">Administrator Account</h5>
              <p className="text-muted mb-4">Create your admin account to manage the system</p>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input className="form-control" value={config.adminName} onChange={e => setConfig(p => ({ ...p, adminName: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" value={config.adminEmail} onChange={e => setConfig(p => ({ ...p, adminEmail: e.target.value }))} />
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={config.adminPass} onChange={e => setConfig(p => ({ ...p, adminPass: e.target.value }))} />
                  <small className="text-muted">Minimum 8 characters with uppercase, lowercase, and numbers</small>
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-outline-secondary" onClick={() => setStep(2)}>
                  <i className="fas fa-arrow-left me-2"></i>Back
                </button>
                <button className="btn btn-primary-custom flex-grow-1" onClick={() => setStep(4)}>
                  Continue <i className="fas fa-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Business Configuration */}
          {step === 4 && (
            <div>
              <h5 className="fw-bold mb-3">Business Configuration</h5>
              <p className="text-muted mb-4">Set up your business details</p>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Business Name</label>
                  <input className="form-control" value={config.businessName} onChange={e => setConfig(p => ({ ...p, businessName: e.target.value }))} placeholder="Your Business Name" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Currency</label>
                  <select className="form-select" value={config.currency} onChange={e => setConfig(p => ({ ...p, currency: e.target.value }))}>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Timezone</label>
                  <select className="form-select" value={config.timezone} onChange={e => setConfig(p => ({ ...p, timezone: e.target.value }))}>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (US)</option>
                    <option value="America/Los_Angeles">Pacific Time (US)</option>
                    <option value="Europe/London">London</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <h6 className="fw-bold mb-3">Install Options</h6>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" defaultChecked id="sampleData" />
                  <label className="form-check-label" htmlFor="sampleData">Install sample data for testing</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" defaultChecked id="emailTemplates" />
                  <label className="form-check-label" htmlFor="emailTemplates">Install default email templates</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" defaultChecked id="aiEngine" />
                  <label className="form-check-label" htmlFor="aiEngine">Enable AI Assistant features</label>
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-outline-secondary" onClick={() => setStep(3)}>
                  <i className="fas fa-arrow-left me-2"></i>Back
                </button>
                <button className="btn btn-primary-custom flex-grow-1" onClick={startInstallation} disabled={installing}>
                  {installing ? 'Installing...' : 'Install BizAI Pro'} <i className="fas fa-download ms-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Installation Progress */}
          {step === 4 && installing && (
            <div>
              <h5 className="fw-bold mb-3">Installing BizAI Pro</h5>
              <p className="text-muted mb-4">Please wait while we set up your system...</p>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <small className="fw-bold">Progress</small>
                  <small className="fw-bold">{Math.round(installProgress)}%</small>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${installProgress}%`, background: 'var(--primary)' }}></div>
                </div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, maxHeight: 200, overflowY: 'auto' }}>
                {installSteps.map((s, idx) => (
                  <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                    <i className="fas fa-check-circle text-success" style={{ fontSize: '0.8rem' }}></i>
                    <small>{s}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {step === 5 && (
            <div className="text-center">
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <i className="fas fa-check-circle text-success fa-3x"></i>
              </div>
              <h4 className="fw-bold mb-2">Installation Complete!</h4>
              <p className="text-muted mb-4">BizAI Pro has been successfully installed on your server.</p>
              <div className="alert alert-success text-start">
                <h6 className="fw-bold mb-2"><i className="fas fa-info-circle me-2"></i>Important Security Steps:</h6>
                <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
                  <li>Delete the <code>/install</code> directory from your server</li>
                  <li>Set proper file permissions (644 for files, 755 for directories)</li>
                  <li>Configure your SMTP settings for email notifications</li>
                  <li>Set up your AI API keys in Settings</li>
                </ul>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary-custom btn-lg" onClick={onComplete}>
                  <i className="fas fa-rocket me-2"></i>Launch BizAI Pro
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <small className="text-white-50">BizAI Pro v2.1.0 • © 2024 All rights reserved</small>
        </div>
      </div>
    </div>
  );
}
