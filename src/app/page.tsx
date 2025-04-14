'use client'; 

import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FormPengajuanSurat() {
  const [selectedFiles, setSelectedFiles] = useState<{
    KTP: File | null;
    KK: File | null;
  }>({ KTP: null, KK: null });
  const [previews, setPreviews] = useState<{
    KTP: string | null;
    KK: string | null;
  }>({ KTP: null, KK: null });

  const handleFileChange = (type: 'KTP' | 'KK') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (images only)
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB!');
      return;
    }

    // Update state
    setSelectedFiles(prev => ({ ...prev, [type]: file }));

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type: 'KTP' | 'KK') => {
    setSelectedFiles(prev => ({ ...prev, [type]: null }));
    setPreviews(prev => ({ ...prev, [type]: null }));
  };

  return (
    <div style={{ fontFamily: 'var(--font-poppins)' }} className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-0 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="px-6 mt-10 flex flex-col md:flex-row justify-between items-center ml-10 mr-10">
        <div className="ml-10 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">SISTEM INFORMASI</h1>
          <h1 className="text-3xl font-bold mb-4">MANAJEMEN ADMINISTRASI</h1>
          <p className="text-gray-600">Layanan Pengurusan Surat Desa di Kantor Keuchik</p>
        </div>
        <img src="/surat.png" alt="Surat" className="w-150 h-100 mr-2" />
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center items-center mt-10 mb-20">
        <h2 className="text-2xl font-semibold text-center mb-6">Form Pengajuan Surat</h2>
        
        <div className="bg-white max-w-xl w-full mx-auto p-6 rounded-xl shadow-lg">
          <form className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Masukkan No KK" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" 
                required 
              />
              <input 
                type="text" 
                placeholder="Masukkan No NIK" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" 
                required 
              />
              <input 
                type="text" 
                placeholder="Masukkan Nama Lengkap" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" 
                required 
              />
            </div>

            {/* Document Selection */}
            <div>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                required
              >
                <option value="">Pilih Jenis Surat</option>
                <option value="surat-keterangan-domisili">
                  Surat Keterangan Domisili
                </option>
                <option value="surat-keterangan-usaha">
                  Surat Keterangan Usaha    
                </option>
                <option value="surat-keterangan-belum-menikah">
                  Surat Keterangan Belum Menikah  
                </option>
                <option value="surat-keterangan-tidak-mampu">
                  Surat Keterangan Tidak Mampu
                </option>
              </select>
            </div>

            {/* Additional Information */}
            <div>
              <textarea 
                placeholder="Masukkan Keterangan Tambahan" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition min-h-[100px]"
                rows={3}
              />
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-6">
                {(['KTP', 'KK'] as const).map((docType) => (
                  <div key={docType} className="flex-1 min-w-[200px]">
                    <label className="block mb-2 font-medium text-gray-700">
                      Upload {docType}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id={`upload-${docType}`}
                        onChange={handleFileChange(docType)}
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor={`upload-${docType}`}
                        className={`block border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedFiles[docType] ? 'border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {selectedFiles[docType] ? (
                          <div className="flex flex-col items-center">
                            <span className="text-green-600 font-medium">File {docType} terpilih</span>
                            <span className="text-sm text-gray-500 truncate max-w-full">
                              {selectedFiles[docType]?.name}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-sm text-gray-600">
                              Klik untuk upload
                            </p>
                            <p className="text-xs text-gray-500">Format: JPG, PNG (max 2MB)</p>
                          </div>
                        )}
                      </label>
                      {selectedFiles[docType] && (
                        <button
                          type="button"
                          onClick={() => removeFile(docType)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    {/* Preview */}
                    {previews[docType] && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Preview:</p>
                        <img
                          src={previews[docType]!}
                          alt={`Preview ${docType}`}
                          className="max-h-40 rounded border"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Ajukan Sekarang
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}