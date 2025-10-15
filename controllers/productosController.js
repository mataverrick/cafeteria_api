const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProductos = async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postProducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || precio === undefined) {
      return res
        .status(400)
        .json({ error: "Faltan campos: 'nombre' o 'precio'" });
    }

    const producto = await prisma.producto.create({
      data: {
        nombre,
        precio: parseFloat(precio),
      },
    });

    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  const producto = await prisma.producto.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nombre,
      precio: parseFloat(precio),
    },
  });
  res.json(producto);
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await prisma.producto.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      message: "Producto y sus compras asociadas eliminados correctamente",
      producto,
    });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({
        error:
          "No se puede eliminar el producto porque tiene compras asociadas",
      });
    }

    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductos, postProducto, updateProducto, deleteProducto };
