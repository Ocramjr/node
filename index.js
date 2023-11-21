const express = require('express')
const app = express()
const port = 3000

const users = [
    {
        name: 'Marco',
        lastname: 'Junior',
        id: "1",
    },
    {
        name: 'Felipe',
        lastname: 'Tavares',
        id: "2",
    },
    {
        name: 'Isabele',
        lastname: 'Tavares',
        id: "3",
    }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/users/:id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id)
    if(user) {
        res.send(user)
    } else {
        res.send(`Usuário ${req.params.id} não foi encontrado`)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/**
 * Array de objetos
 * -> produtos
 * {
 *  nome: "Nome do produto",
 *  quantidade: 10,
 *  valorUnit: 150,
 * }
 * 
 * 
 * Um endpoint que mostre todos os produtos;
 * Um endpoint que mostre um produto específico;
 * Um endpoint que mostre o valor total do estoque por produto;
 */


const produtos = [
    {
        nome:"computador",
        quantidade: 10,
        valorUnit: 2000,

    },
    {
        nome:"disco-rigido",
        quantidade: 20,
        valorUnit: 100,

    },
    {
        nome:"teclado",
        quantidade: 15,
        valorUnit: 150,

    },
    {
        nome:"mouse",
        quantidade: 20,
        valorUnit: 100,

    },
    {
        nome:"gabinete",
        quantidade: 10,
        valorUnit: 200,

    },
]

app.get ('/produtos', (req, res) => {
    res.send (produtos)
})

app.get ('/produtos/valortotal', (req, res) => {
    const valorTotal = produtos.map((produto) => {
        return `${produto.nome} - Estoque em R$ ${produto.quantidade * produto.valorUnit},00` 
    })
    res.send(valorTotal)
})


app.get ('/produtos/:nome', (req, res) => {
    const espProduto = produtos.find((produto) => produto.nome === req.params.nome)
    if(espProduto) {
        res.send(espProduto)
    } else {
        res.send(`Produto ${req.params.nome} não foi encontrado`)
    }
})




// const todosTrodutos = produtos.map((produto) => {
//     return produto;
// })
// if (todosTrodutos){
//     req.send(todosTrodutos)
// } else {
//     res.send('Não foi encontrado produtos')
// }