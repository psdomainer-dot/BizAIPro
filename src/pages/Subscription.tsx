import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['5 Customers', '3 Quotations/month', '3 Invoices/month', '5 AI credits/month', 'Basic reports', 'Email support'],
    limits: { customers: 5, quotations: 3, invoices: 3, aiCredits: 5 }
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: '/month',
    description: 'For growing small businesses',
    features: ['25 Customers', 'Unlimited Quotations', 'Unlimited Invoices', '100 AI credits/month', 'Advanced reports', 'Customer follow-ups', 'Priority email support'],
    limits: { customers: 25, quotations: -1, invoices: -1, aiCredits: 100 },
    popular: true
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    period: '/month',
    description: 'For consultants & agencies',
    features: ['Unlimited Customers', 'Unlimited Quotations', 'Unlimited Invoices', '500 AI credits/month', 'Custom reports', 'Team collaboration', 'API access', 'Phone support', 'White-label invoices'],
    limits: { customers: -1, quotations: -1, invoices: -1, aiCredits: 500 }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: '/month',
    description: 'For large organizations',
    features: ['Everything in Professional', 'Unlimited AI credits', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'On-premise option', 'Advanced security', 'Training sessions', 'Multi-user access'],
    limits: { customers: -1, quotations: -1, invoices: -1, aiCredits: -1 }
  }
];

export default function Subscription() {
  const { subscription, updateSubscription } = useApp();
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSubscribe = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      updateSubscription({
        plan: planId as any,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + (billingCycle === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        aiCreditsUsed: 0,
        aiCreditsLimit: plan.limits.aiCredits === -1 ? 9999 : plan.limits.aiCredits
      });
      setShowConfirm(null);
      alert(`Successfully subscribed to ${plan.name} plan!`);
    }
  };

  const getPrice = (price: number) => {
    if (billingCycle === 'annual') return Math.round(price * 0.8);
    return price;
  };

  return (
    <div>
      <div className="text-center mb-5">
        <h4 className="fw-bold mb-2">Choose Your Plan</h4>
        <p className="text-muted">Scale your business with the right plan. Upgrade or downgrade anytime.</p>
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <span className={billingCycle === 'monthly' ? 'fw-bold' : 'text-muted'}>Monthly</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={billingCycle === 'annual'} onChange={() => setBillingCycle(b => b === 'monthly' ? 'annual' : 'monthly')} />
          </div>
          <span className={billingCycle === 'annual' ? 'fw-bold' : 'text-muted'}>Annual <span className="badge bg-success">Save 20%</span></span>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="card mb-4 border-primary">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">Current Plan</small>
            <h5 className="mb-0 fw-bold text-capitalize">{subscription.plan}</h5>
          </div>
          <div className="text-end">
            <small className="text-muted">Status</small>
            <div><span className={`badge bg-${subscription.status === 'active' ? 'success' : 'secondary'} badge-status`}>{subscription.status}</span></div>
          </div>
          <div className="text-end">
            <small className="text-muted">Renews</small>
            <div className="fw-medium">{subscription.endDate}</div>
          </div>
          <div>
            <small className="text-muted">AI Credits</small>
            <div className="fw-medium">{subscription.aiCreditsUsed}/{subscription.aiCreditsLimit === 9999 ? '∞' : subscription.aiCreditsLimit}</div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="row g-4">
        {plans.map(plan => (
          <div key={plan.id} className="col-md-6 col-xl-3">
            <div className={`pricing-card h-100 ${plan.popular ? 'popular' : ''} ${subscription.plan === plan.id ? 'border-primary' : ''}`}>
              {subscription.plan === plan.id && (
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-primary">Current</span>
                </div>
              )}
              <h5 className="fw-bold mb-1">{plan.name}</h5>
              <p className="text-muted small mb-3">{plan.description}</p>
              <div className="mb-3">
                <span className="display-5 fw-bold">${getPrice(plan.price)}</span>
                {plan.price > 0 && <span className="text-muted">{plan.period}</span>}
                {billingCycle === 'annual' && plan.price > 0 && <div><small className="text-success">Billed annually</small></div>}
              </div>
              <ul className="list-unstyled text-start mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-check-circle-fill text-success"></i>
                    <small>{feature}</small>
                  </li>
                ))}
              </ul>
              <button
                className={`btn w-100 ${subscription.plan === plan.id ? 'btn-outline-primary' : 'btn-primary'}`}
                onClick={() => {
                  if (subscription.plan === plan.id) return;
                  setShowConfirm(plan.id);
                }}
                disabled={subscription.plan === plan.id}
              >
                {subscription.plan === plan.id ? 'Current Plan' : 'Subscribe'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-5">
        <h5 className="fw-bold text-center mb-4">Frequently Asked Questions</h5>
        <div className="row g-4 justify-content-center">
          <div className="col-md-6">
            <div className="card stat-card">
              <div className="card-body">
                <h6 className="fw-bold"><i className="bi bi-question-circle me-2 text-primary"></i>Can I change plans anytime?</h6>
                <p className="text-muted small mb-0">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card stat-card">
              <div className="card-body">
                <h6 className="fw-bold"><i className="bi bi-question-circle me-2 text-primary"></i>What are AI credits?</h6>
                <p className="text-muted small mb-0">AI credits are used each time you interact with the AI Assistant. Each message exchange uses 1 credit. Credits reset monthly based on your plan.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card stat-card">
              <div className="card-body">
                <h6 className="fw-bold"><i className="bi bi-question-circle me-2 text-primary"></i>Is there a free trial?</h6>
                <p className="text-muted small mb-0">Our Free plan lets you try the core features indefinitely. When you're ready for more, upgrade to a paid plan for additional capabilities.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card stat-card">
              <div className="card-body">
                <h6 className="fw-bold"><i className="bi bi-question-circle me-2 text-primary"></i>What payment methods do you accept?</h6>
                <p className="text-muted small mb-0">We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Subscription</h5>
                <button className="btn-close" onClick={() => setShowConfirm(null)}></button>
              </div>
              <div className="modal-body text-center">
                <i className="bi bi-gem fs-1 text-primary d-block mb-3"></i>
                <h6>Subscribe to <strong className="text-capitalize">{plans.find(p => p.id === showConfirm)?.name}</strong> plan?</h6>
                <p className="text-muted">
                  ${getPrice(plans.find(p => p.id === showConfirm)?.price || 0)} {billingCycle === 'annual' ? '/month (billed annually)' : '/month'}
                </p>
                <p className="small text-muted">You can cancel anytime. No long-term commitment.</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleSubscribe(showConfirm)}>Confirm & Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
