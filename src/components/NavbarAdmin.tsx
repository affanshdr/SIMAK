import React from "react";
import { FaHome, FaInbox, FaArchive, FaFileAlt, FaChartBar, FaUser, FaPowerOff } from "react-icons/fa";

const NavbarAdmin = () => {
  return (
    <div className="w-64 h-screen bg-[#FFF2E3] text-black fixed left-0 top-0 p-6 shadow-md">
      {/* Logo & Title */}
      <div className="mb-10 flex items-center space-x-3">
        <img src="/logo-simak.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-[#FF8C42]">SIMAK</h1>
      </div>

      <nav className="space-y-6">
        <div>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 font-semibold text-lg text-black">
              <FaHome />
              <span>Dashboard</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">SURAT</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3 hover:text-orange-500 cursor-pointer"><FaInbox /><span>Pengajuan Masuk</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-500 cursor-pointer"><FaArchive /><span>Arsip</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-500 cursor-pointer"><FaFileAlt /><span>Template Surat</span></li>
            <li className="flex items-center space-x-3 hover:text-orange-500 cursor-pointer"><FaChartBar /><span>Laporan</span></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm text-gray-500 uppercase tracking-wide mt-6 mb-2">PENGATURAN</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3 hover:text-orange-500 cursor-pointer"><FaUser /><span>Data Warga</span></li>
            <li className="flex items-center space-x-3 text-red-600 hover:text-red-800 cursor-pointer"><FaPowerOff /><span>Keluar</span></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
