import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: 'fas fa-file-invoice-dollar', title: 'Smart Quotations', desc: 'Create professional quotes with AI-powered pricing suggestions and auto-validity management.', color: '#4f46e5' },
    { icon: 'fas fa-file-invoice', title: 'Invoice Management', desc: 'Automated invoicing with payment tracking, overdue reminders, and multi-currency support.', color: '#10b981' },
    { icon: 'fas fa-users', title: 'Customer CRM', desc: 'Complete customer relationship management with interaction history and lead tracking.', color: '#06b6d4' },
    { icon: 'fas fa-tasks', title: 'Follow-up System', desc: 'Never miss a follow-up with smart scheduling, auto-reminders, and task prioritization.', color: '#f59e0b' },
    { icon: 'fas fa-chart-bar', title: 'Business Reports', desc: 'Real-time analytics, revenue forecasting, and AI-generated business insights.', color: '#ef4444' },
    { icon: 'fas fa-robot', title: 'AI Assistant', desc: 'Get intelligent recommendations, draft communications, and analyze your business data.', color: '#8b5cf6' },
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', role: 'Freelance Designer', text: 'BizAI Pro transformed how I manage my freelance business. The AI assistant alone saves me hours every week!', avatar: 'SM' },
    { name: 'James Rodriguez', role: 'Agency Owner', text: 'We went from spreadsheets to a complete business management system in one day. Our team loves it.', avatar: 'JR' },
    { name: 'Lisa Chen', role: 'Marketing Consultant', text: 'The quotation and invoicing features are incredible. Plus the AI suggestions have helped me win more clients.', avatar: 'LC' },
  ];

  const pricing = [
    { name: 'Starter', price: 29, features: ['25 customers', '50 quotes/mo', '50 invoices/mo', '20 AI credits', 'Email support'], popular: false },
    { name: 'Professional', price: 79, features: ['200 customers', 'Unlimited quotes', 'Unlimited invoices', '100 AI credits', 'Priority support', 'API access', 'Custom branding'], popular: true },
    { name: 'Enterprise', price: 199, features: ['Unlimited everything', '500 AI credits', '24/7 support', 'White-label', 'Custom integrations', 'SLA guarantee', 'Dedicated manager'], popular: false },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg fixed-top" style={{ background: scrollY > 50 ? 'rgba(30,41,59,0.95)' : 'transparent', backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none', transition: 'all 0.3s', padding: '12px 0' }}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#" style={{ color: '#fff' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-robot text-white"></i>
            </div>
            <span className="fw-bold fs-5">BizAI Pro</span>
          </a>
          <div className="d-flex align-items-center gap-3">
            <a href="#features" className="text-white text-decoration-none d-none d-md-inline" style={{ opacity: 0.8 }}>Features</a>
            <a href="#pricing" className="text-white text-decoration-none d-none d-md-inline" style={{ opacity: 0.8 }}>Pricing</a>
            <a href="#testimonials" className="text-white text-decoration-none d-none d-md-inline" style={{ opacity: 0.8 }}>Testimonials</a>
            <button className="btn btn-outline-light btn-sm" onClick={onEnter}>Login</button>
            <button className="btn btn-sm px-3" style={{ background: 'var(--primary)', color: '#fff', border: 'none' }} onClick={onEnter}>Get Started Free</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #312e81 60%, #1e1b4b 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated background elements */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite reverse' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 text-white">
              <div className="mb-3">
                <span className="badge px-3 py-2" style={{ background: 'rgba(79,70,229,0.3)', border: '1px solid rgba(79,70,229,0.5)', fontSize: '0.8rem' }}>
                  <i className="fas fa-sparkles me-1"></i> AI-Powered Business Management
                </span>
              </div>
              <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: 1.2 }}>
                Run Your Business<br />
                <span style={{ background: 'linear-gradient(135deg, #818cf8, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smarter with AI</span>
              </h1>
              <p className="lead mb-4" style={{ opacity: 0.8, fontSize: '1.1rem' }}>
                The all-in-one platform for small businesses, consultants, and agencies. 
                Manage quotations, invoices, customers, and get AI-powered insights — all in one place.
              </p>
              <div className="d-flex gap-3 flex-wrap mb-4">
                <button className="btn btn-lg px-4 py-3" style={{ background: 'var(--primary)', color: '#fff', borderRadius: 12, fontWeight: 600 }} onClick={onEnter}>
                  <i className="fas fa-rocket me-2"></i>Start Free Trial
                </button>
                <button className="btn btn-lg btn-outline-light px-4 py-3" style={{ borderRadius: 12 }}>
                  <i className="fas fa-play-circle me-2"></i>Watch Demo
                </button>
              </div>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex">
                  {['#4f46e5', '#10b981', '#f59e0b', '#ef4444'].map((c, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: '2px solid #1e293b', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-white" style={{ fontSize: '0.65rem', fontWeight: 700 }}>{['JD', 'SK', 'MR', 'AL'][i]}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <small className="text-white d-block" style={{ opacity: 0.9 }}><strong>2,500+</strong> businesses trust BizAI Pro</small>
                  <div className="d-flex gap-1">
                    {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star" style={{ color: '#f59e0b', fontSize: '0.7rem' }}></i>)}
                    <small className="text-white ms-1" style={{ opacity: 0.7 }}>4.9/5</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', padding: 24, backdropFilter: 'blur(10px)' }}>
                {/* Dashboard Preview */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></div>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }}></div>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }}></div>
                  <span className="text-white ms-2" style={{ fontSize: '0.75rem', opacity: 0.5 }}>BizAI Pro Dashboard</span>
                </div>
                <div className="row g-2 mb-3">
                  {[
                    { label: 'Revenue', value: '$14,200', change: '+12%', color: '#10b981' },
                    { label: 'Invoices', value: '24', change: '+3', color: '#4f46e5' },
                    { label: 'Clients', value: '48', change: '+5', color: '#06b6d4' },
                  ].map((stat, i) => (
                    <div key={i} className="col-4">
                      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 12 }}>
                        <small className="d-block" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>{stat.label}</small>
                        <strong className="text-white d-block" style={{ fontSize: '0.9rem' }}>{stat.value}</strong>
                        <small style={{ color: stat.color, fontSize: '0.65rem' }}>{stat.change}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 12 }}>
                  <small style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>Revenue Chart</small>
                  <div className="d-flex align-items-end gap-1 mt-2" style={{ height: 60 }}>
                    {[30, 50, 35, 70, 45, 80, 55, 90, 65, 85, 70, 95].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? 'var(--primary)' : 'rgba(79,70,229,0.3)', borderRadius: 3 }}></div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 d-flex align-items-center gap-2 p-2" style={{ background: 'rgba(79,70,229,0.2)', borderRadius: 10, border: '1px solid rgba(79,70,229,0.3)' }}>
                  <i className="fas fa-robot" style={{ color: '#818cf8' }}></i>
                  <small className="text-white" style={{ fontSize: '0.75rem' }}>AI: Revenue up 12% this month. Consider upselling TechCorp.</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </section>

      {/* Trusted By */}
      <section style={{ background: '#f8fafc', padding: '40px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container text-center">
          <small className="text-muted d-block mb-3">TRUSTED BY BUSINESSES WORLDWIDE</small>
          <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap" style={{ opacity: 0.4 }}>
            {['TechCorp', 'DesignStudio', 'Startup.io', 'MarketCo', 'ConsultPro'].map((name, i) => (
              <span key={i} className="fw-bold fs-5" style={{ color: '#64748b' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge px-3 py-2 mb-3" style={{ background: '#eef2ff', color: 'var(--primary)' }}>Features</span>
            <h2 className="display-5 fw-bold">Everything You Need to <span style={{ color: 'var(--primary)' }}>Grow</span></h2>
            <p className="text-muted lead">Powerful tools designed specifically for small businesses and consultants</p>
          </div>
          <div className="row g-4">
            {features.map((feature, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="p-4 h-100" style={{ borderRadius: 16, border: '1px solid #e2e8f0', transition: 'all 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${feature.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <i className={feature.icon} style={{ color: feature.color, fontSize: '1.3rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge px-3 py-2 mb-3" style={{ background: '#ecfdf5', color: '#10b981' }}>How It Works</span>
            <h2 className="display-5 fw-bold">Get Started in <span style={{ color: '#10b981' }}>Minutes</span></h2>
          </div>
          <div className="row g-4">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your account in seconds. No credit card required for the free trial.', icon: 'fas fa-user-plus' },
              { step: '02', title: 'Set Up Business', desc: 'Configure your business details, branding, and preferences with our wizard.', icon: 'fas fa-cog' },
              { step: '03', title: 'Add Customers', desc: 'Import existing contacts or add new ones. Our AI helps organize everything.', icon: 'fas fa-users' },
              { step: '04', title: 'Grow with AI', desc: 'Let AI analyze your data, suggest improvements, and automate routine tasks.', icon: 'fas fa-rocket' },
            ].map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative' }}>
                    <i className={item.icon} style={{ fontSize: '1.5rem', color: 'var(--primary)' }}></i>
                    <span style={{ position: 'absolute', top: -4, right: -4, width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: '#fff', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{idx + 1}</span>
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge px-3 py-2 mb-3" style={{ background: '#fef3c7', color: '#f59e0b' }}>Testimonials</span>
            <h2 className="display-5 fw-bold">Loved by <span style={{ color: '#f59e0b' }}>Businesses</span></h2>
          </div>
          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div key={idx} className="col-md-4">
                <div className="p-4 h-100" style={{ borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div className="d-flex gap-1 mb-3">
                    {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star" style={{ color: '#f59e0b', fontSize: '0.8rem' }}></i>)}
                  </div>
                  <p className="mb-4" style={{ fontSize: '0.95rem', color: '#475569' }}>"{t.text}"</p>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-white fw-bold" style={{ fontSize: '0.8rem' }}>{t.avatar}</span>
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>{t.name}</strong>
                      <small className="text-muted d-block">{t.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge px-3 py-2 mb-3" style={{ background: '#eef2ff', color: 'var(--primary)' }}>Pricing</span>
            <h2 className="display-5 fw-bold">Simple, Transparent <span style={{ color: 'var(--primary)' }}>Pricing</span></h2>
            <p className="text-muted lead">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {pricing.map((plan, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className={`p-5 h-100 text-center ${plan.popular ? 'border-primary' : ''}`} style={{ borderRadius: 20, background: '#fff', border: plan.popular ? '2px solid var(--primary)' : '1px solid #e2e8f0', position: 'relative', transition: 'all 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(79,70,229,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  {plan.popular && (
                    <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#fff', padding: '4px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Most Popular</span>
                  )}
                  <h5 className="fw-bold mb-2">{plan.name}</h5>
                  <div className="mb-4">
                    <span className="display-4 fw-bold">${plan.price}</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="list-unstyled text-start mb-4">
                    {plan.features.map((f, fIdx) => (
                      <li key={fIdx} className="mb-2 d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                        <i className="fas fa-check text-success"></i>{f}
                      </li>
                    ))}
                  </ul>
                  <button className={`btn w-100 py-2 ${plan.popular ? 'btn-primary-custom' : 'btn-outline-primary'}`} style={{ borderRadius: 10 }} onClick={onEnter}>
                    {plan.popular ? 'Start Free Trial' : 'Get Started'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #1e293b, #312e81)' }}>
        <div className="container text-center">
          <h2 className="display-5 fw-bold text-white mb-3">Ready to Transform Your Business?</h2>
          <p className="lead text-white mb-4" style={{ opacity: 0.8 }}>Join 2,500+ businesses already using BizAI Pro. Start your free trial today.</p>
          <button className="btn btn-lg px-5 py-3" style={{ background: '#fff', color: 'var(--primary)', borderRadius: 12, fontWeight: 600 }} onClick={onEnter}>
            <i className="fas fa-rocket me-2"></i>Get Started Free
          </button>
          <p className="text-white mt-3" style={{ opacity: 0.6, fontSize: '0.85rem' }}>No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '60px 0 30px' }}>
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-robot text-white" style={{ fontSize: '0.8rem' }}></i>
                </div>
                <span className="text-white fw-bold">BizAI Pro</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>The AI-powered business management platform for small businesses, consultants, and agencies.</p>
            </div>
            <div className="col-lg-2 col-md-4">
              <h6 className="text-white mb-3">Product</h6>
              <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a></li>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</a></li>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Integrations</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Changelog</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4">
              <h6 className="text-white mb-3">Company</h6>
              <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</a></li>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Blog</a></li>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Careers</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4">
              <h6 className="text-white mb-3">Support</h6>
              <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Help Center</a></li>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Documentation</a></li>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>API Reference</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Status</a></li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h6 className="text-white mb-3">Legal</h6>
              <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy</a></li>
                <li className="mb-2"><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Security</a></li>
              </ul>
            </div>
          </div>
          <hr style={{ borderColor: '#1e293b' }} />
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <small>© 2024 BizAI Pro. All rights reserved.</small>
            <div className="d-flex gap-3">
              <a href="#" style={{ color: '#94a3b8' }}><i className="fab fa-twitter"></i></a>
              <a href="#" style={{ color: '#94a3b8' }}><i className="fab fa-linkedin"></i></a>
              <a href="#" style={{ color: '#94a3b8' }}><i className="fab fa-github"></i></a>
              <a href="#" style={{ color: '#94a3b8' }}><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
