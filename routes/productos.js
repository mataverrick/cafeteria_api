const express = require("express");
const router = express.Router();
const {
  getProductos,
  postProducto,
  updateProducto,
  deleteProducto
} = require("../controllers/productosController");

router.get("/", getProductos);
router.post("/", postProducto);
router.put("/:id",updateProducto)
router.delete("/:id",deleteProducto)

module.exports = router;
