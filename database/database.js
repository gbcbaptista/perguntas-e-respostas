const Sequelize = require("sequelize")

const connection = new Sequelize("guiaperguntas", "root", "hiD.E,36",{
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection;