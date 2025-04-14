'use client';
import { motion } from 'framer-motion';
import { useState } from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const steps = [
  {
    number: 1,
    title: "Akses Menu",
    description: "Klik menu 'Lacak Pengajuan' dengan NIK/No. KK",
    icon: "🔍"
  },
  {
    number: 2,
    title: "Isi Form Online",
    description: [
      "Akses website → Menu 'Beranda'",
      "Isi Form + upload syarat",
      "Klik 'Ajukan Sekarang'"
    ],
    icon: "📝"
  },
  {
    number: 3,
    title: "Tunggu Verifikasi",
    description: "Cek Status secara berkala (1-3 Hari Kerja)",
    icon: "⏳"
  },
  {
    number: 4,
    title: "Ambil Surat",
    description: "Pergi ke Kantor saat status 'Selesai'",
    icon: "✅"
  }
];

export default function Panduan() {

    const [searchQuery, setSearchQuery] = useState("");
        const [searchResults, setSearchResults] = useState<Array<{
          noTracking: string;
          jenisSurat: string;
          tanggal: string;
          status: string;
        }> | null>(null);
      
        const handleSearch = (e: React.FormEvent) => {
          e.preventDefault();
          // Mock search results - replace with actual API call
          setSearchResults([
            {
              noTracking: "KM - 001",
              jenisSurat: "Surat Keterangan Kurang Mampu",
              tanggal: "20 Mei 2025",
              status: "Diproses", // Changed to "Diproses"
            },
            {
              noTracking: "KM - 023",
              jenisSurat: "Surat Keterangan Kurang Mampu",
              tanggal: "15 Feb 2025",
              status: "Diajukan", // Fixed typo from "Didjukan"
            },
          ]);
        };

  return (
    <div
          style={{ fontFamily: "var(--font-poppins)" }}
          className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-0 font-sans"
        >
          {/* Navbar */}
          <Navbar />
    
          {/* Hero Section */}
          <div className="px-6 mt-10 flex flex-col md:flex-row justify-between items-center ml-10 mr-10">
            <div className="ml-10 mb-8 md:mb-0">
              <h1 className="text-3xl font-bold mb-4">CARA MENGAJUKAN SURAT & PERSYARATAN</h1>
              <p className="text-gray-600">
              Layanan Pengurusan Surat Desa Kopelma Darussalam
              </p>
    
              <form onSubmit={handleSearch} className="flex gap-4 mt-25">
                <input
                    type="text"
                    placeholder="Masukkan jenis Surat"
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    Cari
                </button>
            </form>
            </div>
    
            <img src="/pengajuan.png" alt="Surat" className="w-150 h-120 mr-2" />
    
        </div>
    
    <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header with animated underline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            PANDUAN PENGAJUAN SURAT
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4 rounded-full" />
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Layanan pengurusan surat desa Kopelma Darussalam dengan proses mudah dan transparan
          </p>
        </motion.div>

        {/* Pilih Jenis Surat Section */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mb-12"
>
  <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
    <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-3">📄</span>
    Pilih Jenis Surat
  </h3>

  <div className="relative group">
    <select 
      className="w-full p-4 pr-10 text-lg border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white cursor-pointer transition-all hover:shadow-md"
    >
      <option value="" disabled selected className="text-gray-400">Pilih jenis surat...</option>
      {[
        "Surat Keterangan Domisili",
        "Surat Keterangan Usaha",
        "Surat Keterangan Belum Menikah",
        "Surat Keterangan Tidak Mampu"
      ].map((surat, index) => (
        <option 
          key={index} 
          value={surat}
          className="py-2 text-gray-700 hover:bg-yellow-50"
        >
          {surat}
        </option>
      ))}
    </select>
    
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-yellow-600 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Surat Details (appears when selected) */}
  <motion.div 
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="mt-6 overflow-hidden"
  >
    <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
      <h4 className="font-bold text-lg mb-3 text-yellow-700">Detail Persyaratan:</h4>
      <ul className="space-y-2 text-gray-700">
        <li className="flex items-start">
          <span className="text-yellow-500 mr-2">•</span>
          <span>Foto KTP yang masih berlaku</span>
        </li>
        <li className="flex items-start">
          <span className="text-yellow-500 mr-2">•</span>
          <span>Foto Kartu Keluarga (KK)</span>
        </li>
        <li className="flex items-start">
          <span className="text-yellow-500 mr-2">•</span>
          <span>Formulir pengajuan yang sudah diisi</span>
        </li>
      </ul>
    </div>
  </motion.div>
</motion.div>
        

        {/* Requirements Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16 border-l-4 border-yellow-500"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg mr-3">📋</span>
            Surat Keterangan Tidak Mampu (SKTM)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                Persyaratan Umum
              </h3>
              <ul className="space-y-3">
                {['Foto KTP (yang masih berlaku)', 'Foto KK (Kartu Keluarga)', 'Mengisi form online di website'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                Catatan Penting
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  Pastikan dokumen foto jelas dan terbaca
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">⏱️</span>
                  Proses verifikasi membutuhkan 1-3 hari kerja
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">🏢</span>
                  Pengambilan surat hanya di kantor desa
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Animated Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Langkah-langkah Pengajuan
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                  </div>
                  
                  <div className="text-gray-600 pl-14">
                    {Array.isArray(step.description) ? (
                      <ul className="space-y-2">
                        {step.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{step.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-yellow-50 px-6 py-3 text-center text-yellow-600 font-medium">
                  {step.icon} Langkah {step.number}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}