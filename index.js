import express from "express"
const app = express()
const port = 3000

app.use(express.json());

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
 * Um endpoint que cadastre um novo produto
 */


const produtos = [
    {
        id: "1",
        nome:"computador",
        quantidade: 10,
        valorUnit: 2000,

    },
    {
        id: "2",
        nome:"disco-rigido",
        quantidade: 20,
        valorUnit: 100,

    },
    {
        id: "3",
        nome:"teclado",
        quantidade: 15,
        valorUnit: 150,

    },
    {
        id: "4",
        nome:"mouse",
        quantidade: 20,
        valorUnit: 100,

    },
    {
        id: "5",
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
        return {
            [produto.nome]: produto.quantidade * produto.valorUnit,
        } 
    })
    res.send(valorTotal)
})


app.get ('/produto/:id', (req, res) => {
    const espProduto = produtos.find((produto) => produto.id === req.params.id)
    if(espProduto) {
        res.send(espProduto)
    } else {
        res.send(`Produto ${req.params.id} não foi encontrado`)
    }
})

app.post("/produto", (req, res) => {
    produtos.push(req.body)
    res.json(produtos)
})


/**
 * Array de objetos
 * -> Lojas
 * {
 *  id: "1"
 *  nome: "Nome da Loja",
 *  endereco: "Av. Luz",
 *  faturamento: 150,
 * }
 * 
 * 
 * Um endpoint que mostre todos as lojas;
 * Um endpoint que mostre uma loja específica;
 * Um endpoint que mostre o valor total do faturamento das lojas;
 * Um endpoint que cadastre uma nova loja
 */

const lojas = [
    {
        id: "1",
        nome: "North Shopping",
        endereco: "Av. Bezerra de Menezes",
        faturamento: 10000000,
    },
    {
        id: "2",
        nome: "Benfica",
        endereco: "Av. Benfica",
        faturamento: 15000000,
    },
    {
        id: "3",
        nome: "Aldeota",
        endereco: "Av. Aldeota",
        faturamento: 20000000,
    },
    {
        id: "4",
        nome: "Iguatemi",
        endereco: "Av. Washigton Soares",
        faturamento: 50000000,
    },
    
]


app.get("/lojas", (req, res) => {
    res.json(lojas)
})

app.get("/loja/:id", (req, res) => {
    const espLoja = lojas.find((loja) => loja.id === req.params.id)
    res.json(espLoja)
})

app.get("/lojas/faturamento-lojas", (req, res) => {
    const faturamentoLojas = []
    for (const loja of lojas){
        faturamentoLojas.push({
            [loja.nome]: loja.faturamento,
        })
    }
    res.json(faturamentoLojas)
})

app.post("/loja", (req, res) => {
    lojas.push(req.body)
    res.json(lojas)
})