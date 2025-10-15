const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.compra.deleteMany({});
  await prisma.producto.deleteMany({});

  const productos = await prisma.producto.createMany({
    data: [
      { nombre: "Café Americano", precio: 25 },
      { nombre: "Café Latte", precio: 35 },
      { nombre: "Capuchino", precio: 40 },
      { nombre: "Té Chai", precio: 30 },
      { nombre: "Pastel de Chocolate", precio: 45 },
    ],
  });

  const primeraCompra = await prisma.compra.create({
    data: {
      productoId: 1,
      cantidad: 2,
      total: 50,
    },
  });

  const segundaCompra = await prisma.compra.create({
    data: {
      productoId: 3,
      cantidad: 1,
      total: 40,
    },
  });

  const terceraCompra = await prisma.compra.create({
    data: {
      productoId: 5,
      cantidad: 1,
      total: 45,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
