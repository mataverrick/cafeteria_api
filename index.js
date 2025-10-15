const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const productosRoutes = require("./routes/productos");
const comprasRoutes = require("./routes/compras");

app.use("/productos", productosRoutes);
app.use("/compras", comprasRoutes);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`API escuchando en http://localhost:${PORT}`)
);