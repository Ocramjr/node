import express from "express";

const router = express.Router();

const permissao = "vendedor";
const autenticacao = true;

/**
 * Validar todos os endpoints se estão logados e com a permissao vendedor
 */

const produtos = [
  {
    id: "1",
    nome: "Teclado",
    quantidade: 15,
    valorUnit: 19,
  },
  {
    id: "2",
    nome: "Monitor",
    quantidade: 6,
    valorUnit: 200,
  },
  {
    id: "3",
    nome: "Pen drive",
    quantidade: 100,
    valorUnit: 32,
  },
  {
    id: "4",
    nome: "Cadeira",
    quantidade: 3,
    valorUnit: 900,
  },
  {
    id: "5",
    nome: "Notebook",
    quantidade: 4,
    valorUnit: 3200,
  },
];

router.get("/produtos", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  res.status(200).json({
    data: produtos,
    mensagem: "Produtos encontrados com sucesso!",
    pagination: {
        page: 1,
        perPage: 10,
    }
  });
});

router.get("/produto/:id", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  const produto = produtos.find((produto) => produto.id === req.params.id);
  res.status(200).json({
    data:produto,
    mensagem: "Produto encontrado com sucesso!"
  });
});

router.get("/produtos/total-estoque", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "vendedor") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }
  const estoqueProdutos = produtos.map((produto) => {
    return {
      [produto.nome]: produto.quantidade * produto.valorUnit,
    };
  });
  res.status(200).json(estoqueProdutos);
});

router.post("/produto", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "vendedor") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }
  produtos.push(req.body);
  res.status(201).json(produtos);
});

router.delete("/produto/:id", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "vendedor") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }
  const prodDeletado = produtos.splice(req.params.id - 1, 1);
  res.status(200).json(prodDeletado);
});

router.patch("/produto/:id", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "vendedor") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }
  const index = req.params.id - 1;
  produtos.splice(index, 1, {
    ...produtos[index],
    ...req.body,
  });
  res.status(200).json(produtos);
});

export default router;