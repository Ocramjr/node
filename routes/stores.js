import express from "express";

const router = express.Router();
const permissao = "admin";
const autenticacao = true;

/**
 * Validar todos os endpoints se estão logados e com a permissao de admin
 */


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
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "admin") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }
  return res.status(200).json(lojas);
});

router.get("/loja/:id", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }
  if (permissao !== "admin") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }

  const loja = lojas.find((loja) => loja.id === req.params.id)

  if(!loja){
    return res.status(400).json ({ message: "Loja não encontrada!" })
  }
 
  return res.status(200).json(loja);
});

router.get("/lojas/faturamento", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "admin") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  } 

  if(lojas.length < 1) {
    return res.status(200).json({ message: "Não há lojas cadastradas!" })
  }

  const faturamentoPorLojas = [];
  for (const loja of lojas) {
    faturamentoPorLojas.push({
      [loja.nome]: loja.faturamento,
    });
  }
  return res.status(200).json(faturamentoPorLojas);
});

router.post("/loja", (req, res) => {
  const loja = lojas.find((loja) => loja.id === req.body.id)
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "admin") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
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

  if (typeof req.body.faturamento === "string"){
    return res.status(400).json("O faturamento presica ser número!")
  }

  let fatuLoja = req.body;

  if(!req.body.faturamento) {
    fatuLoja = {
      ...req.body,
      faturamento : 0
    }
  }

  lojas.push(fatuLoja);

  return res.status(201).json(lojas);
});

router.delete("/loja/:id", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "admin") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }

  const idLoja = lojas.find((loja) => loja.id === req.params.id)

  if(!idLoja){
    return res.status(400).json ({ message: "Loja não encontrada para remoção!" })
  }

  const storeDeletado = lojas.splice(req.params.id - 1, 1);
  return res.status(200).json(storeDeletado[0].id);  
});

router.patch("/loja/:id", (req, res) => {
  if (!autenticacao) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  if (permissao !== "admin") {
    return res.status(403).json({ message: "Usuário não possui autenticação suficiente" })
  }

  const idLoja = lojas.find((loja) => loja.id === req.params.id)

  if(!idLoja){
    return res.status(400).json ({ message: "Loja não encontrada para inclusão!" })
  }

  const index = req.params.id - 1;
  lojas.splice(index, 1, {
    ...lojas[index],
    ...req.body,
  });
  return res.status(200).json(lojas);
});

export default router;