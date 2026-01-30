import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, CreditCard, FileText } from 'lucide-react';
export function PaymentForm() {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'cash',
    notes: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic
    console.log('Payment submitted:', formData);
    // Reset or show success
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
      <h3 className="text-lg font-bold text-text mb-6">Record New Payment</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">
            Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="number" required value={formData.amount} onChange={e => setFormData({
            ...formData,
            amount: e.target.value
          })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all" placeholder="0.00" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="date" required value={formData.date} onChange={e => setFormData({
              ...formData,
              date: e.target.value
            })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">
              Payment Method
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select value={formData.method} onChange={e => setFormData({
              ...formData,
              method: e.target.value
            })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all appearance-none bg-white">
                <option value="cash">Cash</option>
                <option value="card">Credit Card</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-1.5">
            Notes
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
            <textarea rows={3} value={formData.notes} onChange={e => setFormData({
            ...formData,
            notes: e.target.value
          })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all resize-none" placeholder="Optional notes about this transaction..." />
          </div>
        </div>

        <button type="submit" className="w-full bg-terracotta text-white font-medium py-3 rounded-xl hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20 active:scale-[0.98] duration-200">
          Record Payment
        </button>
      </form>
    </motion.div>;
}