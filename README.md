# SIMAK - Sistem Informasi Manajemen Administrasi Kependudukan

**Kelompok : 4**

**Anggota** :

1. Aulia Vika Rahman (2208107010001)

2. Nitiya Rihadatul ‘Aisy (2108107010003)

3. Affan Suhendar (2308107010003)

4. Adinda Muarriva (2308107010001)

![image](https://github.com/user-attachments/assets/c06f8814-2f0d-4c7c-8986-bb2bcf9ee265)

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
   npx prisma generate```
4. **Cara menjalankan**:
   ```bash
   npm run dev
5. **Database GUI:**:
   ```bash
   npx prisma studio

