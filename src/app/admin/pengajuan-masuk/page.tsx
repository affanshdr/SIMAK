"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import NavbarAdmin from "../../../components/NavbarAdmin";

type Pengajuan = {
  id: string;
  no: string;
  noKK: string;
  noNIK: string;
  jenisSurat: string;
  tanggalPengajuan: string;
  tanggalSelesai?: string;
  noSurat?: string;
  keterangan?: string;
  fileSurat?: string;
  status: "Diajukan" | "Diproses" | "Ditolak" | "Selesai";
};

export default function PengajuanMasukPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<
    "Diajukan" | "Diproses" | "Selesai" | "Ditolak"
  >("Diajukan");

  const [pengajuanData, setPengajuanData] = useState<Pengajuan[]>([
    {
      id: "1",
      no: "KM-001",
      noKK: "XXXXXX",
      noNIK: "XXXXXX",
      jenisSurat: "Keterangan Kurang Mampu",
      tanggalPengajuan: "20 Mar 2025",
      fileSurat: "Dokumen.pdf",
      status: "Diajukan"
    },
    {
      id: "2",
      no: "KM-002",
      noKK: "XXXXXX",
      noNIK: "XXXXXX",
      jenisSurat: "Keterangan Kurang Mampu",
      tanggalPengajuan: "20 Mar 2025",
      fileSurat: "Dokumen.pdf",
      status: "Diajukan"
    },
    {
      id: "3",
      no: "KM-010",
      noKK: "XXXXXX",
      noNIK: "XXXXXX",
      jenisSurat: "Keterangan Kurang Mampu",
      tanggalPengajuan: "20 Mar 2025",
      keterangan: "Pengajuan belum dapat diproses karena berkas yang dilampirkan tidak sesuai/tidak memenuhi persyaratan yang berlaku.",
      status: "Ditolak"
    },
    {
      id: "4",
      no: "KM-022",
      noKK: "XXXXXX",
      noNIK: "XXXXXX",
      jenisSurat: "Keterangan Kurang Mampu",
      tanggalPengajuan: "20 Mar 2025",
      keterangan: "Pengajuan belum dapat diproses karena berkas yang dilampirkan tidak sesuai/tidak memenuhi persyaratan yang berlaku.",
      status: "Ditolak"
    },
    {
        id: "5",
        no: "KM-001",
        noSurat: "SK/2024/001",
        noNIK: "XXXXXX",
        jenisSurat: "Keterangan Kurang Mampu",
        tanggalPengajuan: "20 Mar 2025",
        tanggalSelesai: "22 Mar 2025",
        fileSurat: "Dokumen.pdf",
        status: "Selesai",
        noKK: ""
    },
    {
        id: "6",
        no: "KM-002",
        noSurat: "SK/2024/002",
        noNIK: "XXXXXX",
        jenisSurat: "Keterangan Kurang Mampu",
        tanggalPengajuan: "20 Mar 2025",
        tanggalSelesai: "22 Mar 2025",
        fileSurat: "Dokumen.pdf",
        status: "Selesai",
        noKK: ""
    }
  ]);

  const handleProses = (id: string) => {
    setPengajuanData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: "Diproses" } : item
      )
    );
  };

  const handleTolak = (id: string) => {
    setPengajuanData(prevData =>
      prevData.map(item =>
        item.id === id ? { 
          ...item, 
          status: "Ditolak",
          keterangan: "Pengajuan belum dapat diproses karena berkas yang dilampirkan tidak sesuai/tidak memenuhi persyaratan yang berlaku."
        } : item
      )
    );
  };

  const handleSelesai = (id: string) => {
    setPengajuanData(prevData =>
      prevData.map(item =>
        item.id === id ? { 
          ...item, 
          status: "Selesai",
          tanggalSelesai: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          noSurat: `SK/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`
        } : item
      )
    );
  };

  const filteredData = pengajuanData.filter(item => item.status === activeStatus);

  return (
    <div className="flex min-h-screen bg-yellow-100">
      <NavbarAdmin currentPath="/Admin/Pengajuan-masuk" />

      <main className="flex-1 p-15 ml-64" style={{ fontFamily: "var(--font-poppins)" }}>
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-full max-w-md shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nama / Nomor Surat . . ."
              className="w-full pl-4 pr-10 py-3 border bg-white border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center space-x-3 ml-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-orange-400">
              <img
                src="/user-avatar.jpg"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">Indra</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-4 flex-col md:flex-row gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mb-6">
            {["Diajukan", "Diproses", "Selesai", "Ditolak"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status as any)}
                className={`
                  bg-white border-l-20 p-3 rounded-md shadow
                  ${
                    status === "Diajukan"
                      ? "border-blue-400"
                      : status === "Diproses"
                      ? "border-yellow-400"
                      : status === "Selesai"
                      ? "border-green-400"
                      : "border-red-400"
                  }
                  ${activeStatus === status ? "ring-2 ring-opacity-90" : ""}
                  ${
                    status === "Diajukan"
                      ? activeStatus === status
                        ? "ring-blue-300"
                        : "hover:bg-blue-50"
                      : status === "Diproses"
                      ? activeStatus === status
                        ? "ring-yellow-300"
                        : "hover:bg-yellow-50"
                      : status === "Selesai"
                      ? activeStatus === status
                        ? "ring-green-300"
                        : "hover:bg-green-50"
                      : activeStatus === status
                      ? "ring-red-300"
                      : "hover:bg-red-50"
                  }
                `}
              >
                <p
                  className={`font-medium ${
                    status === "Diajukan"
                      ? "text-blue-700"
                      : status === "Diproses"
                      ? "text-yellow-700"
                      : status === "Selesai"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {status}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-4">
          {activeStatus === "Diajukan" && "Surat Yang Diajukan"}
            {activeStatus === "Diproses" && "Surat Yang Diproses"}
            {activeStatus === "Ditolak" && "Surat Yang Ditolak"}
            {activeStatus === "Selesai" && "Surat Yang Sudah Diproses"}
          </h1>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            {activeStatus === "Diproses" && (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No KK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No NIK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Jenis Surat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tanggal Pengajuan</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">File Surat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{item.no}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noKK}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noNIK}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.jenisSurat}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.tanggalPengajuan}</td>
                      <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-800">
                        <a href="#" className="underline">{item.fileSurat}</a>
                      </td>
                      <td className="py-3 px-4 text-sm text-yellow-600 whitespace-nowrap">● Diproses</td>
                      <td className="py-3 px-4">
                        <button 
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          onClick={() => handleSelesai(item.id)}
                        >
                          Selesai
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeStatus === "Ditolak" && (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No KK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No NIK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Jenis Surat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tanggal Pengajuan</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Keterangan</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 ">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{item.no}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noKK}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noNIK}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.jenisSurat}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.tanggalPengajuan}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.keterangan}</td>
                      <td className="py-3 px-4 text-sm text-red-600 whitespace-nowrap">● Ditolak</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeStatus === "Selesai" && (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No Surat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No NIK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Jenis Surat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tanggal Pengajuan</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tanggal Selesai</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">File Surat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{item.no}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noSurat}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noNIK}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.jenisSurat}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.tanggalPengajuan}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.tanggalSelesai}</td>
                      <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-800">
                        <a href="#" className="underline">{item.fileSurat}</a>
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 whitespace-nowrap">● selesai</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeStatus === "Diajukan" && (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No KK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">No NIK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Jenis Surat</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">KTP</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">KK</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">RT/RW</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tanggal Pengajuan</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{item.no}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noKK}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.noNIK}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.jenisSurat}</td>
                      <td className="py-3 px-4 text-center text-sm">
                        <span className="inline-block w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        <span className="inline-block w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-sm">
                        <span className="inline-block w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.tanggalPengajuan}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            onClick={() => handleProses(item.id)}
                          >
                            Proses
                          </button>
                          <button 
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            onClick={() => handleTolak(item.id)}
                          >
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}