'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TambahDataWarga() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    noKK: ''
  });
  const [activeMenu, setActiveMenu] = useState('Data Warga');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get existing data from localStorage
      const savedData = localStorage.getItem('wargaData');
      const existingData = savedData ? JSON.parse(savedData) : [];
      
      // Create new data with unique ID
      const newId = existingData.length > 0 
        ? Math.max(...existingData.map((w: any) => w.id)) + 1 
        : 1;
      
      const newData = {
        id: newId,
        nama: formData.nama,
        nik: formData.nik,
        noKK: formData.noKK
      };
      
      // Update data and save to localStorage
      const updatedData = [...existingData, newData];
      localStorage.setItem('wargaData', JSON.stringify(updatedData));
      
      // Redirect to data warga page
      router.push('/data-warga');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Tambah Data Warga</h2>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <input
                  type="text"
                  name="nik"
                  placeholder="Masukkan NIK ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. KK</label>
                <input
                  type="text"
                  name="noKK"
                  placeholder="Masukkan No. KK ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                  value={formData.noKK}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/data-warga')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FFD233] hover:bg-[#E6BD2E] text-gray-800 font-medium rounded-lg transition-colors"
              >
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}