const express = require("express");
const router = express.Router();
const { getCompras, crearCompra } = require("../controllers/comprasController");


router.get("/", getCompras);
router.post("/", crearCompra);

module.exports = router;
