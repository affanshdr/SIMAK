'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarAdmin from "../../../components/NavbarAdmin";

interface WargaData {
  id: number;
  nama_lengkap: string;
  no_nik: string;
  no_kk: string;
  alamat: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
}

export default function TambahDataWarga() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    no_nik: '',
    no_kk: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    agama: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'Lainnya'];
  const jenisKelaminOptions = ['Laki-laki', 'Perempuan'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Validasi
      if (!formData.nama_lengkap || !formData.no_nik || !formData.no_kk || !formData.alamat || 
          !formData.tempat_lahir || !formData.tanggal_lahir || !formData.jenis_kelamin || !formData.agama) {
        throw new Error('Semua field harus diisi');
      }
      
      if (!/^\d{16}$/.test(formData.no_nik)) {
        throw new Error('NIK harus 16 digit angka');
      }
      
      if (!/^\d{16}$/.test(formData.no_kk)) {
        throw new Error('No KK harus 16 digit angka');
      }
  
      // Kirim data ke API
      const response = await fetch('/api/data-warga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.error || 'Gagal menambahkan data');
      }
  
      // Set success state and redirect after a short delay
      setSuccess(true);
      setTimeout(() => {
        router.push('/data-warga');
      }, 1500); // Redirect after 1.5 seconds to show success message
      
    } catch (error) {
      console.error('Error saat menyimpan data:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ fontFamily: 'var(--font-poppins)' }} className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-0 font-sans flex">
      <NavbarAdmin currentPath={''}/>
      
      <div className="flex-1 ml-64 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Tambah Data Warga</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              Data berhasil disimpan! Mengarahkan ke halaman data warga...
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {/* Form fields remain the same */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama_lengkap"
                  placeholder="Masukkan nama lengkap ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <input
                  type="text"
                  name="no_nik"
                  placeholder="Masukkan NIK (16 digit) ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                  value={formData.no_nik}
                  onChange={handleChange}
                  required
                  maxLength={16}
                  pattern="\d{16}"
                  title="NIK harus 16 digit angka"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. KK</label>
                <input
                  type="text"
                  name="no_kk"
                  placeholder="Masukkan No. KK (16 digit) ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                  value={formData.no_kk}
                  onChange={handleChange}
                  required
                  maxLength={16}
                  pattern="\d{16}"
                  title="No KK harus 16 digit angka"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    name="tempat_lahir"
                    placeholder="Masukkan tempat lahir ..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                    value={formData.tempat_lahir}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                    value={formData.tanggal_lahir}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                  <select
                    name="jenis_kelamin"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    {jenisKelaminOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                  <select
                    name="agama"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                    value={formData.agama}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Agama</option>
                    {agamaOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  placeholder="Masukkan alamat lengkap ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD233] focus:border-[#FFD233] outline-none transition"
                  value={formData.alamat}
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
                disabled={isLoading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FFD233] hover:bg-[#E6BD2E] text-gray-800 font-medium rounded-lg transition-colors disabled:opacity-50"
                disabled={isLoading || success}
              >
                {isLoading ? 'Menyimpan...' : success ? 'Berhasil!' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}