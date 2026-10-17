import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'lead';
  createdAt: string;
}

interface Quotation {
  id: string;
  number: string;
  customer: string;
  items: { description: string; qty: number; price: number }[];
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  date: string;
  validUntil: string;
}

interface Invoice {
  id: string;
  number: string;
  customer: string;
  items: { description: string; qty: number; price: number }[];
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  date: string;
  dueDate: string;
}

interface FollowUp {
  id: string;
  customer: string;
  type: 'call' | 'email' | 'meeting' | 'task';
  subject: string;
  notes: string;
  date: string;
  completed: boolean;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AppContextType {
  customers: Customer[];
  quotations: Quotation[];
  invoices: Invoice[];
  followUps: FollowUp[];
  aiMessages: AIMessage[];
  currentPage: string;
  setCurrentPage: (page: string) => void;
  addCustomer: (customer: Customer) => void;
  addQuotation: (quotation: Quotation) => void;
  addInvoice: (invoice: Invoice) => void;
  addFollowUp: (followUp: FollowUp) => void;
  addAIMessage: (message: AIMessage) => void;
  toggleFollowUp: (id: string) => void;
  subscription: { plan: string; aiCredits: number; maxCredits: number };
}

const defaultCustomers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john@techcorp.com', phone: '+1 555-0101', company: 'TechCorp Inc.', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@designstudio.com', phone: '+1 555-0102', company: 'Design Studio', status: 'active', createdAt: '2024-02-20' },
  { id: '3', name: 'Mike Chen', email: 'mike@startup.io', phone: '+1 555-0103', company: 'Startup.io', status: 'lead', createdAt: '2024-03-10' },
  { id: '4', name: 'Emily Davis', email: 'emily@marketing.co', phone: '+1 555-0104', company: 'Marketing Co.', status: 'active', createdAt: '2024-01-28' },
  { id: '5', name: 'Robert Wilson', email: 'robert@consulting.com', phone: '+1 555-0105', company: 'Wilson Consulting', status: 'inactive', createdAt: '2023-11-05' },
];

const defaultQuotations: Quotation[] = [
  { id: '1', number: 'QT-2024-001', customer: 'TechCorp Inc.', items: [{ description: 'Web Development', qty: 1, price: 5000 }, { description: 'SEO Optimization', qty: 1, price: 1500 }], total: 6500, status: 'accepted', date: '2024-03-01', validUntil: '2024-04-01' },
  { id: '2', number: 'QT-2024-002', customer: 'Design Studio', items: [{ description: 'Brand Identity Package', qty: 1, price: 3000 }], total: 3000, status: 'sent', date: '2024-03-15', validUntil: '2024-04-15' },
  { id: '3', number: 'QT-2024-003', customer: 'Startup.io', items: [{ description: 'Mobile App Development', qty: 1, price: 12000 }, { description: 'UI/UX Design', qty: 1, price: 3000 }], total: 15000, status: 'draft', date: '2024-03-20', validUntil: '2024-04-20' },
  { id: '4', number: 'QT-2024-004', customer: 'Marketing Co.', items: [{ description: 'Social Media Campaign', qty: 3, price: 2000 }], total: 6000, status: 'rejected', date: '2024-02-28', validUntil: '2024-03-28' },
];

const defaultInvoices: Invoice[] = [
  { id: '1', number: 'INV-2024-001', customer: 'TechCorp Inc.', items: [{ description: 'Web Development', qty: 1, price: 5000 }], total: 5000, status: 'paid', date: '2024-03-05', dueDate: '2024-04-05' },
  { id: '2', number: 'INV-2024-002', customer: 'Design Studio', items: [{ description: 'Consulting Services', qty: 10, price: 150 }], total: 1500, status: 'sent', date: '2024-03-18', dueDate: '2024-04-18' },
  { id: '3', number: 'INV-2024-003', customer: 'Marketing Co.', items: [{ description: 'Monthly Retainer', qty: 1, price: 2500 }], total: 2500, status: 'overdue', date: '2024-02-01', dueDate: '2024-03-01' },
  { id: '4', number: 'INV-2024-004', customer: 'Startup.io', items: [{ description: 'App Development Phase 1', qty: 1, price: 8000 }], total: 8000, status: 'draft', date: '2024-03-22', dueDate: '2024-04-22' },
];

const defaultFollowUps: FollowUp[] = [
  { id: '1', customer: 'TechCorp Inc.', type: 'call', subject: 'Project status update', notes: 'Discuss timeline for Phase 2', date: '2024-03-25', completed: false },
  { id: '2', customer: 'Design Studio', type: 'email', subject: 'Send revised proposal', notes: 'Include updated pricing for additional services', date: '2024-03-22', completed: true },
  { id: '3', customer: 'Startup.io', type: 'meeting', subject: 'Initial consultation', notes: 'Present portfolio and discuss requirements', date: '2024-03-28', completed: false },
  { id: '4', customer: 'Marketing Co.', type: 'task', subject: 'Follow up on overdue invoice', notes: 'INV-2024-003 is overdue, send reminder', date: '2024-03-20', completed: false },
  { id: '5', customer: 'Wilson Consulting', type: 'call', subject: 'Re-engagement call', notes: 'Check if they need services again', date: '2024-03-30', completed: false },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [quotations, setQuotations] = useState<Quotation[]>(defaultQuotations);
  const [invoices, setInvoices] = useState<Invoice[]>(defaultInvoices);
  const [followUps, setFollowUps] = useState<FollowUp[]>(defaultFollowUps);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const addCustomer = (customer: Customer) => setCustomers(prev => [...prev, customer]);
  const addQuotation = (quotation: Quotation) => setQuotations(prev => [...prev, quotation]);
  const addInvoice = (invoice: Invoice) => setInvoices(prev => [...prev, invoice]);
  const addFollowUp = (followUp: FollowUp) => setFollowUps(prev => [...prev, followUp]);
  const addAIMessage = (message: AIMessage) => setAiMessages(prev => [...prev, message]);
  const toggleFollowUp = (id: string) => {
    setFollowUps(prev => prev.map(f => f.id === id ? { ...f, completed: !f.completed } : f));
  };

  const subscription = { plan: 'professional', aiCredits: 85, maxCredits: 100 };

  return (
    <AppContext.Provider value={{
      customers, quotations, invoices, followUps, aiMessages,
      currentPage, setCurrentPage, addCustomer, addQuotation,
      addInvoice, addFollowUp, addAIMessage, toggleFollowUp, subscription
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
