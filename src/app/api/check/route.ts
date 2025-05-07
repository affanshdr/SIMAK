import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const noNIK = searchParams.get('noNIK');
    const noKK = searchParams.get('noKK');

    // Validasi parameter
    if (!noNIK && !noKK) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Parameter dibutuhkan',
          message: 'Harap masukkan noNIK atau noKK' 
        },
        { status: 400 }
      );
    }

    // Validasi format NIK
    if (noNIK && !/^\d{16}$/.test(noNIK)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Format NIK tidak valid',
          message: 'NIK harus 16 digit angka' 
        },
        { status: 400 }
      );
    }

    // Validasi format KK
    if (noKK && !/^\d{16}$/.test(noKK)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Format KK tidak valid',
          message: 'Nomor KK harus 16 digit angka' 
        },
        { status: 400 }
      );
    }

    // Logika pengecekan data
    let result;
    if (noNIK && noKK) {
      // Cek apakah NIK dan KK sesuai dengan satu warga yang sama
      result = await prisma.warga.findFirst({
        where: {
          AND: [
            { no_nik: noNIK },
            { no_kk: noKK }
          ]
        },
        select: {
          id: true,
          no_nik: true,
          no_kk: true,
          nama: true,
          alamat: true
        }
      });

      return NextResponse.json({
        success: true,
        exists: !!result,
        is_match: !!result, // true jika NIK dan KK cocok dengan satu warga
        data: result || null
      });

    } else if (noNIK) {
      // Cek berdasarkan NIK saja
      result = await prisma.warga.findUnique({
        where: { no_nik: noNIK },
        select: {
          id: true,
          no_nik: true,
          no_kk: true,
          nama: true,
          alamat: true
        }
      });

      return NextResponse.json({
        success: true,
        exists: !!result,
        data: result || null
      });

    } else {
      // Cek berdasarkan KK saja
      result = await prisma.warga.findFirst({
        where: noKK ? { no_kk: noKK } : undefined,
        select: {
          id: true,
          no_nik: true,
          no_kk: true,
          nama: true,
          alamat: true
        }
      });

      return NextResponse.json({
        success: true,
        exists: !!result,
        data: result || null
      });
    }

  } catch (error) {
    console.error('Error checking warga:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'Gagal memeriksa data warga' 
      },
      { status: 500 }
    );
  }
}