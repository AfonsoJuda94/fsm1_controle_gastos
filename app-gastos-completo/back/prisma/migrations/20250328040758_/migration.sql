-- CreateTable
CREATE TABLE "Compartilhado" (
    "id" TEXT NOT NULL,
    "emails" TEXT[],

    CONSTRAINT "Compartilhado_pkey" PRIMARY KEY ("id")
);
