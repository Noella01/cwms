import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, Filter } from 'lucide-react';
import { PaymentForm } from '../components/PaymentForm';
import { ImigongoPattern } from '../components/ImigongoPattern';
const RECENT_PAYMENTS = [{
  id: 1,
  customer: 'Jean Paul',
  amount: 45000,
  date: '2023-10-24',
  method: 'Mobile Money',
  status: 'Paid'
}, {
  id: 2,
  customer: 'Business Corp',
  amount: 120000,
  date: '2023-10-23',
  method: 'Bank Transfer',
  status: 'Pending'
}, {
  id: 3,
  customer: 'Sarah Jones',
  amount: 25000,
  date: '2023-10-22',
  method: 'Cash',
  status: 'Paid'
}, {
  id: 4,
  customer: 'Embassy Fleet',
  amount: 85000,
  date: '2023-10-21',
  method: 'Check',
  status: 'Paid'
}];
export function Payments() {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Payments</h1>
          <p className="text-text-muted mt-1">
            Record transactions and track revenue
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <PaymentForm />

          <div className="mt-6 bg-golden/10 rounded-2xl p-6 border border-golden/20 relative overflow-hidden">
            <ImigongoPattern type="triangle" className="absolute bottom-0 right-0 w-32 h-8 text-golden/20" color="golden" />
            <h3 className="text-golden-dark font-bold text-lg mb-1">
              Total Revenue
            </h3>
            <p className="text-sm text-golden-dark/80 mb-4">This Month</p>
            <div className="text-3xl font-bold text-golden-dark">
              2,450,000 RWF
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg text-text">Recent Transactions</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-cream rounded-lg text-text-muted transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-cream rounded-lg text-text-muted transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-cream text-text-muted font-medium">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RECENT_PAYMENTS.map(payment => <tr key={payment.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4 text-text-muted">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 font-medium text-text">
                      {payment.customer}
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'Paid' ? 'bg-sage/10 text-sage-dark' : 'bg-golden/10 text-golden-dark'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-text">
                      {payment.amount.toLocaleString()} RWF
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>;
}