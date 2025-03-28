/*
  Warnings:

  - Added the required column `nome` to the `Compartilhado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Compartilhado" ADD COLUMN     "nome" TEXT NOT NULL;
