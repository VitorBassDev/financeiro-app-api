const express = require('express');
const app = express();
const { Op } = require('sequelize');

const Lancamentos = require('./database/models/Lancamentos');

app.use(express.json());

app.post('/cadastrar', async (req, res) => {
    // console.log(req.body)
    await Lancamentos.create(req.body).then(function(){
        return res.json({
            erro: false,
            mensagem: "Lançamento cadastrado com sucesso!"
        });
        
    }).catch(function(){
        // console.log(req.body)
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Lançamento não cadastrado!"
        });
    });
});


app.get('/listar', async (req, res) => {
    // console.log(req.body)
    await Lancamentos.findAll().then(function(lancamentos){
        return res.json({
            erro: false,
            mensagem: "Lançamentos Cadastrados",
            lancamentos
        });
        
    }).catch(function(){
        // console.log(req.body)
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Lançamentos não Encontrados"
        });
    });
});

app.get('/listar/:mes/:ano', async (req, res) => {
    var mes = new Number(req.params.mes);
    var ano = new Number(req.params.ano);
    //console.log("Mes: " + mes + " Ano: " + ano);

    const date = new Date(ano + "-" + mes);
    var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //console.log("Primeiro dia do mês: " + primeiroDia);
    //console.log("Último dia do mês: " + ultimoDia);

    const lancamentos = await Lancamentos.findAll({
        order: [['dataPagamento','ASC']],
        where: {
            "dataPagamento": {
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    });

    const valorPagamentos = await Lancamentos.sum('valor', {
        where: {
            tipo: '1',
            "dataPagamento": {
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    });

    const valorRecebido = await Lancamentos.sum('valor', {
        where: {
            tipo: '2',
            "dataPagamento": {
            
            
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    });

    const saldo = new Number(valorRecebido) - new Number(valorPagamentos);

    return res.json({
        erro: false,
        lancamentos,
        valorPagamentos,
        valorRecebido,
        saldo
    });
});


app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});