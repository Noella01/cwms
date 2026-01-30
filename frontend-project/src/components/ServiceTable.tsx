import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ArrowUpDown } from 'lucide-react';
interface ServiceRecord {
  id: string;
  date: string;
  car: string;
  service: string;
  technician: string;
  status: 'In Progress' | 'Completed' | 'Scheduled';
  cost: number;
}
interface ServiceTableProps {
  records: ServiceRecord[];
}
export function ServiceTable({
  records
}: ServiceTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ServiceRecord>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const handleSort = (field: keyof ServiceRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const filteredRecords = records.filter(record => record.car.toLowerCase().includes(searchTerm.toLowerCase()) || record.service.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  const statusStyles = {
    'In Progress': 'bg-golden/10 text-golden-dark',
    Completed: 'bg-sage/10 text-sage-dark',
    Scheduled: 'bg-gray-100 text-gray-600'
  };
  return <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header Controls */}
      <div className="p-5 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h3 className="font-bold text-lg text-text">Recent Service Records</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search car or service..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all text-sm" />
          </div>
          <button className="p-2 border border-border rounded-xl hover:bg-cream transition-colors text-text-muted">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-cream text-text-muted font-medium">
            <tr>
              {[{
              key: 'date',
              label: 'Date'
            }, {
              key: 'car',
              label: 'Car'
            }, {
              key: 'service',
              label: 'Service'
            }, {
              key: 'technician',
              label: 'Technician'
            }, {
              key: 'status',
              label: 'Status'
            }, {
              key: 'cost',
              label: 'Cost'
            }].map(col => <th key={col.key} onClick={() => handleSort(col.key as keyof ServiceRecord)} className="px-6 py-4 cursor-pointer hover:bg-cream-dark transition-colors group">
                  <div className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className={`w-3 h-3 transition-opacity ${sortField === col.key ? 'opacity-100 text-terracotta' : 'opacity-0 group-hover:opacity-50'}`} />
                  </div>
                </th>)}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredRecords.map(record => <tr key={record.id} className="hover:bg-cream/30 transition-colors">
                <td className="px-6 py-4 font-medium text-text">
                  {record.date}
                </td>
                <td className="px-6 py-4">{record.car}</td>
                <td className="px-6 py-4">{record.service}</td>
                <td className="px-6 py-4 text-text-muted">
                  {record.technician}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[record.status]}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-text">
                  {record.cost.toLocaleString()} RWF
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-cream rounded-lg transition-colors text-text-muted hover:text-text">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

      {filteredRecords.length === 0 && <div className="p-8 text-center text-text-muted">
          No records found matching your search.
        </div>}
    </div>;
}