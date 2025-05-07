import { NextResponse } from "next/server";
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();



export async function GET() {
  try {
    const warga = await prisma.warga.findMany();
    return NextResponse.json(warga);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data warga" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body); // Untuk debugging

    // Validasi data wajib
    const requiredFields = ['nama_lengkap', 'no_nik', 'no_kk', 'alamat', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Field wajib tidak lengkap: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validasi format NIK dan KK (16 digit angka)
    if (!/^\d{16}$/.test(body.no_nik) || !/^\d{16}$/.test(body.no_kk)) {
      return NextResponse.json(
        { error: "NIK dan No. KK harus 16 digit angka" },
        { status: 400 }
      );
    }

    // Cek duplikasi NIK
    const existingWarga = await prisma.warga.findUnique({
      where: { no_nik: body.no_nik },
    });

    if (existingWarga) {
      return NextResponse.json(
        { error: "NIK sudah terdaftar" },
        { status: 400 }
      );
    }

    // Simpan data ke database
    const newWarga = await prisma.warga.create({
      data: {
        nama: body.nama_lengkap, // Konversi dari nama_lengkap (frontend) ke nama (database)
        no_nik: body.no_nik,
        no_kk: body.no_kk,
        alamat: body.alamat,
        tempat_lahir: body.tempat_lahir,
        tanggal_lahir: new Date(body.tanggal_lahir), // Konversi string ke Date
        jenis_kelamin: body.jenis_kelamin,
        agama: body.agama
      }
    });

    return NextResponse.json(newWarga, { status: 201 });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data warga" },
      { status: 500 }
    );
  }
}