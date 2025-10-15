const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCompras = async (req, res) => {
  try {
    const compras = await prisma.compra.findMany({
      include: { producto: true },
      orderBy: { fecha: 'desc' },
    });
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearCompra = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    const producto = await prisma.producto.findUnique({ where: { id: productoId } });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const total = producto.precio * cantidad;

    const compra = await prisma.compra.create({
      data: {
        productoId,
        cantidad,
        total,
      },
    });

    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCompras, crearCompra };
