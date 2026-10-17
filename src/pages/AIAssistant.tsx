import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const aiResponses: Record<string, string> = {
  'quotation': 'Based on your recent quotation data:\n\n• You have 3 active quotations totaling $36,000\n• Q-002 (Brand Identity) has been accepted - great job!\n• Q-001 (Website Redesign) was sent and is awaiting response\n• Q-003 (Mobile App) is still in draft\n\n💡 Tip: Follow up on Q-001 within 48 hours to increase conversion chances. Studies show quotations followed up within 2 days have 3x higher acceptance rates.',
  'invoice': 'Here\'s your invoice summary:\n\n• Total invoiced: $7,700\n• Paid: $3,500 (45.5%)\n• Pending: $1,200\n• Overdue: $3,000 (INV-003)\n\n⚠️ Action needed: INV-003 for John Smith ($3,000) is overdue since Jan 10. I recommend sending a payment reminder today.\n\n💡 Tip: Set up automatic payment reminders 3 days before due date and on the due date to reduce overdue invoices by up to 40%.',
  'customer': 'Customer insights:\n\n• 3 active customers, 1 lead, 1 inactive\n• Your most engaged customer: Emily Davis (Retail Plus) - monthly maintenance\n• New lead: Mike Chen (Startup.io) - needs mobile app ($20K opportunity)\n\n📊 Recommendation: Robert Wilson has been inactive since Dec 28. Consider reaching out with a special offer or project update to re-engage.\n\n💡 Tip: Schedule quarterly check-ins with all clients to maintain relationships and identify upsell opportunities.',
  'report': 'Business Performance Summary (January):\n\n📈 Revenue: $8,400 (+38% vs December)\n💰 Profit Margin: ~64%\n👥 New Customers: 2\n📋 Quotations Sent: 3\n✅ Conversion Rate: 33%\n\nTop performing service: Web Development\nAverage project value: $5,833\n\n🎯 Goal tracking: You\'re on track to exceed Q1 targets by 15% if current trends continue.',
  'email': 'Here\'s a professional follow-up email template:\n\n---\nSubject: Following Up on [Project Name] Proposal\n\nDear [Client Name],\n\nI hope this email finds you well. I wanted to follow up on the proposal I sent on [date] for [project name].\n\nI understand you may need time to review, but I wanted to ensure you have everything you need and address any questions that might have come up.\n\nThe proposal is valid until [date], and I\'m happy to discuss any adjustments to better fit your needs.\n\nWould you be available for a quick call this week?\n\nBest regards,\n[Your Name]\n---\n\n💡 Tip: Personalize the email with specific details from your last conversation to increase response rates by 25%.',
  'help': 'I can help you with:\n\n📋 **Quotations** - "Show quotation summary" or "Help me create a quotation"\n💰 **Invoices** - "Invoice status" or "Who owes me money?"\n👥 **Customers** - "Customer insights" or "Who needs follow-up?"\n📊 **Reports** - "Show me my business report" or "How am I performing?"\n✉️ **Emails** - "Draft a follow-up email" or "Write a proposal"\n💡 **Advice** - "Business tips" or "How to improve conversion"\n\nJust type naturally and I\'ll assist you!',
  'default': 'I understand you\'re asking about that. Let me analyze your business data to provide relevant insights.\n\nBased on your current situation:\n• You have opportunities worth $36,000 in your pipeline\n• Your collection rate could improve (currently 45.5%)\n• There are 3 pending follow-ups that need attention\n\nWould you like me to dive deeper into any specific area? I can help with quotations, invoices, customer management, reports, or drafting communications.'
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('quotation') || lower.includes('quote') || lower.includes('proposal')) return aiResponses['quotation'];
  if (lower.includes('invoice') || lower.includes('payment') || lower.includes('money') || lower.includes('owe')) return aiResponses['invoice'];
  if (lower.includes('customer') || lower.includes('client') || lower.includes('follow') || lower.includes('contact')) return aiResponses['customer'];
  if (lower.includes('report') || lower.includes('performance') || lower.includes('revenue') || lower.includes('analytics')) return aiResponses['report'];
  if (lower.includes('email') || lower.includes('draft') || lower.includes('write') || lower.includes('template')) return aiResponses['email'];
  if (lower.includes('help') || lower.includes('what can') || lower.includes('how')) return aiResponses['help'];
  return aiResponses['default'];
}

export default function AIAssistant() {
  const { chatMessages, addChatMessage, clearChat, subscription, updateSubscription } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (subscription.aiCreditsUsed >= subscription.aiCreditsLimit) {
      alert('You have used all your AI credits for this period. Please upgrade your plan or wait for credits to reset.');
      return;
    }

    const userMessage = { id: String(Date.now()), role: 'user' as const, content: input, timestamp: new Date().toISOString() };
    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);
    updateSubscription({ aiCreditsUsed: subscription.aiCreditsUsed + 1 });

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(input);
      addChatMessage({ id: String(Date.now() + 1), role: 'assistant', content: response, timestamp: new Date().toISOString() });
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const suggestions = [
    'Show quotation summary',
    'Invoice status',
    'Customer insights',
    'Draft a follow-up email',
    'Business performance report'
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-1">AI Business Assistant</h5>
          <p className="text-muted small mb-0">Get intelligent insights and recommendations for your business</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={clearChat}>
          <i className="bi bi-arrow-clockwise"></i> Reset Chat
        </button>
      </div>

      <div className="card table-card">
        <div className="ai-chat-container">
          {/* Messages */}
          <div className="chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                <div className={`chat-message ${msg.role}`}>
                  {msg.role === 'assistant' && <div className="d-flex align-items-center gap-1 mb-1"><i className="bi bi-robot"></i><small className="fw-bold">AI Assistant</small></div>}
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
                  <small className={`d-block mt-1 ${msg.role === 'user' ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="d-flex justify-content-start mb-3">
                <div className="chat-message assistant">
                  <div className="d-flex align-items-center gap-2">
                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                    <small>AI is thinking...</small>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {chatMessages.length <= 1 && (
            <div className="px-3 pb-2">
              <small className="text-muted d-block mb-2">Quick suggestions:</small>
              <div className="d-flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} className="btn btn-sm btn-outline-primary rounded-pill" onClick={() => setInput(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="chat-input-area">
            <form onSubmit={handleSend} className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Ask me anything about your business..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" className="btn btn-primary px-3" disabled={!input.trim() || isTyping}>
                <i className="bi bi-send"></i>
              </button>
            </form>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-muted">
                <i className="bi bi-lightning-charge"></i> {subscription.aiCreditsLimit - subscription.aiCreditsUsed} credits remaining
              </small>
              <small className="text-muted">Powered by BizAI</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
