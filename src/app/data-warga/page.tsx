'use client'; // Tambahkan baris ini

import { useState, useEffect, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import NavbarAdmin from "../../components/NavbarAdmin"; // Import NavbarAdmin

export default function DataWarga() {
  const [searchQuery, setSearchQuery] = useState('');
  const [wargaData, setWargaData] = useState<Array<{
    id: number;
    nama: string;
    nik: string;
    noKK: string;
  }>>([]);
  const [activeMenu, setActiveMenu] = useState('dataWarga'); // Set activeMenu
  const router = useRouter();

  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem('wargaData');
        if (savedData) {
          setWargaData(JSON.parse(savedData));
        } else {
          const initialData = [
            { id: 1, nama: 'Affan_xD', nik: '3201234567890001', noKK: '3209876543210001' },
            { id: 2, nama: 'Affan_xD', nik: '3201234567890002', noKK: '3209876543210001' },
            { id: 3, nama: 'Budi Santoso', nik: '3201234567890003', noKK: '3209876543210002' },
            { id: 4, nama: 'Citra Dewi', nik: '3201234567890004', noKK: '3209876543210003' },
            { id: 5, nama: 'Doni Pratama', nik: '3201234567890005', noKK: '3209876543210004' },
            { id: 6, nama: 'Eka Wijaya', nik: '3201234567890006', noKK: '3209876543210005' },
          ];
          setWargaData(initialData);
          localStorage.setItem('wargaData', JSON.stringify(initialData));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const filteredData = wargaData.filter(warga =>
    warga.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warga.nik.includes(searchQuery) ||
    warga.noKK.includes(searchQuery)
  );

  const handleTambahData = () => {
    router.push('/data-warga/tambah');
  };

  return (
    <div style={{ fontFamily: 'var(--font-poppins)' }} className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-6">
      {/* NavbarAdmin Component */}
      <NavbarAdmin/> {/* Menetapkan activeMenu dan setActiveMenu */}

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto ml-64">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mr-4">Data Warga</h2>
          <button 
            onClick={handleTambahData}
            className="bg-[#FFD233] hover:bg-[#E6BD2E] text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <span className="mr-1">+</span> Tambah Data
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Cari Data Warga"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] bg-white outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#FFE08A]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">NIK</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">No KK</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((warga) => (
                  <tr key={warga.id} className="hover:bg-[#FFF5D9]">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{warga.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{warga.nik}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{warga.noKK}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
