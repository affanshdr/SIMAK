'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DataWarga() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('Data Warga');

  const [wargaData] = useState([
    { id: 1, nama: 'Affan_xD', nik: '3201234567890001', noKK: '3209876543210001' },
    { id: 2, nama: 'Affan_xD', nik: '3201234567890002', noKK: '3209876543210001' },
    { id: 3, nama: 'Budi Santoso', nik: '3201234567890003', noKK: '3209876543210002' },
    { id: 4, nama: 'Citra Dewi', nik: '3201234567890004', noKK: '3209876543210003' },
    { id: 5, nama: 'Doni Pratama', nik: '3201234567890005', noKK: '3209876543210004' },
    { id: 6, nama: 'Eka Wijaya', nik: '3201234567890006', noKK: '3209876543210005' },
  ]);

  const filteredData = wargaData.filter(warga =>
    warga.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warga.nik.includes(searchQuery) ||
    warga.noKK.includes(searchQuery)
  );

  return (
    <div style={{ fontFamily: 'var(--font-poppins)' }} className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-0 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 min-w-[16rem] bg-[#FFE08A] shadow-md z-10 h-screen fixed left-0 top-0">
        <div className="p-4 border-b border-[#E6D9A5] flex items-center justify-center h-20">
             <h1 className="text-xl font-bold text-gray-800">SIMAK</h1>
    </div>


        <nav className="p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Menu Utama</h3>
            <Link
              href="/dashboard"
              className={`block p-2 rounded-md ${activeMenu === 'Dashboard' ? 'bg-[#F5D778] text-gray-800' : 'text-gray-700 hover:bg-[#F5D778]'}`}
              onClick={() => setActiveMenu('Dashboard')}
            >
              Dashboard
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">SURAT</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/pengajuan-masuk"
                  className={`block p-2 rounded-md ${activeMenu === 'Pengajuan Masuk' ? 'bg-[#F5D778] text-gray-800' : 'text-gray-700 hover:bg-[#F5D778]'}`}
                  onClick={() => setActiveMenu('Pengajuan Masuk')}
                >
                  Pengajuan Masuk
                </Link>
              </li>
              <li>
                <Link
                  href="/arsip"
                  className={`block p-2 rounded-md ${activeMenu === 'Arsip' ? 'bg-[#F5D778] text-gray-800' : 'text-gray-700 hover:bg-[#F5D778]'}`}
                  onClick={() => setActiveMenu('Arsip')}
                >
                  Arsip
                </Link>
              </li>
              <li>
                <Link
                  href="/template-surat"
                  className={`block p-2 rounded-md ${activeMenu === 'Template Surat' ? 'bg-[#F5D778] text-gray-800' : 'text-gray-700 hover:bg-[#F5D778]'}`}
                  onClick={() => setActiveMenu('Template Surat')}
                >
                  Template Surat
                </Link>
              </li>
              <li>
                <Link
                  href="/laporan"
                  className={`block p-2 rounded-md ${activeMenu === 'Laporan' ? 'bg-[#F5D778] text-gray-800' : 'text-gray-700 hover:bg-[#F5D778]'}`}
                  onClick={() => setActiveMenu('Laporan')}
                >
                  Laporan
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">PENGATURAN</h3>
            <Link
              href="/data-warga"
              className={`block p-2 rounded-md ${activeMenu === 'Data Warga' ? 'bg-[#F5D778] text-gray-800' : 'text-gray-700 hover:bg-[#F5D778]'}`}
              onClick={() => setActiveMenu('Data Warga')}
            >
              Data Warga
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/logout"
              className="block p-2 text-gray-700 hover:bg-[#F5D778] rounded-md"
            >
              Keluar
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-auto">
        {/* Title and Add Button */}
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mr-4">Data Warga</h2>
          <button className="bg-[#FFD233] hover:bg-[#E6BD2E] text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{warga.nik}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{warga.noKK}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-700">Data tidak ditemukan</h3>
            <p className="mt-1 text-sm text-gray-500">Coba dengan kata kunci pencarian yang berbeda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
