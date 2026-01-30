import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Car, Wrench, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ImigongoPattern } from '../components/ImigongoPattern';
import { Link } from 'react-router-dom';
export function Dashboard() {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Header */}
      <div className="relative bg-white p-8 rounded-3xl border border-border overflow-hidden shadow-sm">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-text mb-2">
            Muraho, Manager! 👋
          </h1>
          <p className="text-text-muted max-w-xl">
            Here's what's happening at the workshop today. You have 3 cars
            waiting for service and 5 completed jobs ready for pickup.
          </p>
        </div>
        <ImigongoPattern type="zigzag" className="absolute top-0 right-0 w-64 h-64 text-terracotta/5 -mr-16 -mt-16 rotate-12" color="terracotta" />
        <ImigongoPattern type="triangle" className="absolute bottom-0 left-0 w-48 h-12 text-sage/10 ml-8 mb-4" color="sage" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Cars" value="124" icon={Car} color="terracotta" trend={{
        value: 12,
        isPositive: true
      }} delay={0.1} />
        <StatCard title="Active Services" value="8" icon={Wrench} color="sage" trend={{
        value: 5,
        isPositive: false
      }} delay={0.2} />
        <StatCard title="Revenue (Mo)" value="12,450,000 RWF" icon={DollarSign} color="golden" trend={{
        value: 8.2,
        isPositive: true
      }} delay={0.3} />
        <StatCard title="Pending Payments" value="1,280,000 RWF" icon={Clock} color="terracotta" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-text">Recent Activity</h2>
            <Link to="/records" className="text-sm text-terracotta font-medium hover:text-terracotta-dark flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-6">
            {[{
            title: 'Oil Change - Toyota RAV4',
            time: '2 hours ago',
            type: 'service',
            color: 'sage'
          }, {
            title: 'New Car Added - Subaru Forester',
            time: '4 hours ago',
            type: 'car',
            color: 'terracotta'
          }, {
            title: 'Payment Received - 450,000 RWF',
            time: '5 hours ago',
            type: 'payment',
            color: 'golden'
          }, {
            title: 'Brake Inspection - Ford Ranger',
            time: 'Yesterday',
            type: 'service',
            color: 'sage'
          }].map((activity, i) => <div key={i} className="flex items-start gap-4">
                <div className={`w-2 h-2 mt-2 rounded-full bg-${activity.color}`} />
                <div>
                  <p className="font-medium text-text">{activity.title}</p>
                  <p className="text-sm text-text-muted">{activity.time}</p>
                </div>
              </div>)}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="bg-sage/5 rounded-2xl border border-sage/10 p-6">
          <h2 className="font-bold text-lg text-text mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/cars" className="block w-full bg-white p-4 rounded-xl border border-border hover:border-terracotta hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-terracotta/10 rounded-lg text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-medium">Register New Car</span>
              </div>
            </Link>

            <Link to="/records" className="block w-full bg-white p-4 rounded-xl border border-border hover:border-sage hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sage/10 rounded-lg text-sage group-hover:bg-sage group-hover:text-white transition-colors">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="font-medium">New Service Record</span>
              </div>
            </Link>

            <Link to="/payments" className="block w-full bg-white p-4 rounded-xl border border-border hover:border-golden hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-golden/10 rounded-lg text-golden-dark group-hover:bg-golden group-hover:text-white transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="font-medium">Record Payment</span>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>;
}