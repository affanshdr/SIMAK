"use client";

import { useState } from "react";
import { FiDownload, FiEye, FiPrinter, FiSearch } from "react-icons/fi";
import NavbarAdmin from "../../../components/NavbarAdmin";

export default function PengajuanMasukPage() {
  const arsipSurat = [
    {
      id: 1,
      nomorSurat: "001/2023",
      jenisSurat: "Keterangan Kurang Mampu",
      tanggalArsip: "2023-01-15",
      namaPemohon: "John Doe",
      status: "● Diproses",
    },
    {
      id: 2,
      nomorSurat: "002/2023",
      jenisSurat: "Surat Keterangan Domisili",
      tanggalArsip: "2023-02-10",
      namaPemohon: "Jane Smith",
      status: "● Selesai",
    },
    {
      id: 3,
      nomorSurat: "003/2023",
      jenisSurat: "Surat Keterangan Usaha",
      tanggalArsip: "2023-03-05",
      namaPemohon: "Alice Johnson",
      status: "● Selesai",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [jenisSurat, setJenisSurat] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [bulan, setBulan] = useState<string>("");

  const jenisSuratOptions = [
    "Semua Jenis Surat",
    "Keterangan Kurang Mampu",
    "Surat Keterangan Domisili",
    "Surat Keterangan Usaha",
    "Surat Keterangan Tidak Mampu",
  ];

  const statusOptions = ["Semua Status", "Diproses", "Selesai"];

  const bulanOptions = [
    "Semua Bulan",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const handleReset = () => {
    setJenisSurat("");
    setStatus("");
    setBulan("");
  };

  return (
    <div className="flex min-h-screen bg-yellow-100">
      <NavbarAdmin currentPath="/Admin/arsip" />

      <main
        className="flex-1 p-15 ml-64"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
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

        {/* Filter Section */}
        <div className=" p-4 rounded-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Jenis Surat Filter */}
            <div>
              <div className="relative">
                <select
                  value={jenisSurat}
                  onChange={(e) => setJenisSurat(e.target.value)}
                  className="w-full p-3 bg-blue-900 text-white rounded-full border-none shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                >
                  {jenisSuratOptions.map((option) => (
                    <option key={option} value={option} className="bg-blue-900">
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-3 bg-blue-900 text-white rounded-full border-none shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option} className="bg-blue-900">
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bulan Filter */}
            <div>
              
              <div className="relative">
                <select
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                  className="w-full p-3 bg-blue-900 text-white rounded-full border-none shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                >
                  {bulanOptions.map((option) => (
                    <option key={option} value={option} className="bg-blue-900">
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full shadow-md transition-colors duration-200 mt-1"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nomor Surat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jenis Surat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Arsip
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Pemohon
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {arsipSurat.map((surat) => (
                  <tr
                    key={surat.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {surat.nomorSurat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {surat.jenisSurat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {surat.tanggalArsip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {surat.namaPemohon}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          surat.status === "● Selesai"
                            ? " text-green-600"
                            : surat.status === "● Diproses"
                            ? "text-yellow-600"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {surat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 text-white transition-colors duration-200"
                        title="Cetak Surat"
                      >
                        <FiPrinter className="w-4 h-4" />
                        <span>Cetak</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
