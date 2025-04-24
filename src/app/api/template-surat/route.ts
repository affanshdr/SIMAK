// src/app/api/template-surat/route.ts
import { NextResponse } from 'next/server';

const templateSurat = [
  {
    id: 'kurang-mampu',
    judul: 'Surat Keterangan Kurang Mampu',
    terakhirDiubah: '2024-04-12',
    warna: '#BDB176',
    warnaBtn: '#EBDDC6'
  },
  {
    id: 'belum-menikah',
    judul: 'Surat Keterangan Belum Menikah',
    terakhirDiubah: '2024-04-12',
    warna: '#68BAA6',
    warnaBtn: '#C6EDD9'
  },
  {
    id: 'kehilangan',
    judul: 'Surat Keterangan Kehilangan',
    terakhirDiubah: '2024-04-12',
    warna: '#797A9E',
    warnaBtn: '#C6EDD9'
  },
  {
    id: 'usaha',
    judul: 'Surat Keterangan Usaha',
    terakhirDiubah: '2024-04-12',
    warna: '#D9B4A9',
    warnaBtn: '#E9E9C7'
  }
];

export async function GET() {
  return NextResponse.json(templateSurat);
}

export async function PUT(request: Request) {
    const updated = await request.json();
  
    // Simulasi update: kamu bisa sambungkan ke database di sini nanti
    console.log("Update data template:", updated);
  
    return NextResponse.json({ success: true });
  }