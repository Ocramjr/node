import express from "express";
const router = express.Router();

const contasReceber = [
{
    id: '1',
    cliente: { id: '1', nome:'Digital College' },
    dataDoRecebimento: '2023-12-12',
    valor: 2500,
},
{
    id: '2',
    cliente: { id: '1', nome:'Digital College' },
    dataDoRecebimento: '2023-12-25',
    valor: 1500,
},
{
    id: '3',
    cliente: { id: '2', nome:'Apple' },
    dataDoRecebimento: '2023-06-11',
    valor: 15000,
},

{
    id: '4',
    cliente: { id: '2', nome:'Apple' },
    dataDoRecebimento: '2023-07-12',
    valor: 20000,
},
{
    id: '5',
    cliente: { id: '3', nome:'Google' },
    dataDoRecebimento: '2023-12-03',
    valor: 30000,
},
{
    id: '6',
    cliente: { id: '3', nome:'Google' },
    dataDoRecebimento: '2023-11-13',
    valor: 40000,
},
];

/**
 * Endpoint que calcula todos os pagamentos a receber/recebidos do array
 * Endpoint que calcula todos os pagamentos a receber/recebidos pro cliente do array
 * Endpoint que calcula todos os pagamentos a receber/recebidos até a data de hoje
 * -> newDate()
 */

const total = 0;
router.get("/receivables/total", (req, res) => {
    const contasReceberTotal = contasReceber.reduce((prev, current) => {
        return prev + current.valor;
    }, 0);
    res.status(200).json({
        data: contasReceberTotal,
        message: "Contas a receber total!",
    });
})


export default router;