import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'lead';
  lastContact: string;
  notes: string;
  createdAt: string;
}

export interface Quotation {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  items: QuotationItem[];
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  validUntil: string;
  createdAt: string;
}

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  quotationId?: string;
  items: QuotationItem[];
  total: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  createdAt: string;
  paidAt?: string;
}

export interface FollowUp {
  id: string;
  customerId: string;
  customerName: string;
  type: 'call' | 'email' | 'meeting' | 'task';
  subject: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Subscription {
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  aiCreditsUsed: number;
  aiCreditsLimit: number;
}

interface AppContextType {
  customers: Customer[];
  quotations: Quotation[];
  invoices: Invoice[];
  followUps: FollowUp[];
  chatMessages: ChatMessage[];
  subscription: Subscription;
  isInstalled: boolean;
  companyInfo: { name: string; email: string; phone: string; address: string };
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addQuotation: (quotation: Quotation) => void;
  updateQuotation: (id: string, quotation: Partial<Quotation>) => void;
  deleteQuotation: (id: string) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  addFollowUp: (followUp: FollowUp) => void;
  updateFollowUp: (id: string, followUp: Partial<FollowUp>) => void;
  deleteFollowUp: (id: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  updateSubscription: (sub: Partial<Subscription>) => void;
  setIsInstalled: (val: boolean) => void;
  setCompanyInfo: (info: { name: string; email: string; phone: string; address: string }) => void;
}

const defaultCustomers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john@techcorp.com', phone: '+1 555-0101', company: 'TechCorp Inc.', status: 'active', lastContact: '2026-01-15', notes: 'Interested in web development services', createdAt: '2025-12-01' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@designstudio.com', phone: '+1 555-0102', company: 'Design Studio', status: 'active', lastContact: '2026-01-18', notes: 'Rebranding project ongoing', createdAt: '2025-11-15' },
  { id: '3', name: 'Mike Chen', email: 'mike@startup.io', phone: '+1 555-0103', company: 'Startup.io', status: 'lead', lastContact: '2026-01-10', notes: 'New lead - needs mobile app', createdAt: '2026-01-05' },
  { id: '4', name: 'Emily Davis', email: 'emily@retail.com', phone: '+1 555-0104', company: 'Retail Plus', status: 'active', lastContact: '2026-01-20', notes: 'E-commerce platform maintenance', createdAt: '2025-10-20' },
  { id: '5', name: 'Robert Wilson', email: 'robert@consulting.com', phone: '+1 555-0105', company: 'Wilson Consulting', status: 'inactive', lastContact: '2025-12-28', notes: 'Project completed, follow up for new work', createdAt: '2025-09-10' },
];

const defaultQuotations: Quotation[] = [
  { id: 'Q-001', customerId: '1', customerName: 'John Smith - TechCorp Inc.', title: 'Website Redesign', items: [{ id: '1', description: 'UI/UX Design', quantity: 1, unitPrice: 3500, total: 3500 }, { id: '2', description: 'Frontend Development', quantity: 1, unitPrice: 5000, total: 5000 }, { id: '3', description: 'Backend Integration', quantity: 1, unitPrice: 4000, total: 4000 }], total: 12500, status: 'sent', validUntil: '2026-02-15', createdAt: '2026-01-10' },
  { id: 'Q-002', customerId: '2', customerName: 'Sarah Johnson - Design Studio', title: 'Brand Identity Package', items: [{ id: '1', description: 'Logo Design', quantity: 1, unitPrice: 2000, total: 2000 }, { id: '2', description: 'Brand Guidelines', quantity: 1, unitPrice: 1500, total: 1500 }], total: 3500, status: 'accepted', validUntil: '2026-02-01', createdAt: '2026-01-05' },
  { id: 'Q-003', customerId: '3', customerName: 'Mike Chen - Startup.io', title: 'Mobile App Development', items: [{ id: '1', description: 'App Design', quantity: 1, unitPrice: 4000, total: 4000 }, { id: '2', description: 'iOS Development', quantity: 1, unitPrice: 8000, total: 8000 }, { id: '3', description: 'Android Development', quantity: 1, unitPrice: 8000, total: 8000 }], total: 20000, status: 'draft', validUntil: '2026-03-01', createdAt: '2026-01-18' },
];

const defaultInvoices: Invoice[] = [
  { id: 'INV-001', customerId: '2', customerName: 'Sarah Johnson - Design Studio', quotationId: 'Q-002', items: [{ id: '1', description: 'Logo Design', quantity: 1, unitPrice: 2000, total: 2000 }, { id: '2', description: 'Brand Guidelines', quantity: 1, unitPrice: 1500, total: 1500 }], total: 3500, status: 'paid', dueDate: '2026-02-01', createdAt: '2026-01-06', paidAt: '2026-01-12' },
  { id: 'INV-002', customerId: '4', customerName: 'Emily Davis - Retail Plus', items: [{ id: '1', description: 'Monthly Maintenance', quantity: 1, unitPrice: 1200, total: 1200 }], total: 1200, status: 'pending', dueDate: '2026-02-15', createdAt: '2026-01-20' },
  { id: 'INV-003', customerId: '1', customerName: 'John Smith - TechCorp Inc.', items: [{ id: '1', description: 'Consulting Hours (20h)', quantity: 20, unitPrice: 150, total: 3000 }], total: 3000, status: 'overdue', dueDate: '2026-01-10', createdAt: '2025-12-28' },
];

const defaultFollowUps: FollowUp[] = [
  { id: '1', customerId: '1', customerName: 'John Smith', type: 'call', subject: 'Follow up on quotation Q-001', description: 'Check if they have questions about the website redesign proposal', dueDate: '2026-01-22', status: 'pending', createdAt: '2026-01-18' },
  { id: '2', customerId: '3', customerName: 'Mike Chen', type: 'email', subject: 'Send mobile app proposal', description: 'Send the detailed mobile app development quotation', dueDate: '2026-01-25', status: 'pending', createdAt: '2026-01-19' },
  { id: '3', customerId: '4', customerName: 'Emily Davis', type: 'meeting', subject: 'Monthly review meeting', description: 'Discuss Q1 roadmap and new features', dueDate: '2026-01-28', status: 'pending', createdAt: '2026-01-20' },
  { id: '4', customerId: '5', customerName: 'Robert Wilson', type: 'task', subject: 'Send project completion report', description: 'Prepare and send the final project report', dueDate: '2026-01-20', status: 'completed', createdAt: '2026-01-15' },
];

const defaultChatMessages: ChatMessage[] = [
  { id: '1', role: 'assistant', content: 'Hello! I\'m your AI Business Assistant. I can help you with:\n\n• Creating quotations and invoices\n• Managing customer relationships\n• Analyzing your business reports\n• Drafting professional emails\n• Providing business insights\n\nHow can I help you today?', timestamp: new Date().toISOString() },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('bizai_customers');
    return saved ? JSON.parse(saved) : defaultCustomers;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem('bizai_quotations');
    return saved ? JSON.parse(saved) : defaultQuotations;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('bizai_invoices');
    return saved ? JSON.parse(saved) : defaultInvoices;
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    const saved = localStorage.getItem('bizai_followups');
    return saved ? JSON.parse(saved) : defaultFollowUps;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('bizai_chat');
    return saved ? JSON.parse(saved) : defaultChatMessages;
  });

  const [subscription, setSubscription] = useState<Subscription>(() => {
    const saved = localStorage.getItem('bizai_subscription');
    return saved ? JSON.parse(saved) : { plan: 'starter', status: 'active', startDate: '2026-01-01', endDate: '2026-02-01', aiCreditsUsed: 23, aiCreditsLimit: 100 };
  });

  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    return localStorage.getItem('bizai_installed') === 'true';
  });

  const [companyInfo, setCompanyInfo] = useState(() => {
    const saved = localStorage.getItem('bizai_company');
    return saved ? JSON.parse(saved) : { name: 'My Business', email: 'info@mybusiness.com', phone: '+1 555-0000', address: '123 Business St, City' };
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('bizai_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('bizai_quotations', JSON.stringify(quotations)); }, [quotations]);
  useEffect(() => { localStorage.setItem('bizai_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('bizai_followups', JSON.stringify(followUps)); }, [followUps]);
  useEffect(() => { localStorage.setItem('bizai_chat', JSON.stringify(chatMessages)); }, [chatMessages]);
  useEffect(() => { localStorage.setItem('bizai_subscription', JSON.stringify(subscription)); }, [subscription]);
  useEffect(() => { localStorage.setItem('bizai_installed', String(isInstalled)); }, [isInstalled]);
  useEffect(() => { localStorage.setItem('bizai_company', JSON.stringify(companyInfo)); }, [companyInfo]);

  const addCustomer = (customer: Customer) => setCustomers(prev => [...prev, customer]);
  const updateCustomer = (id: string, data: Partial<Customer>) => setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  const deleteCustomer = (id: string) => setCustomers(prev => prev.filter(c => c.id !== id));

  const addQuotation = (quotation: Quotation) => setQuotations(prev => [...prev, quotation]);
  const updateQuotation = (id: string, data: Partial<Quotation>) => setQuotations(prev => prev.map(q => q.id === id ? { ...q, ...data } : q));
  const deleteQuotation = (id: string) => setQuotations(prev => prev.filter(q => q.id !== id));

  const addInvoice = (invoice: Invoice) => setInvoices(prev => [...prev, invoice]);
  const updateInvoice = (id: string, data: Partial<Invoice>) => setInvoices(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  const deleteInvoice = (id: string) => setInvoices(prev => prev.filter(i => i.id !== id));

  const addFollowUp = (followUp: FollowUp) => setFollowUps(prev => [...prev, followUp]);
  const updateFollowUp = (id: string, data: Partial<FollowUp>) => setFollowUps(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
  const deleteFollowUp = (id: string) => setFollowUps(prev => prev.filter(f => f.id !== id));

  const addChatMessage = (message: ChatMessage) => setChatMessages(prev => [...prev, message]);
  const clearChat = () => setChatMessages(defaultChatMessages);

  const updateSubscription = (data: Partial<Subscription>) => setSubscription(prev => ({ ...prev, ...data }));

  return (
    <AppContext.Provider value={{
      customers, quotations, invoices, followUps, chatMessages, subscription, isInstalled, companyInfo,
      addCustomer, updateCustomer, deleteCustomer,
      addQuotation, updateQuotation, deleteQuotation,
      addInvoice, updateInvoice, deleteInvoice,
      addFollowUp, updateFollowUp, deleteFollowUp,
      addChatMessage, clearChat, updateSubscription,
      setIsInstalled, setCompanyInfo
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
