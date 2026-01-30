import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, X } from 'lucide-react';
import { CarCard } from '../components/CarCard';
import { ImigongoPattern } from '../components/ImigongoPattern';

/* =======================
   Types
======================= */
type CarStatus = 'active' | 'pending' | 'completed';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  owner: string;
  phone: string;
  status: CarStatus;
}

/* =======================
   Mock Data (RESTORED)
======================= */
const INITIAL_CARS: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'RAV4',
    year: 2019,
    plate: 'RAC 123 A',
    owner: 'Jean Paul',
    phone: '0788 123 456',
    status: 'active',
  },
  {
    id: '2',
    make: 'Subaru',
    model: 'Forester',
    year: 2015,
    plate: 'RAD 456 B',
    owner: 'Marie Claire',
    phone: '0788 789 012',
    status: 'completed',
  },
  {
    id: '3',
    make: 'Ford',
    model: 'Ranger',
    year: 2020,
    plate: 'RAE 789 C',
    owner: 'John Smith',
    phone: '0788 345 678',
    status: 'pending',
  },
];

/* =======================
   Component
======================= */
export function Cars() {
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');

  /* =======================
     Filter Cars
  ======================= */
  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =======================
     Add Car (MOCK)
  ======================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCar: Car = {
      id: Date.now().toString(),
      make,
      model,
      year: Number(year),
      plate,
      owner,
      phone,
      status: 'pending',
    };

    setCars((prev) => [newCar, ...prev]);

    // Reset + close modal
    setMake('');
    setModel('');
    setYear('');
    setPlate('');
    setOwner('');
    setPhone('');
    setIsModalOpen(false);
  };

  /* =======================
     UI
  ======================= */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Fleet Management</h1>
          <p className="text-text-muted mt-1">
            Manage customer vehicles and service history
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-terracotta text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-terracotta-dark transition-colors shadow-lg shadow-terracotta/20 active:scale-95 duration-200"
        >
          <Plus className="w-5 h-5" />
          Add New Car
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search by make, model, plate, or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all"
          />
        </div>
        <button className="px-4 py-3 border border-border rounded-xl flex items-center gap-2 hover:bg-cream transition-colors text-text-muted font-medium">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onView={(id) => console.log('View', id)}
            onEdit={(id) => console.log('Edit', id)}
          />
        ))}
      </div>

      {/* Add Car Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
          >
            <ImigongoPattern
              type="diamond"
              className="absolute top-0 right-0 w-32 h-32 text-terracotta/5 -mr-8 -mt-8"
              color="terracotta"
            />

            <div className="flex justify-between items-center mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-text">Register New Car</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-cream rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-text-muted" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <input placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} className="input" />
              <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} className="input" />
              <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="input" />
              <input placeholder="Plate" value={plate} onChange={(e) => setPlate(e.target.value)} className="input" />
              <input placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} className="input" />
              <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />

              <button
                type="submit"
                className="w-full bg-terracotta text-white py-3 rounded-xl font-medium hover:bg-terracotta-dark transition-colors"
              >
                Save Car
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

