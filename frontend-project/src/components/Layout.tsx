import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, ClipboardList, CreditCard, BarChart3, Menu, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImigongoPattern } from './ImigongoPattern';
interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  user?: {
    name: string;
    role: string;
  };
}
const navItems = [{
  path: '/',
  label: 'Dashboard',
  icon: LayoutDashboard
}, {
  path: '/cars',
  label: 'Cars',
  icon: Car
}, {
  path: '/services',
  label: 'Services',
  icon: Wrench
}, {
  path: '/records',
  label: 'Records',
  icon: ClipboardList
}, {
  path: '/payments',
  label: 'Payments',
  icon: CreditCard
}, {
  path: '/reports',
  label: 'Reports',
  icon: BarChart3
}];
export function Layout({
  children,
  onLogout,
  user
}: LayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return <div className="min-h-screen bg-cream flex font-sans text-text overflow-hidden">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" />}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-border shadow-sm transform lg:transform-none transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-6 border-b border-border relative overflow-hidden">
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-terracotta/20">
                S
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight">SmartPark</h1>
                <p className="text-xs text-text-muted">CRPMS</p>
              </div>
            </div>
            {/* Decorative Pattern */}
            <ImigongoPattern type="zigzag" className="absolute -bottom-2 -right-4 w-32 h-8 text-terracotta/10" color="terracotta" />
          </div>

          {/* User Profile Snippet */}
          <div className="px-4 py-4">
            <div className="bg-cream rounded-xl p-3 flex items-center gap-3 border border-border/50">
              <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-sage-dark font-bold text-xs">
                {user?.name?.charAt(0) || 'C'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.name || 'Chief Mechanic'}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {user?.role || 'Admin'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 group ${isActive ? 'text-terracotta font-semibold' : 'text-text-muted hover:text-text hover:bg-cream-dark'}`}>
                  {isActive && <motion.div layoutId="activeNav" className="absolute inset-0 bg-terracotta/10 rounded-xl" initial={false} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }} />}
                  <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-terracotta' : 'text-text-muted group-hover:text-text'}`} />
                  <span className="relative z-10">{item.label}</span>
                </Link>;
          })}
          </nav>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-border">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors duration-200 group">
              <LogOut className="w-5 h-5 group-hover:text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              S
            </div>
            <span className="font-bold text-lg">SmartPark</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-text hover:bg-cream rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth bg-cream">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>;
}