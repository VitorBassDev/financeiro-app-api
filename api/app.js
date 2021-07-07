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

app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});