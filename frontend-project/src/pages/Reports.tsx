import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar } from 'lucide-react';
const REVENUE_DATA = [{
  name: 'Mon',
  amount: 120000
}, {
  name: 'Tue',
  amount: 180000
}, {
  name: 'Wed',
  amount: 150000
}, {
  name: 'Thu',
  amount: 240000
}, {
  name: 'Fri',
  amount: 200000
}, {
  name: 'Sat',
  amount: 320000
}, {
  name: 'Sun',
  amount: 80000
}];
const SERVICE_TYPE_DATA = [{
  name: 'Maintenance',
  value: 45
}, {
  name: 'Repairs',
  value: 30
}, {
  name: 'Parts',
  value: 15
}, {
  name: 'Diagnostics',
  value: 10
}];
const COLORS = ['#6B8E6F', '#D4745E', '#E8B44F', '#2D2D2D'];
export function Reports() {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Analytics & Reports</h1>
          <p className="text-text-muted mt-1">
            Insights into workshop performance
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border rounded-xl flex items-center gap-2 hover:bg-cream transition-colors text-text font-medium bg-white">
            <Calendar className="w-4 h-4 text-text-muted" />
            Last 7 Days
          </button>
          <button className="bg-sage text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-sage-dark transition-colors shadow-lg shadow-sage/20">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold text-lg text-text mb-6">Weekly Revenue</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC8" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{
                fill: '#5C5C5C'
              }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{
                fill: '#5C5C5C'
              }} />
                <Tooltip cursor={{
                fill: '#FFF8F0'
              }} contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} />
                <Bar dataKey="amount" fill="#D4745E" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="font-bold text-lg text-text mb-6">
            Service Distribution
          </h3>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SERVICE_TYPE_DATA} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {SERVICE_TYPE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {SERVICE_TYPE_DATA.map((entry, index) => <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{
              backgroundColor: COLORS[index % COLORS.length]
            }} />
                <span className="text-sm text-text-muted">{entry.name}</span>
              </div>)}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-sage/10 p-6 rounded-2xl border border-sage/20">
          <p className="text-sage-dark font-medium mb-1">Average Ticket Size</p>
          <h4 className="text-3xl font-bold text-sage-dark">45,200 RWF</h4>
          <p className="text-sm text-sage-dark/70 mt-2">+12% from last week</p>
        </div>
        <div className="bg-terracotta/10 p-6 rounded-2xl border border-terracotta/20">
          <p className="text-terracotta-dark font-medium mb-1">New Customers</p>
          <h4 className="text-3xl font-bold text-terracotta-dark">24</h4>
          <p className="text-sm text-terracotta-dark/70 mt-2">
            8 returning customers
          </p>
        </div>
        <div className="bg-golden/10 p-6 rounded-2xl border border-golden/20">
          <p className="text-golden-dark font-medium mb-1">
            Parts Inventory Value
          </p>
          <h4 className="text-3xl font-bold text-golden-dark">12.5M RWF</h4>
          <p className="text-sm text-golden-dark/70 mt-2">
            Low stock on 3 items
          </p>
        </div>
      </div>
    </motion.div>;
}