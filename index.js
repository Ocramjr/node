import express from "express";
import userRoutes from "./routes/users.js";
import storesRoutes from "./routes/stores.js";
import productsRoutes from "./routes/products.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Users
app.use("/", userRoutes);

// Produtos
app.use("/", storesRoutes);

// Lojas
app.use("/", productsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});