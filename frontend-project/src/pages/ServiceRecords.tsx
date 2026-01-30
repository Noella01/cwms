import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';

/* =======================
   Types
======================= */
type RecordStatus = 'pending' | 'completed';

interface ServiceRecord {
  id: string;
  car: string;
  service: string;
  date: string;
  status: RecordStatus;
}

/* =======================
   Mock Data (kept)
======================= */
const INITIAL_RECORDS: ServiceRecord[] = [
  {
    id: '1',
    car: 'RAC 123 A',
    service: 'Oil Change',
    date: '2024-12-01',
    status: 'completed',
  },
  {
    id: '2',
    car: 'RAD 456 B',
    service: 'Brake Inspection',
    date: '2024-12-03',
    status: 'pending',
  },
];

/* =======================
   Component
======================= */
export default function ServiceRecords() {
  const [records, setRecords] = useState<ServiceRecord[]>(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [car, setCar] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<RecordStatus>('pending');

  /* =======================
     Filter Records
  ======================= */
  const filteredRecords = records.filter(
    (record) =>
      record.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =======================
     Add Record (FIXED)
  ======================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: ServiceRecord = {
      id: Date.now().toString(),
      car,
      service,
      date,
      status,
    };

    // ✅ Update STATE (not constants)
    setRecords((prev) => [newRecord, ...prev]);

    // Reset + close modal
    setCar('');
    setService('');
    setDate('');
    setStatus('pending');
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Service Records</h1>
          <p className="text-text-muted mt-1">
            Track services performed on vehicles
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-terracotta text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-terracotta-dark transition"
        >
          <Plus className="w-5 h-5" />
          Add Record
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search by car or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-terracotta/20 outline-none"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-cream text-sm text-text-muted">
            <tr>
              <th className="p-4">Car</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-t border-border">
                <td className="p-4 font-medium">{record.car}</td>
                <td className="p-4">{record.service}</td>
                <td className="p-4">{record.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl w-full max-w-md relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-cream rounded-full"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Add Service Record</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Car Plate"
                value={car}
                onChange={(e) => setCar(e.target.value)}
                className="w-full input"
                required
              />
              <input
                placeholder="Service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full input"
                required
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full input"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RecordStatus)}
                className="w-full input"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <button
                type="submit"
                className="w-full bg-terracotta text-white py-3 rounded-xl font-medium hover:bg-terracotta-dark"
              >
                Save Record
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}



