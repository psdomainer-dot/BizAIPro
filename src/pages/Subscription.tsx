import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Subscription() {
  const { subscription } = useAppContext();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? 29 : 290,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Perfect for freelancers and solo consultants',
      features: [
        'Up to 25 customers',
        '50 quotations/month',
        '50 invoices/month',
        'Basic AI Assistant (20 credits)',
        'Email support',
        '1 user account',
      ],
      featured: false,
      cta: 'Current Plan'
    },
    {
      name: 'Professional',
      price: billingPeriod === 'monthly' ? 79 : 790,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Ideal for growing businesses and agencies',
      features: [
        'Up to 200 customers',
        'Unlimited quotations',
        'Unlimited invoices',
        'Advanced AI Assistant (100 credits)',
        'Priority support',
        '5 user accounts',
        'Custom branding',
        'API access',
      ],
      featured: true,
      cta: 'Current Plan'
    },
    {
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 199 : 1990,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'For large teams and established businesses',
      features: [
        'Unlimited customers',
        'Unlimited quotations',
        'Unlimited invoices',
        'Premium AI Assistant (500 credits)',
        '24/7 dedicated support',
        'Unlimited users',
        'Custom integrations',
        'White-label option',
        'SLA guarantee',
        'Advanced analytics',
      ],
      featured: false,
      cta: 'Upgrade'
    }
  ];

  const addons = [
    { name: 'Extra AI Credits (50)', price: 10, description: 'Additional AI assistant credits' },
    { name: 'Custom Domain', price: 5, description: 'Use your own domain' },
    { name: 'Advanced Reports', price: 15, description: 'Detailed analytics & forecasting' },
    { name: 'Payment Gateway', price: 20, description: 'Accept payments directly' },
  ];

  return (
    <div>
      <div className="text-center mb-5">
        <h4 className="fw-bold mb-2">Choose Your Plan</h4>
        <p className="text-muted">Scale your business with the right tools and AI assistance</p>
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <span className={billingPeriod === 'monthly' ? 'fw-bold' : 'text-muted'}>Monthly</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={billingPeriod === 'yearly'} onChange={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')} />
          </div>
          <span className={billingPeriod === 'yearly' ? 'fw-bold' : 'text-muted'}>Yearly <span className="badge bg-success">Save 17%</span></span>
        </div>
      </div>

      {/* Plans */}
      <div className="row g-4 mb-5">
        {plans.map((plan, idx) => (
          <div key={idx} className="col-lg-4">
            <div className={`pricing-card ${plan.featured ? 'featured' : ''} ${plan.name === subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) ? 'border-primary' : ''}`}>
              <h5 className="fw-bold mb-2">{plan.name}</h5>
              <p className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>{plan.description}</p>
              <div className="mb-4">
                <span className="display-5 fw-bold">${plan.price}</span>
                <span className="text-muted">{plan.period}</span>
              </div>
              <ul className="list-unstyled text-start mb-4">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="mb-2 d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
                    <i className="fas fa-check-circle text-success"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`btn w-100 ${plan.featured ? 'btn-primary-custom' : 'btn-outline-primary'}`}>
                {plan.name === 'Professional' ? '✓ Current Plan' : plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Current Usage */}
      <div className="card-custom mb-4">
        <div className="card-header">Current Usage & Billing</div>
        <div className="p-4">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <h6 className="fw-bold mb-3">AI Credits</h6>
                <div className="d-flex justify-content-between mb-2">
                  <small>Used: {subscription.maxCredits - subscription.aiCredits}</small>
                  <small>Remaining: {subscription.aiCredits}</small>
                </div>
                <div className="progress mb-2" style={{ height: 10 }}>
                  <div className="progress-bar" style={{ width: `${(subscription.aiCredits / subscription.maxCredits) * 100}%`, background: 'var(--primary)' }}></div>
                </div>
                <small className="text-muted">{subscription.maxCredits} credits/month on Professional plan</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <h6 className="fw-bold mb-3">Subscription Details</h6>
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">Plan</small>
                  <small className="fw-bold">Professional</small>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">Billing</small>
                  <small className="fw-bold">Monthly</small>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">Next billing</small>
                  <small className="fw-bold">Apr 15, 2024</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Amount</small>
                  <small className="fw-bold">$79.00</small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <h6 className="fw-bold mb-3">Payment Method</h6>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div style={{ width: 48, height: 32, borderRadius: 4, background: '#1a1f71', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-white fw-bold" style={{ fontSize: '0.6rem' }}>VISA</span>
                  </div>
                  <div>
                    <small className="d-block fw-bold">•••• •••• •••• 4242</small>
                    <small className="text-muted">Expires 12/25</small>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline-primary w-100">Update Payment</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div className="card-custom">
        <div className="card-header">Add-ons & Upgrades</div>
        <div className="p-4">
          <div className="row g-3">
            {addons.map((addon, idx) => (
              <div key={idx} className="col-md-6">
                <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                  <div>
                    <h6 className="mb-1 fw-bold">{addon.name}</h6>
                    <small className="text-muted">{addon.description}</small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">${addon.price}/mo</div>
                    <button className="btn btn-sm btn-outline-primary mt-1">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
