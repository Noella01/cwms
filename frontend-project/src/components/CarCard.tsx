import React from 'react';
import { motion } from 'framer-motion';
import { Car, Calendar, User, Phone } from 'lucide-react';
interface CarProps {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  owner: string;
  phone: string;
  status: 'active' | 'completed' | 'pending';
  image?: string;
}
interface CarCardProps {
  car: CarProps;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}
export function CarCard({
  car,
  onView,
  onEdit
}: CarCardProps) {
  const statusColors = {
    active: 'bg-sage/10 text-sage-dark border-sage/20',
    completed: 'bg-blue-50 text-blue-700 border-blue-100',
    pending: 'bg-golden/10 text-golden-dark border-golden/20'
  };
  return <motion.div whileHover={{
    scale: 1.02,
    y: -2
  }} transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20
  }} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => onView(car.id)}>
      <div className="h-32 bg-cream-dark relative overflow-hidden">
        {car.image ? <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-border">
            <Car className="w-12 h-12 opacity-20" />
          </div>}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[car.status]}`}>
          {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-text group-hover:text-terracotta transition-colors">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-text-muted font-mono bg-cream inline-block px-2 py-0.5 rounded mt-1 border border-border/50">
            {car.plate}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-text-muted">
            <Calendar className="w-4 h-4 mr-2 text-terracotta/70" />
            {car.year}
          </div>
          <div className="flex items-center text-sm text-text-muted">
            <User className="w-4 h-4 mr-2 text-sage/70" />
            {car.owner}
          </div>
          <div className="flex items-center text-sm text-text-muted">
            <Phone className="w-4 h-4 mr-2 text-golden/70" />
            {car.phone}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={e => {
          e.stopPropagation();
          onView(car.id);
        }} className="flex-1 bg-terracotta text-white py-2 rounded-xl text-sm font-medium hover:bg-terracotta-dark transition-colors">
            View Details
          </button>
          <button onClick={e => {
          e.stopPropagation();
          onEdit(car.id);
        }} className="px-4 py-2 border border-border rounded-xl text-sm font-medium text-text hover:bg-cream transition-colors">
            Edit
          </button>
        </div>
      </div>
    </motion.div>;
}