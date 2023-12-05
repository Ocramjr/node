import express from "express";

const router = express.Router();

const lojas = [
  {
    id: "1",
    nome: "Loja 1",
    faturamento: 1500,
  },
  {
    id: "2",
    nome: "Loja 2",
    faturamento: 3000,
  },
  {
    id: "3",
    nome: "Loja 3",
    faturamento: 10000,
  },
  {
    id: "4",
    nome: "Loja 4",
    faturamento: 800,
  },
  {
    id: "5",
    nome: "Loja 5",
    faturamento: 100000,
  },
];

router.get("/lojas", (req, res) => {
  res.status(200).json(lojas);
});

router.get("/loja/:id", (req, res) => {
  const loja = lojas.find((loja) => loja.id === req.params.id);
  res.status(200).json(loja);
});

router.get("/lojas/faturamento", (req, res) => {
  const faturamentoPorLojas = [];
  for (const loja of lojas) {
    faturamentoPorLojas.push({
      [loja.nome]: loja.faturamento,
    });
  }
  res.status(200).json(faturamentoPorLojas);
});

router.post("/loja", (req, res) => {
  const autenticacao = true;
  const loja = lojas.find((loja) => loja.id === req.body.id)
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (!req.body.id) {
    return res.status(400).json({ mensagem: "Id não identificado!" });
  }

  if (loja) {
    return res.status(400).json({ mensagem: "ID já cadastrado!" });
  }

  if (!req.body.nome) {
    return res.status(400).json({ mensagem: "Nome da loja é obrigatório!" });
  }
  lojas.push(req.body);
  return res.status(201).json(lojas);
});

router.delete("/loja/:id", (req, res) => {
  const storeDeletado = lojas.splice(req.params.id - 1, 1);
  res.status(200).json(storeDeletado[0].id);  
});

router.patch("/loja/:id", (req, res) => {
  const index = req.params.id - 1;
  lojas.splice(index, 1, {
    ...lojas[index],
    ...req.body,
  });
  res.status(200).json(lojas);
});

export default router;