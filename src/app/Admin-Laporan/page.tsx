"use client";

import React from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import { FaUser, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const barData = [
  { name: "Kurang mampu", value: 6 },
  { name: "Kehilangan", value: 3 },
  { name: "Belum Menikah", value: 4 },
  { name: "Usaha", value: 20 },
];

const pieData = [
  { name: "Diproses", value: 25 },
  { name: "Selesai", value: 75 },
];

const COLORS = {
  bar: "#4f46e5",
  pie: ["#FFD966", "#93E499"],
  cards: {
    incoming: "#3b82f6",
    outgoing: "#10b981",
    residents: "#ef4444"
  }
};

const LaporanAdmin = () => {
  return (
    <div 
      className="ml-64 min-h-screen bg-gradient-to-br from-yellow-50 to-white p-6"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <NavbarAdmin currentPath="/Admin-Laporan" />

      {/* Header Laporan + Profile */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 
          className="text-2xl font-bold text-gray-800"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Laporan
        </h1>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-full shadow-sm">
          <span className="text-gray-700">Indra</span>
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
            <img 
              src="/avatar.png" 
              className="w-full h-full object-cover" 
              alt="Profile" 
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="bg-yellow p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-800">Laporan Bulanan</h2>
            <select className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2">
              <option>Bulan</option>
              <option>April 2023</option>
              <option>Maret 2023</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '8px 12px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill={COLORS.bar}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-yellow p-6 rounded-xl shadow-md">
          <h2 className="font-bold text-lg text-gray-800 mb-4">Status Penyelesaian</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS.pie[index % COLORS.pie.length]} 
                      stroke="#fff"
                    />
                  ))}
                </Pie>
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '10px' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} surat`, 'Jumlah']}
                  contentStyle={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '8px 12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Info Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Surat Masuk Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Surat Masuk</p>
            <p className="text-xl font-bold text-gray-800">5</p>
          </div>
          <div className="p-3 rounded-full bg-blue-50 text-blue-600">
            <FaEnvelope className="text-xl" />
          </div>
        </div>

        {/* Surat Keluar Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Surat Keluar</p>
            <p className="text-xl font-bold text-gray-800">10</p>
          </div>
          <div className="p-3 rounded-full bg-green-50 text-green-600">
            <FaEnvelopeOpen className="text-xl" />
          </div>
        </div>

        {/* Warga Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500">Warga</p>
            <p className="text-xl font-bold text-gray-800">100</p>
          </div>
          <div className="p-3 rounded-full bg-red-50 text-red-600">
            <FaUser className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanAdmin;