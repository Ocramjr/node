import express from "express";

const router = express.Router();

const users = [
  {
    name: "Samuel",
    lastName: "Lopes",
    id: "1",
  },
  {
    name: "Samuel",
    lastName: "Lopes",
    id: "2",
  },
  {
    name: "Samuel",
    lastName: "Lopes",
    id: "3",
  },
];

router.get("/users", (req, res) => {
  res.status(200).json(users);
});

router.get("/user/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.send(`Usuário ${req.params.id} não encontrado`);
  }
});

export default router;
