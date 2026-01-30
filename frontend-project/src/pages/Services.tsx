import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Plus, ChevronRight, Settings, Zap, Droplet, Disc } from 'lucide-react';
import { ImigongoPattern } from '../components/ImigongoPattern';
const CATEGORIES = [{
  id: 'maintenance',
  name: 'Regular Maintenance',
  icon: Droplet,
  color: 'sage',
  services: [{
    name: 'Oil Change (Synthetic)',
    price: 45000,
    duration: '45 min'
  }, {
    name: 'Oil Change (Regular)',
    price: 35000,
    duration: '45 min'
  }, {
    name: 'Air Filter Replacement',
    price: 15000,
    duration: '15 min'
  }, {
    name: 'Full Service Package',
    price: 120000,
    duration: '3 hrs'
  }]
}, {
  id: 'brakes',
  name: 'Brake Services',
  icon: Disc,
  color: 'terracotta',
  services: [{
    name: 'Brake Pad Replacement',
    price: 65000,
    duration: '1.5 hrs'
  }, {
    name: 'Rotor Resurfacing',
    price: 45000,
    duration: '2 hrs'
  }, {
    name: 'Brake Fluid Flush',
    price: 30000,
    duration: '1 hr'
  }]
}, {
  id: 'engine',
  name: 'Engine & Transmission',
  icon: Settings,
  color: 'golden',
  services: [{
    name: 'Transmission Fluid Change',
    price: 55000,
    duration: '1.5 hrs'
  }, {
    name: 'Spark Plug Replacement',
    price: 40000,
    duration: '1 hr'
  }, {
    name: 'Diagnostic Scan',
    price: 15000,
    duration: '30 min'
  }]
}, {
  id: 'electrical',
  name: 'Electrical Systems',
  icon: Zap,
  color: 'sage',
  services: [{
    name: 'Battery Replacement',
    price: 25000,
    duration: '30 min'
  }, {
    name: 'Alternator Repair',
    price: 85000,
    duration: '3 hrs'
  }, {
    name: 'Headlight Restoration',
    price: 20000,
    duration: '1 hr'
  }]
}];
export function Services() {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Service Catalog</h1>
          <p className="text-text-muted mt-1">
            Manage service offerings and pricing
          </p>
        </div>
        <button className="bg-terracotta text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20">
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((category, idx) => <motion.div key={category.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: idx * 0.1
      }} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className={`p-6 border-b border-border bg-${category.color}/5 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${category.color}/10 text-${category.color === 'golden' ? 'golden-dark' : category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-text">{category.name}</h2>
              </div>
              <ImigongoPattern type="zigzag" className={`w-24 h-6 text-${category.color}/20`} color={category.color as any} />
            </div>

            <div className="p-2">
              {category.services.map((service, sIdx) => <div key={sIdx} className="p-4 hover:bg-cream rounded-xl transition-colors flex items-center justify-between group cursor-pointer">
                  <div>
                    <h3 className="font-medium text-text group-hover:text-terracotta transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {service.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-text">
                      {service.price.toLocaleString()} RWF
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                  </div>
                </div>)}
            </div>

            <div className="p-4 border-t border-border bg-cream/30">
              <button className="w-full py-2 text-sm font-medium text-text-muted hover:text-terracotta transition-colors border border-dashed border-border rounded-lg hover:border-terracotta hover:bg-white">
                + Add item to {category.name}
              </button>
            </div>
          </motion.div>)}
      </div>
    </motion.div>;
}