import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImigongoPattern } from '../components/ImigongoPattern';
import { Wrench, ArrowRight, Loader2 } from 'lucide-react';
interface LoginProps {
  onLogin: () => void;
}
export function Login({
  onLogin
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    // Simulate network delay for better UX
    setTimeout(() => {
      if (email && password) {
        onLogin();
      } else {
        setError('Please enter both email and password');
        setIsLoading(false);
      }
    }, 800);
  };
  return <div className="min-h-screen bg-cream flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <ImigongoPattern type="zigzag" className="absolute -top-24 -left-24 w-96 h-96 text-terracotta/5 opacity-50" color="terracotta" />
        <ImigongoPattern type="diamond" className="absolute -bottom-32 -right-32 w-[500px] h-[500px] text-sage/5 opacity-50" color="sage" />
      </div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      ease: 'easeOut'
    }} className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-terracotta/5 border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-terracotta/5 p-8 text-center border-b border-terracotta/10 relative">
            <ImigongoPattern type="zigzag" className="absolute top-0 left-0 w-full h-2 text-terracotta/20" color="terracotta" />
            <div className="w-16 h-16 bg-terracotta rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-terracotta/20 transform rotate-3">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-text mb-1">
              SmartPark CRPMS
            </h1>
            <p className="text-text-muted text-sm">
              Rubavu District Garage Management
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1.5">
                  Email Address
                </label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-cream/30 focus:bg-white focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none transition-all placeholder:text-text-muted/50" placeholder="mechanic@smartpark.rw" required />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-muted mb-1.5">
                  Password
                </label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-cream/30 focus:bg-white focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none transition-all placeholder:text-text-muted/50" placeholder="••••••••" required />
              </div>

              {error && <motion.div initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: 'auto'
            }} className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                  {error}
                </motion.div>}

              <button type="submit" disabled={isLoading} className="w-full bg-sage hover:bg-sage-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-sage/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-text-muted">
                Authorized personnel only. Contact administration for access.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
}