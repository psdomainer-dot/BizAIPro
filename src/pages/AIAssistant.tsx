import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function AIAssistant() {
  const { aiMessages, addAIMessage, subscription } = useAppContext();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const aiResponses: Record<string, string> = {
    'revenue': `📊 **Revenue Analysis**\n\nBased on your current data:\n\n• **Total Revenue (Paid):** $5,000\n• **Pending Invoices:** $4,000\n• **Overdue Amount:** $2,500\n\n**Recommendations:**\n1. Send a reminder for INV-2024-003 (Marketing Co.) which is overdue\n2. Follow up on INV-2024-002 (Design Studio) - sent 4 days ago\n3. Consider offering early payment discounts to improve cash flow\n\nWould you like me to draft a follow-up email for the overdue invoice?`,
    'customer': `👥 **Customer Insights**\n\nHere's your customer overview:\n\n• **Active Customers:** 3\n• **Leads:** 1 (Mike Chen - Startup.io)\n• **Inactive:** 1 (Wilson Consulting)\n\n**AI Recommendations:**\n1. 🎯 **Priority Lead:** Mike Chen from Startup.io has a $15,000 quotation pending - schedule a follow-up call this week\n2. 📧 **Re-engagement:** Robert Wilson hasn't been active since November - consider a "We miss you" campaign\n3. 💡 **Upsell Opportunity:** TechCorp Inc. accepted your web dev quote - they may need ongoing maintenance services\n\nShall I create follow-up tasks for these recommendations?`,
    'quotation': `📝 **Quotation Strategy**\n\nYour quotation performance:\n\n• **Total Quotes:** 4\n• **Accepted:** 1 (25% conversion rate)\n• **Pending:** 1 (QT-2024-002 to Design Studio)\n• **Draft:** 1 (QT-2024-003 for Startup.io - $15,000)\n• **Rejected:** 1\n\n**Tips to improve conversion:**\n1. Send QT-2024-003 ASAP - the longer a quote sits, the lower the conversion\n2. For the rejected Marketing Co. quote, consider asking for feedback\n3. Average quote value is $7,625 - competitive for your market\n\nWould you like me to help draft a follow-up for the pending quotation?`,
    'default': `I'd be happy to help with your business! Here are some things I can assist with:\n\n🔹 **Revenue Analysis** - Ask about your financial performance\n🔹 **Customer Insights** - Get recommendations for customer management\n🔹 **Quotation Help** - Tips to improve your quote conversion\n🔹 **Invoice Follow-ups** - Draft reminder emails\n🔹 **Business Strategy** - Get AI-powered business advice\n\nTry asking me something like:\n• "How's my revenue looking?"\n• "Which customers need attention?"\n• "Help me improve my quotation conversion"\n• "Draft a follow-up for overdue invoices"`
  };

  const getAIResponse = (message: string): string => {
    const lower = message.toLowerCase();
    if (lower.includes('revenue') || lower.includes('money') || lower.includes('income') || lower.includes('financial')) return aiResponses.revenue;
    if (lower.includes('customer') || lower.includes('client') || lower.includes('lead')) return aiResponses.customer;
    if (lower.includes('quot') || lower.includes('proposal') || lower.includes('bid')) return aiResponses.quotation;
    if (lower.includes('invoice') || lower.includes('payment') || lower.includes('overdue') || lower.includes('reminder')) {
      return `📧 **Invoice Follow-up Draft**\n\nHere's a professional reminder email for the overdue invoice:\n\n---\n**Subject:** Friendly Reminder - Invoice INV-2024-003\n\nDear Marketing Co.,\n\nI hope this message finds you well. I'm writing to kindly remind you that Invoice INV-2024-003 for $2,500 (Monthly Retainer) was due on March 1st, 2024.\n\nIf you've already processed the payment, please disregard this notice. Otherwise, we'd appreciate your prompt attention to this matter.\n\nPlease don't hesitate to reach out if you have any questions.\n\nBest regards,\nYour Business\n---\n\nWould you like me to adjust the tone or create reminders for other invoices?`;
    }
    if (lower.includes('help') || lower.includes('what can you')) return aiResponses.default;
    return `Great question! Based on your business data, here's what I can tell you:\n\n📈 You have **${aiMessages.length}** conversations in this session\n💼 You're managing **5 customers** with **4 active quotations**\n💰 Your total invoiced amount is **$17,000**\n\n**Quick Tip:** Your follow-up completion rate could be improved. You have ${aiMessages.length > 0 ? '4' : '5'} pending follow-ups that need attention this week.\n\nIs there something specific about your business you'd like me to analyze? I can help with:\n• Revenue optimization\n• Customer retention strategies\n• Pricing recommendations\n• Workflow automation suggestions`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addAIMessage({ role: 'user', content: input, timestamp: new Date() });
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(input);
      addAIMessage({ role: 'assistant', content: response, timestamp: new Date() });
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    "How's my revenue looking?",
    "Which customers need attention?",
    "Help me with overdue invoices",
    "Improve my quotation conversion"
  ];

  return (
    <div>
      <div className="row">
        <div className="col-lg-9">
          <div className="card-custom" style={{ height: 'calc(100vh - 180px)' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-robot text-white" style={{ fontSize: '0.8rem' }}></i>
                </div>
                <div>
                  <strong>BizAI Assistant</strong>
                  <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Powered by AI • {subscription.aiCredits} credits remaining</small>
                </div>
              </div>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => { }}>
                <i className="fas fa-redo"></i>
              </button>
            </div>
            
            {/* Messages */}
            <div className="ai-messages" style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
              {aiMessages.length === 0 && (
                <div className="text-center py-5">
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <i className="fas fa-robot text-white fa-2x"></i>
                  </div>
                  <h5>Hello! I'm your AI Business Assistant</h5>
                  <p className="text-muted mb-4">I can help you analyze your business data, draft communications, and provide strategic recommendations.</p>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {suggestions.map((s, i) => (
                      <button key={i} className="btn btn-sm btn-outline-primary" onClick={() => { setInput(s); }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {aiMessages.map((msg: any, idx: number) => (
                <div key={idx} className={`ai-message ${msg.role}`}>
                  <div className="avatar" style={{ background: msg.role === 'assistant' ? 'linear-gradient(135deg, #4f46e5, #06b6d4)' : '#64748b' }}>
                    <i className={`fas ${msg.role === 'assistant' ? 'fa-robot' : 'fa-user'} text-white`} style={{ fontSize: '0.8rem' }}></i>
                  </div>
                  <div className="bubble" style={{ whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="ai-message assistant">
                  <div className="avatar" style={{ background: 'linear-gradient(135deg, #4f46e5, #06b6d4)' }}>
                    <i className="fas fa-robot text-white" style={{ fontSize: '0.8rem' }}></i>
                  </div>
                  <div className="bubble">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}
            <div className="p-3 border-top">
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask me anything about your business..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                />
                <button className="btn btn-primary-custom" onClick={handleSend} disabled={!input.trim()}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-3">
          <div className="card-custom mb-3">
            <div className="card-header">AI Capabilities</div>
            <div className="p-3">
              {[
                { icon: 'fas fa-chart-line', label: 'Revenue Analysis', desc: 'Financial insights & trends' },
                { icon: 'fas fa-users', label: 'Customer Intelligence', desc: 'Behavior & retention tips' },
                { icon: 'fas fa-file-alt', label: 'Document Drafting', desc: 'Emails, proposals, reports' },
                { icon: 'fas fa-lightbulb', label: 'Business Strategy', desc: 'Growth recommendations' },
                { icon: 'fas fa-tasks', label: 'Task Automation', desc: 'Workflow optimization' },
              ].map((item, idx) => (
                <div key={idx} className="d-flex align-items-center gap-2 mb-3">
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={item.icon} style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i>
                  </div>
                  <div>
                    <small className="fw-bold d-block">{item.label}</small>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>{item.desc}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-custom">
            <div className="card-header">Quick Prompts</div>
            <div className="p-3">
              {suggestions.map((s, i) => (
                <button key={i} className="btn btn-sm btn-outline-secondary w-100 mb-2 text-start" onClick={() => setInput(s)}>
                  <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.6rem' }}></i>{s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
