const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../api/database/banco.sqlite'
  });

sequelize.authenticate().then(function(){
    console.log("Conexão com o banco de dados realizado com sucesso!");
}).catch(function(err){
    console.log("Erro: Conexão com o banco de dados não realizado com sucesso!");
});

module.exports = sequelize;