"use client";

import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { FaEdit, FaPlus, FaTrash, FaEye } from "react-icons/fa";

interface Template {
  id: string;
  judul: string;
  terakhirDiubah: string;
  warna: string;
  warnaBtn: string;
  konten?: string;
}

const TemplateSurat = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState<Omit<Template, "id">>({
    judul: "",
    terakhirDiubah: new Date().toISOString().split('T')[0],
    warna: "#22c55e", // Default green color
    warnaBtn: "#16a34a" // Darker green for button
  });

  // Fetch templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await fetch("/api/template-surat");
      const data = await res.json();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleEditClick = (item: Template) => {
    setSelectedTemplate(item);
    setShowModal(true);
  };

  const handleViewClick = (item: Template) => {
    setSelectedTemplate(item);
    setShowViewModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setTemplateToDelete(id);
    setShowDeleteModal(true);
  };

  const handleAddClick = () => {
    setNewTemplate({
      judul: "",
      terakhirDiubah: new Date().toISOString().split('T')[0],
      warna: "#22c55e",
      warnaBtn: "#16a34a"
    });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    const response = await fetch("/api/template-surat", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...selectedTemplate,
        terakhirDiubah: new Date().toISOString().split('T')[0]
      }),
    });

    if (response.ok) {
      const updatedTemplate = await response.json();
      setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
    }
    setShowModal(false);
  };

  const handleAddTemplate = async () => {
    const response = await fetch("/api/template-surat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTemplate),
    });

    if (response.ok) {
      const addedTemplate = await response.json();
      setTemplates([...templates, addedTemplate]);
      setShowAddModal(false);
    }
  };

  const handleDeleteTemplate = async () => {
    if (!templateToDelete) return;

    const response = await fetch(`/api/template-surat?id=${templateToDelete}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTemplates(templates.filter(t => t.id !== templateToDelete));
    }
    setShowDeleteModal(false);
    setTemplateToDelete(null);
  };

  const warna = '#8B8B8B';

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-green-500 to-white p-8">
      {/* Navbar */}
      <NavbarAdmin currentPath="/admin/template-surat" />

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari Nama / Nomor Surat . . ."
          className="w-full max-w-xl px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          style={{ color: warna }}
        />
        <div className="ml-4 flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden" />
          <p className="ml-2 font-semibold text-gray-700">Admin</p>
        </div>
      </div>

      {/* Nama Keuchik */}
      <div className="flex items-center mb-8">
        <label className="mr-4 font-semibold" style={{ color: warna }}>Nama Keuchik</label>
        <input
          type="text"
          defaultValue="Yushadi, S.Ag,"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          style={{ color: warna }}
        />
        <button className="ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition">
          Simpan
        </button>
      </div>

      {/* Add Template Button */}
      <div className="mb-6">
        <button
          onClick={handleAddClick}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          <FaPlus className="mr-2" /> Tambah Template
        </button>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((item) => (
          <div
            key={item.id}
            className="text-white p-6 rounded-xl shadow-md relative"
            style={{ backgroundColor: item.warna }}
          >
            <h2 className="text-lg font-semibold">{item.judul}</h2>
            <p className="text-sm mt-1 opacity-90">Terakhir diubah: {new Date(item.terakhirDiubah).toLocaleDateString('id-ID')}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <button
                className="px-4 py-2 rounded-full font-semibold hover:brightness-110 flex items-center"
                style={{ backgroundColor: item.warnaBtn }}
                onClick={() => handleViewClick(item)}
              >
                <FaEye className="inline mr-2" /> Lihat
              </button>
              <button
                className="px-4 py-2 rounded-full font-semibold hover:brightness-110 flex items-center"
                style={{ backgroundColor: item.warnaBtn }}
                onClick={() => handleEditClick(item)}
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 flex items-center"
                onClick={() => handleDeleteClick(item.id)}
              >
                <FaTrash className="inline mr-2" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit */}
      {showModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4" style={{ color: warna }}>Edit Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2" style={{ color: warna }}>Judul Surat</label>
                <input
                  type="text"
                  value={selectedTemplate.judul}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      judul: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  style={{ color: warna }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: warna }}>Warna Latar</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={selectedTemplate.warna}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        warna: e.target.value,
                      })
                    }
                    className="w-10 h-10 border rounded mr-2"
                  />
                  <span>{selectedTemplate.warna}</span>
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: warna }}>Warna Tombol</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={selectedTemplate.warnaBtn}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        warnaBtn: e.target.value,
                      })
                    }
                    className="w-10 h-10 border rounded mr-2"
                  />
                  <span>{selectedTemplate.warnaBtn}</span>
                </div>
              </div>
            </div>
            <label className="block mb-2" style={{ color: warna }}>Konten Surat</label>
            <textarea
              value={selectedTemplate.konten || ""}
              onChange={(e) =>
                setSelectedTemplate({
                  ...selectedTemplate,
                  konten: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4 h-40"
              style={{ color: warna }}
              placeholder="Masukkan konten template surat..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal View Template */}
      {showViewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4" style={{ color: warna }}>Preview Template: {selectedTemplate.judul}</h2>
            
            {/* Letter Template Preview */}
            <div className="border border-gray-200 p-8 rounded-lg">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">SURAT {selectedTemplate.judul.toUpperCase()}</h1>
                <p className="text-sm">Nomor: .../.../...</p>
              </div>
              
              <div className="mb-8">
                {selectedTemplate.konten ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedTemplate.konten }} />
                ) : (
                  <p className="text-gray-500 italic">Template kosong</p>
                )}
              </div>
              
              <div className="flex justify-end mt-12">
                <div className="text-center">
                  <p className="mb-12">Hormat kami,</p>
                  <p className="font-bold">Yushadi, S.Ag</p>
                  <p>Keuchik Gampong</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Template */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4" style={{ color: warna }}>Tambah Template Baru</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2" style={{ color: warna }}>Judul Surat*</label>
                <input
                  type="text"
                  value={newTemplate.judul}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      judul: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  style={{ color: warna }}
                  placeholder="Contoh: Surat Keterangan"
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: warna }}>Warna Latar</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={newTemplate.warna}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        warna: e.target.value,
                      })
                    }
                    className="w-10 h-10 border rounded mr-2"
                  />
                  <span>{newTemplate.warna}</span>
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: warna }}>Warna Tombol</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={newTemplate.warnaBtn}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        warnaBtn: e.target.value,
                      })
                    }
                    className="w-10 h-10 border rounded mr-2"
                  />
                  <span>{newTemplate.warnaBtn}</span>
                </div>
              </div>
            </div>
            <label className="block mb-2" style={{ color: warna }}>Konten Surat</label>
            <textarea
              value={newTemplate.konten || ""}
              onChange={(e) =>
                setNewTemplate({
                  ...newTemplate,
                  konten: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4 h-40"
              style={{ color: warna }}
              placeholder="Masukkan konten template surat..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleAddTemplate}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Tambah Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Template */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-6">Apakah Anda yakin ingin menghapus template ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteTemplate}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSurat;