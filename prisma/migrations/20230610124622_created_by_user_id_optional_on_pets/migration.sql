-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_created_by_user_id_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "created_by_user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
