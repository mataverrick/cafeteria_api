-- DropForeignKey
ALTER TABLE "public"."Compra" DROP CONSTRAINT "Compra_productoId_fkey";

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
