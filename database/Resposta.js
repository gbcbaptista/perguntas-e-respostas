const Sequelize = require("sequelize")
const connection = require("./database")

const Resposta = connection.define ("answers", {
    answerBody: {
        type: Sequelize.TEXT,
        alloNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false}).then(() => {})

module.exports = Resposta
