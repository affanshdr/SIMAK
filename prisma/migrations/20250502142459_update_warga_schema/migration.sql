/*
  Warnings:

  - The primary key for the `TemplateSurat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `terakhirDiubah` on the `TemplateSurat` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Added the required column `updatedAt` to the `TemplateSurat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warna` to the `TemplateSurat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warnaBtn` to the `TemplateSurat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Warga" ADD COLUMN "agama" TEXT;
ALTER TABLE "Warga" ADD COLUMN "jenis_kelamin" TEXT;
ALTER TABLE "Warga" ADD COLUMN "tanggal_lahir" DATETIME;
ALTER TABLE "Warga" ADD COLUMN "tempat_lahir" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemplateSurat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "terakhirDiubah" DATETIME NOT NULL,
    "warna" TEXT NOT NULL,
    "warnaBtn" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TemplateSurat" ("id", "judul", "terakhirDiubah") SELECT "id", "judul", "terakhirDiubah" FROM "TemplateSurat";
DROP TABLE "TemplateSurat";
ALTER TABLE "new_TemplateSurat" RENAME TO "TemplateSurat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
