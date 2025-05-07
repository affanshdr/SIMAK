"use client";

import React from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import { FaUser, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const data = [
  { name: 'Jan', masuk: 20, keluar: 15, pengguna: 25 },
  { name: 'Feb', masuk: 25, keluar: 22, pengguna: 30 },
  { name: 'Mar', masuk: 40, keluar: 38, pengguna: 45 },
  { name: 'Apr', masuk: 55, keluar: 50, pengguna: 60 },
  { name: 'Mei', masuk: 65, keluar: 60, pengguna: 70 },
  { name: 'Jun', masuk: 60, keluar: 65, pengguna: 75 },
  { name: 'Jul', masuk: 70, keluar: 68, pengguna: 80 },
  { name: 'Agu', masuk: 50, keluar: 45, pengguna: 70 },
  { name: 'Sep', masuk: 45, keluar: 40, pengguna: 70 },
  { name: 'Okt', masuk: 60, keluar: 55, pengguna: 80 },
  { name: 'Nov', masuk: 75, keluar: 70, pengguna: 90 },
  { name: 'Des', masuk: 85, keluar: 80, pengguna: 100 },
];

const DashboardAdmin = () => {
  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-yellow-50 to-white p-15">
      {/* Navbar */}
      <NavbarAdmin currentPath="/Admin-Dashboard" />

      {/* Search + Profile */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari Nama / Nomor Surat . . ."
          className="w-1/2 p-3 rounded border shadow-sm"
        />
        <div className="flex items-center space-x-3">
          <span>Indra</span>
          <img src="/avatar.png" className="w-10 h-10 rounded-full" alt="Avatar" />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-green-200 text-green-800 px-4 py-3 rounded-md mb-6 shadow">
        <p className="flex items-center gap-2">
          <FaUser />
          Selamat datang kembali <strong>Indra</strong> di Aplikasi SIMAK, anda login sebagai <strong>Admin</strong>
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="masuk" fill="#00C2CB" name="Surat Masuk" />
            <Bar dataKey="keluar" fill="#55D187" name="Surat Keluar" />
            <Bar dataKey="pengguna" fill="#D17373" name="Pengguna" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyan-100 border-l-4 border-cyan-400 p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-cyan-700 font-bold">Surat Masuk</p>
            <p className="text-xl">3</p>
          </div>
          <FaEnvelope className="text-cyan-700 text-2xl" />
        </div>

        <div className="bg-green-100 border-l-4 border-green-400 p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-green-700 font-bold">Surat Keluar</p>
            <p className="text-xl">5</p>
          </div>
          <FaEnvelopeOpen className="text-green-700 text-2xl" />
        </div>

        <div className="bg-rose-100 border-l-4 border-rose-400 p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-rose-700 font-bold">Pengguna</p>
            <p className="text-xl">12</p>
          </div>
          <FaUser className="text-rose-700 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
