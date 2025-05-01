

'use client';
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



// Definisi lengkap semua jenis surat dan dokumen yang diperlukan
const documentRequirements: Record<string, { label: string; docs: string[] }> = {
  'surat-keterangan-domisili': {
    label: 'Surat Keterangan Domisili',
    docs: ['KTP', 'KK', 'Surat Pengantar RT/RW' , 'Surat Permohonan Bermaterai']
  },
  'surat-keterangan-usaha': {
    label: 'Surat Keterangan Usaha',
    docs: ['KTP', 'KK', 'Surat Permohonan Bermaterai', 'Surat Pengantar RT/RW', 'Izin Usaha']
  },
  'surat-keterangan-belum-menikah': {
    label: 'Surat Keterangan Belum Menikah',
    docs: ['KTP', 'KK', 'Surat Pengantar RT/RW', 'Pas Foto 3X4 (latar Merah)']
  },
  'surat-keterangan-tidak-mampu': {
    label: 'Surat Keterangan Tidak Mampu',
    docs: ['KTP', 'KK', 'Surat Pernyataan tidak mampu dari RT/RW', 'Rekening listrik/air 3 bulan terakhir']
  }
}; 

// Deskripsi untuk setiap jenis dokumen
const documentDescriptions: Record<string, string> = {
  'KTP': 'Kartu Tanda Penduduk (format JPG/PNG, max 2MB)',
  'KK': 'Kartu Keluarga (format JPG/PNG, max 2MB)',
  'Surat Pengantar RT/RW': 'Surat pengantar dari RT/RW setempat (format PDF/DOC, max 2MB)',
  'Surat Permohonan Bermaterai': 'Surat permohonan bermaterai 6000 (format PDF/DOC, max 2MB)',
  'Izin Usaha': 'Dokumen izin usaha jika ada (format PDF/JPG, max 2MB)',
  'Pas Foto 3X4 (latar Merah)': 'Pas foto terbaru ukuran 3x4 dengan latar belakang merah (format JPG/PNG, max 2MB)',
  'Surat Pernyataan tidak mampu dari RT/RW': 'Surat pernyataan tidak mampu dari RT/RW (format PDF/DOC, max 2MB)',
  'Rekening listrik/air 3 bulan terakhir': 'Rekening listrik/air 3 bulan terakhir (format PDF/DOC, max 2MB)',

};

export default function FormPengajuanSurat() {
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [formData, setFormData] = useState({
    noKK: '',
    noNIK: '',
    namaLengkap: '',
    alamat: '',
    keterangan: ''
  });
  
  // Inisialisasi state untuk file dan preview
  const initialFileState = Object.keys(documentDescriptions).reduce((acc, doc) => {
    return { ...acc, [doc]: null };
  }, {} as Record<string, File | null>);
  
  const initialPreviewState = Object.keys(documentDescriptions).reduce((acc, doc) => {
    return { ...acc, [doc]: null };
  }, {} as Record<string, string | null>);
  
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>(initialFileState);
  const [previews, setPreviews] = useState<Record<string, string | null>>(initialPreviewState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle perubahan jenis surat
  const handleLetterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLetter(e.target.value);
  };

  // Handle upload file
  const handleFileChange = (docType: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi file
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    const isDoc = file.type === 'application/msword' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    // Validasi tipe file
    if ((docType === 'KTP' || docType === 'KK' || docType === 'Pas Foto 3X4 (latar Merah)') && !isImage) {
      alert('Hanya file gambar yang diperbolehkan untuk KTP/KK!');
      return;
    }
    
    if ((docType.includes('Surat') || docType === 'Izin Usaha' || docType === 'Surat Pengantar RT/RW' || docType === 'Surat Permohonan Bermaterai'
  || docType === 'Surat Pernyataan tidak mampu dari RT/RW') && 
        !(isPDF || isDoc || isImage)) {
      alert('Hanya file PDF, DOC, atau gambar yang diperbolehkan!');
      return;
    }

    // Validasi ukuran file
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB!');
      return;
    }

    // Update state
    setSelectedFiles(prev => ({ ...prev, [docType]: file }));

    // Preview untuk gambar
    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews(prev => ({ ...prev, [docType]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      // Untuk non-gambar, set preview ke null
      setPreviews(prev => ({ ...prev, [docType]: null }));
    }
  };

  // Hapus file
  const removeFile = (docType: string) => {
    setSelectedFiles(prev => ({ ...prev, [docType]: null }));
    setPreviews(prev => ({ ...prev, [docType]: null }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validasi form
      if (!selectedLetter) {
        alert('Silakan pilih jenis surat!');
        return;
      }
      
      // Validasi data pribadi
      if (!formData.noKK || !formData.noNIK || !formData.namaLengkap || !formData.alamat) {
        alert('Harap lengkapi semua data pribadi!');
        return;
      }

      // Validasi file yang diperlukan
      const requiredDocs = documentRequirements[selectedLetter].docs;
      for (const doc of requiredDocs) {
        if (!selectedFiles[doc]) {
          alert(`Harap upload ${doc}!`);
          return;
        }
      }

      // Simulasi pengiriman data
      const formDataToSend = new FormData();
      
      // Tambahkan data pribadi
      formDataToSend.append('jenis_surat', documentRequirements[selectedLetter].label);
      formDataToSend.append('no_kk', formData.noKK);
      formDataToSend.append('no_nik', formData.noNIK);
      formDataToSend.append('nama_lengkap', formData.namaLengkap);
      formDataToSend.append('alamat', formData.alamat);
      formDataToSend.append('keterangan', formData.keterangan);
      
      // Tambahkan file
      requiredDocs.forEach(doc => {
        if (selectedFiles[doc]) {
          formDataToSend.append(doc, selectedFiles[doc] as File);
        }
      });

      // Simulasi API call
      console.log('Data yang dikirim:', Object.fromEntries(formDataToSend.entries()));
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Pengajuan surat berhasil dikirim!');
      
      // Reset form
      setSelectedLetter('');
      setFormData({
        noKK: '',
        noNIK: '',
        namaLengkap: '',
        alamat: '',
        keterangan: ''
      });
      setSelectedFiles(initialFileState);
      setPreviews(initialPreviewState);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengajukan surat');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dokumen yang diperlukan berdasarkan jenis surat
  const requiredDocuments = selectedLetter ? documentRequirements[selectedLetter].docs : [];

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
      
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-orange-500 p-6 text-white">
            <h1 className="text-2xl font-bold">Formulir Pengajuan Surat</h1>
            <p className="mt-2">Silakan lengkapi form berikut untuk mengajukan surat</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Informasi Pribadi */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Data Pribadi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor KK</label>
                  <input
                    type="text"
                    name="noKK"
                    placeholder="Masukkan Nomor KK"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    required
                    value={formData.noKK}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor NIK</label>
                  <input
                    type="text"
                    name="noNIK"
                    placeholder="Masukkan Nomor NIK"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    required
                    value={formData.noNIK}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="namaLengkap"
                  placeholder="Masukkan Nama Lengkap"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                  value={formData.namaLengkap}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  name="alamat"
                  placeholder="Masukkan Alamat Lengkap"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                  value={formData.alamat}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan Tambahan</label>
                <textarea
                  name="keterangan"
                  placeholder="Masukkan keterangan tambahan jika diperlukan"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition min-h-[100px]"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            {/* Pilihan Jenis Surat */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Jenis Surat</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Jenis Surat</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                  value={selectedLetter}
                  onChange={handleLetterChange}
                >
                  <option value="">-- Pilih Jenis Surat --</option>
                  {Object.entries(documentRequirements).map(([value, { label }]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              
              {selectedLetter && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-medium text-yellow-800">Persyaratan untuk {documentRequirements[selectedLetter].label}:</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-yellow-700">
                    {documentRequirements[selectedLetter].docs.map(doc => (
                      <li key={doc}>{doc} - {documentDescriptions[doc]}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Upload Dokumen */}
            {selectedLetter && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Upload Dokumen</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requiredDocuments.map((docType) => (
                    <div key={docType} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {docType} <span className="text-red-500">*</span>
                        <span className="block text-xs text-gray-500 mt-1">{documentDescriptions[docType]}</span>
                      </label>
                      
                      <div className="relative">
                        <input
                          type="file"
                          id={`upload-${docType}`}
                          onChange={handleFileChange(docType)}
                          accept={
                            docType === 'KTP' || docType === 'KK' || docType === 'Pas Foto 3X4 (latar Merah)' 
                              ? 'image/*' 
                              : '.pdf,.doc,.docx,image/*'
                          }
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor={`upload-${docType}`}
                          className={`block border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedFiles[docType] ? 'border-green-500 bg-green-50' : 'border-gray-300'
                          }`}
                        >
                          {selectedFiles[docType] ? (
                            <div className="flex flex-col items-center space-y-2">
                              <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-green-600 font-medium">File {docType} terpilih</span>
                              <span className="text-sm text-gray-500 truncate max-w-full">
                                {selectedFiles[docType]?.name}
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-sm text-gray-600">Klik untuk upload</p>
                              <p className="text-xs text-gray-500">
                                {documentDescriptions[docType]}
                              </p>
                            </div>
                          )}
                        </label>
                        
                        {selectedFiles[docType] && (
                          <button
                            type="button"
                            onClick={() => removeFile(docType)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                            title="Hapus file"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      {/* Preview untuk gambar */}
                      {previews[docType] && (
                        <div className="mt-2">
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
            )}
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-md hover:shadow-lg flex items-center justify-center ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Ajukan Sekarang'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}