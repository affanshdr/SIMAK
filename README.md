# SIMAK - Sistem Informasi Manajemen Administrasi Kependudukan

![image](https://github.com/user-attachments/assets/537fa1f5-1d87-4604-985b-d586e1aa40a3)

Sistem Informasi untuk mempermudah pengurusan surat keterangan di tingkat desa/kelurahan dengan database SQLite.

## Fitur Utama
✅ Pengajuan surat online (Domisili, Usaha, Belum Menikah, Tidak Mampu)  
✅ Tracking status pengajuan (Diajukan - Diproses - Selesai/Ditolak)  
✅ Manajemen dokumen digital  
✅ Antarmuka admin dan warga  

## Teknologi
- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (file-based, no server required)
- **ORM**: Prisma
- **Authentication**: NextAuth.js

## 🚀 Instalasi Cepat

1. **Clone repository**:
   ```bash
   git clone https://github.com/affanshdr/SIMAK.git
   cd simak

2. **Install dependencies**:
   ```bash
  npm install

3. **Jalankan migrasi database**:
   ```bash
  npx prisma migrate dev --name init
  npx prisma generate

4. **Cara menjalankan**:
   ```bash
  npm run dev

5. **Database GUI:**:
   ```bash
  npx prisma studio
