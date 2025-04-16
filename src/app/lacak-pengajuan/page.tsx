"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LacakPengajuan() {
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
  
    const getStatusBadge = (status: string) => {
      const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
      
      switch(status) {
        case 'Diproses':
          return (
            <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>
              <span className="w-2.5 h-2.5 mr-2 bg-yellow-500 rounded-full"></span>
              {status}
            </span>
          );
        case 'Diajukan':
          return (
            <span className={`${baseClass} bg-blue-100 text-blue-800`}>
              <span className="w-2.5 h-2.5 mr-2 bg-blue-500 rounded-full"></span>
              {status}
            </span>
          );
        default:
          return (
            <span className={`${baseClass} bg-gray-100 text-gray-800`}>
              <span className="w-2.5 h-2.5 mr-2 bg-gray-500 rounded-full"></span>
              {status}
            </span>
          );
      }
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
          <h1 className="text-3xl font-bold mb-4">LACAK PENGAJUANMU !</h1>
          <p className="text-gray-600">
            Layanan Pengurusan Surat Desa Kopelma Darussalam
          </p>

          <form onSubmit={handleSearch} className="flex gap-4 mt-25">
            <input
                type="text"
                placeholder="Masukkan NIK atau No Tracking"
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
                Lacak
            </button>
        </form>
        </div>

        <img src="/pengajuan.png" alt="Surat" className="w-150 h-120 mr-2" />

        
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 font-poppins">

      <h3 className="text-xl font-semibold mb-4 text-center">Lacak Status Pengajuan</h3>
        {/* Search Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Masukkan NIK atau No Tracking"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Lacak
            </button>
          </form>
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h4 className="text-lg font-medium mb-4">
              Hasil Pencarian Status Untuk: {searchQuery}
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No Tracking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jenis Surat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.noTracking}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.jenisSurat}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.tanggal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
