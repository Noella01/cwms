import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BoxIcon } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string | number;
  icon: BoxIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'terracotta' | 'sage' | 'golden';
  delay?: number;
}
export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  delay = 0
}: StatCardProps) {
  const colorStyles = {
    terracotta: 'bg-terracotta/10 text-terracotta',
    sage: 'bg-sage/10 text-sage',
    golden: 'bg-golden/10 text-golden-dark'
  };
  const iconStyles = {
    terracotta: 'bg-terracotta text-white',
    sage: 'bg-sage text-white',
    golden: 'bg-golden text-white'
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay
  }} className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-text">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${iconStyles[color]} shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && <div className="mt-4 flex items-center gap-2">
          <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trend.isPositive ? 'bg-sage/10 text-sage-dark' : 'bg-terracotta/10 text-terracotta-dark'}`}>
            {trend.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-text-muted">vs last month</span>
        </div>}
    </motion.div>;
}