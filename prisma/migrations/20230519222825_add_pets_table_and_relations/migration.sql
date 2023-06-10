-- CreateEnum
CREATE TYPE "PetSex" AS ENUM ('F', 'M');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'SMALL_MEDIUM', 'MEDIUM', 'MEDIUM_LARGE', 'LARGE');

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "sex" "PetSex",
    "size" "PetSize",
    "castrated" BOOLEAN,
    "views" INTEGER NOT NULL DEFAULT 0,
    "age" SMALLINT,
    "created_by_user_id" INTEGER NOT NULL,
    "adopted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
