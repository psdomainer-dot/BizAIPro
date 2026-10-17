import React, { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    businessName: 'My Business',
    email: 'admin@mybusiness.com',
    phone: '+1 555-0100',
    address: '123 Business Ave, Suite 100',
    city: 'San Francisco',
    country: 'United States',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    dateFormat: 'YYYY-MM-DD',
    taxRate: 10,
    invoicePrefix: 'INV',
    quotePrefix: 'QT',
    autoReminders: true,
    emailNotifications: true,
    aiSuggestions: true,
    darkMode: false,
  });

  const tabs = [
    { id: 'general', label: 'General', icon: 'fas fa-building' },
    { id: 'billing', label: 'Billing & Tax', icon: 'fas fa-file-invoice-dollar' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'integrations', label: 'Integrations', icon: 'fas fa-plug' },
    { id: 'installation', label: 'Installation', icon: 'fas fa-download' },
  ];

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Settings</h4>
        <p className="text-muted mb-0">Configure your business assistant</p>
      </div>

      <div className="row g-4">
        {/* Sidebar Tabs */}
        <div className="col-lg-3">
          <div className="card-custom">
            <div className="p-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`btn w-100 text-start d-flex align-items-center gap-2 mb-1 ${activeTab === tab.id ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ justifyContent: 'flex-start' }}
                >
                  <i className={tab.icon} style={{ width: 20 }}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-9">
          <div className="card-custom">
            <div className="card-header">{tabs.find(t => t.id === activeTab)?.label}</div>
            <div className="p-4">
              {activeTab === 'general' && (
                <div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Business Name</label>
                      <input className="form-control" value={settings.businessName} onChange={e => setSettings(p => ({ ...p, businessName: e.target.value }))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={settings.email} onChange={e => setSettings(p => ({ ...p, email: e.target.value }))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input className="form-control" value={settings.phone} onChange={e => setSettings(p => ({ ...p, phone: e.target.value }))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Currency</label>
                      <select className="form-select" value={settings.currency} onChange={e => setSettings(p => ({ ...p, currency: e.target.value }))}>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Timezone</label>
                      <select className="form-select" value={settings.timezone} onChange={e => setSettings(p => ({ ...p, timezone: e.target.value }))}>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Date Format</label>
                      <select className="form-select" value={settings.dateFormat} onChange={e => setSettings(p => ({ ...p, dateFormat: e.target.value }))}>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input className="form-control mb-2" value={settings.address} onChange={e => setSettings(p => ({ ...p, address: e.target.value }))} />
                      <div className="row g-2">
                        <div className="col-md-6"><input className="form-control" placeholder="City" value={settings.city} onChange={e => setSettings(p => ({ ...p, city: e.target.value }))} /></div>
                        <div className="col-md-6"><input className="form-control" placeholder="Country" value={settings.country} onChange={e => setSettings(p => ({ ...p, country: e.target.value }))} /></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="btn btn-primary-custom">Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Tax Rate (%)</label>
                      <input type="number" className="form-control" value={settings.taxRate} onChange={e => setSettings(p => ({ ...p, taxRate: parseFloat(e.target.value) || 0 }))} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Invoice Prefix</label>
                      <input className="form-control" value={settings.invoicePrefix} onChange={e => setSettings(p => ({ ...p, invoicePrefix: e.target.value }))} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Quote Prefix</label>
                      <input className="form-control" value={settings.quotePrefix} onChange={e => setSettings(p => ({ ...p, quotePrefix: e.target.value }))} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h6>Payment Terms</h6>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Enable auto-reminders for overdue invoices</label>
                    </div>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Send payment receipts automatically</label>
                    </div>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Require deposits for quotations over $5,000</label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="btn btn-primary-custom">Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h6 className="mb-3">Email Notifications</h6>
                  {[
                    { label: 'New customer added', checked: true },
                    { label: 'Invoice paid', checked: true },
                    { label: 'Invoice overdue', checked: true },
                    { label: 'Quotation accepted/rejected', checked: true },
                    { label: 'Follow-up reminders', checked: true },
                    { label: 'Weekly summary report', checked: false },
                    { label: 'AI insights digest', checked: true },
                  ].map((item, idx) => (
                    <div key={idx} className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked={item.checked} />
                      <label className="form-check-label">{item.label}</label>
                    </div>
                  ))}
                  <h6 className="mb-3 mt-4">AI Features</h6>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">Enable AI-powered suggestions</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">Auto-generate follow-up reminders</label>
                  </div>
                  <div className="mt-4">
                    <button className="btn btn-primary-custom">Save Preferences</button>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div>
                  <p className="text-muted mb-4">Connect your favorite tools to streamline your workflow</p>
                  {[
                    { name: 'Stripe', desc: 'Accept online payments', icon: 'fab fa-stripe', connected: true, color: '#635bff' },
                    { name: 'Google Calendar', desc: 'Sync meetings & follow-ups', icon: 'fab fa-google', connected: true, color: '#4285f4' },
                    { name: 'Slack', desc: 'Get notifications in Slack', icon: 'fab fa-slack', connected: false, color: '#4a154b' },
                    { name: 'Zapier', desc: 'Connect 5000+ apps', icon: 'fas fa-bolt', connected: false, color: '#ff4a00' },
                    { name: 'Mailchimp', desc: 'Email marketing integration', icon: 'fas fa-envelope-open', connected: false, color: '#ffe01b' },
                  ].map((integration, idx) => (
                    <div key={idx} className="d-flex align-items-center justify-content-between p-3 border rounded mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: `${integration.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={integration.icon} style={{ color: integration.color }}></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">{integration.name}</h6>
                          <small className="text-muted">{integration.desc}</small>
                        </div>
                      </div>
                      <button className={`btn btn-sm ${integration.connected ? 'btn-outline-danger' : 'btn-outline-primary'}`}>
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'installation' && (
                <div>
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>System Information:</strong> BizAI Pro v2.1.0 • PHP 8.2 • MySQL 8.0 • Bootstrap 5.3
                  </div>
                  
                  <h6 className="mb-3">Installation Guide</h6>
                  <div className="p-3 bg-light rounded mb-4">
                    <ol className="mb-0">
                      <li className="mb-2">Download the installation package (ZIP file)</li>
                      <li className="mb-2">Upload files to your web server via FTP or cPanel</li>
                      <li className="mb-2">Create a MySQL database and user</li>
                      <li className="mb-2">Navigate to <code>yourdomain.com/install</code></li>
                      <li className="mb-2">Follow the installation wizard</li>
                      <li className="mb-0">Configure your business settings</li>
                    </ol>
                  </div>

                  <h6 className="mb-3">System Requirements</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="p-3 border rounded">
                        <h6 className="fw-bold"><i className="fas fa-server me-2"></i>Server</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '0.9rem' }}>
                          <li className="mb-1">✓ PHP 8.0 or higher</li>
                          <li className="mb-1">✓ MySQL 5.7+ / MariaDB 10.3+</li>
                          <li className="mb-1">✓ Apache/Nginx web server</li>
                          <li className="mb-1">✓ SSL certificate (recommended)</li>
                          <li>✓ Min 256MB RAM</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 border rounded">
                        <h6 className="fw-bold"><i className="fas fa-browser me-2"></i>PHP Extensions</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: '0.9rem' }}>
                          <li className="mb-1">✓ PDO / MySQLi</li>
                          <li className="mb-1">✓ cURL</li>
                          <li className="mb-1">✓ JSON</li>
                          <li className="mb-1">✓ OpenSSL</li>
                          <li>✓ Mbstring</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h6 className="mb-3">Upgrade</h6>
                  <div className="p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Current Version: 2.1.0</h6>
                        <small className="text-muted">Latest version: 2.1.0 (Up to date)</small>
                      </div>
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-sync me-1"></i>Check for Updates
                      </button>
                    </div>
                  </div>

                  <h6 className="mb-3 mt-4">Database Backup</h6>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-success"><i className="fas fa-download me-2"></i>Export Database</button>
                    <button className="btn btn-outline-warning"><i className="fas fa-upload me-2"></i>Import Database</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
