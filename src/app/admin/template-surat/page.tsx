"use client";

import React from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { FaEdit } from "react-icons/fa";

const TemplateSurat = () => {
  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-yellow-50 to-white p-8">
      {/* Navbar */}
      <NavbarAdmin currentPath="/admin/template-surat" />

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari Nama / Nomor Surat . . ."
          className="w-full max-w-xl px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <div className="ml-4 flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            {/* Avatar bisa ditambahkan di sini */}
          </div>
          <p className="ml-2 font-semibold text-gray-700">Indra</p>
        </div>
      </div>

      {/* Nama Keuchik */}
      <div className="flex items-center mb-8">
        <label className="mr-4 font-semibold text-gray-800">Nama Keuchik</label>
        <input
          type="text"
          defaultValue="Yushadi, S.Ag,"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button className="ml-4 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg transition">
          Simpan
        </button>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Surat Keterangan Kurang Mampu */}
        <div className="bg-[#BDB176] text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Surat Keterangan Kurang Mampu</h2>
          <p className="text-sm mt-1">Terakhir diubah: 12/04/2024</p>
          <button className="mt-4 bg-[#EBDDC6] text-black px-4 py-2 rounded-full font-semibold hover:brightness-110">
            Edit
          </button>
        </div>

        {/* Surat Keterangan Belum Menikah */}
        <div className="bg-[#68BAA6] text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Surat keterangan belum menikah</h2>
          <p className="text-sm mt-1">Terakhir diubah: 12/04/2024</p>
          <button className="mt-4 bg-[#C6EDD9] text-black px-4 py-2 rounded-full font-semibold hover:brightness-110">
            Edit
          </button>
        </div>

        {/* Surat Keterangan Kehilangan */}
        <div className="bg-[#797A9E] text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Surat keterangan kehilangan</h2>
          <p className="text-sm mt-1">Terakhir diubah: 12/04/2024</p>
          <button className="mt-4 bg-[#C6EDD9] text-black px-4 py-2 rounded-full font-semibold hover:brightness-110">
            Edit
          </button>
        </div>

        {/* Surat Keterangan Usaha */}
        <div className="bg-[#D9B4A9] text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Surat keterangan usaha</h2>
          <p className="text-sm mt-1">Terakhir diubah: 12/04/2024</p>
          <button className="mt-4 bg-[#E9E9C7] text-black px-4 py-2 rounded-full font-semibold hover:brightness-110">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSurat;
