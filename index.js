import express from "express";
import userRoutes from "./routes/users.js";
import storesRoutes from "./routes/stores.js";
import productsRoutes from "./routes/products.js";
import receivablesRoutes from "./routes/receivables.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LOGGED");
});

// Users
app.use("/", userRoutes);

// Produtos
app.use("/", productsRoutes);

// Lojas
app.use("/", storesRoutes);

// Contas à Receber
app.use("/", receivablesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});