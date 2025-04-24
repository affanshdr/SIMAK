"use client";

import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import { FaEdit } from "react-icons/fa";

const TemplateSurat = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  // Ambil data dari API saat pertama kali halaman dibuka
  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await fetch("/api/template-surat");
      const data = await res.json();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleEditClick = (item: any) => {
    setSelectedTemplate(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    await fetch("/api/template-surat", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedTemplate),
    });

    // Update tampilan setelah edit
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === selectedTemplate.id ? selectedTemplate : item
      )
    );

    setShowModal(false);
  };

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
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden" />
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
        {templates.map((item) => (
          <div
            key={item.id}
            className="bg-[#BDB176] text-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-lg font-semibold">{item.judul}</h2>
            <p className="text-sm mt-1">Terakhir diubah: {item.terakhirDiubah}</p>
            <button
              className="mt-4 bg-[#EBDDC6] text-black px-4 py-2 rounded-full font-semibold hover:brightness-110"
              onClick={() => handleEditClick(item)}
            >
              <FaEdit className="inline mr-2" /> Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal Edit */}
      {showModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Edit Template</h2>
            <label className="block mb-2">Judul Surat</label>
            <input
              type="text"
              value={selectedTemplate.judul}
              onChange={(e) =>
                setSelectedTemplate({
                  ...selectedTemplate,
                  judul: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <label className="block mb-2">Terakhir Diubah</label>
            <input
              type="date"
              value={selectedTemplate.terakhirDiubah}
              onChange={(e) =>
                setSelectedTemplate({
                  ...selectedTemplate,
                  terakhirDiubah: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSurat;
