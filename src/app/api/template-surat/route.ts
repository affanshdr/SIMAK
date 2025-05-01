// src/app/api/template-surat/route.ts
import { NextResponse } from 'next/server';

let templateSurat = [
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
  
  templateSurat = templateSurat.map(template => 
    template.id === updated.id ? updated : template
  );
  
  return NextResponse.json(templateSurat);
}

export async function POST(request: Request) {
  const newTemplate = await request.json();
  

  newTemplate.id = newTemplate.judul.toLowerCase().replace(/\s+/g, '-');
  newTemplate.terakhirDiubah = new Date().toISOString().split('T')[0];
  

  if (!newTemplate.warna) {
    const colors = ['#BDB176', '#68BAA6', '#797A9E', '#D9B4A9'];
    newTemplate.warna = colors[Math.floor(Math.random() * colors.length)];
  }
  if (!newTemplate.warnaBtn) {
    const btnColors = ['#EBDDC6', '#C6EDD9', '#E9E9C7'];
    newTemplate.warnaBtn = btnColors[Math.floor(Math.random() * btnColors.length)];
  }
  

  templateSurat.push(newTemplate);
  

  return NextResponse.json(templateSurat);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  

  templateSurat = templateSurat.filter(template => template.id !== id);
  

  return NextResponse.json(templateSurat);
}