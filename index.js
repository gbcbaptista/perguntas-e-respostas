const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database")
const Question = require("./database/Question")
const Resposta = require ("./database/Resposta")


connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//express usar EJS como View Engine
app.set("view engine", "ejs");
app.use(express.static('public'));

//Bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Rotas
app.get("/", (req,res)=> {
    Question.findAll(
        {raw: true
        }).then(question => {
        res.render("index", {
            question: question,
        })
    })
    
})

app.post("/", (req,res)=>{
    var type = req.body.tipo
    var ord
    if (type == "title" || type == "description"){
        ord = "ASC"
    } else {
        ord = "ASC"
    }
    Question.findAll({raw: true, order:[
        [type, ord]
    ]}).then(question => {
        res.render("index", {
            question: question
        })
    })  

})

app.get ("/quest", (req,res) =>{
    res.render("question")
})

app.post("/savequestion", (req,res)=>{
    var title = req.body.title
    var description = req.body.description
    
    Question.create({
        title: title,
        description: description
    }).then (()=>{
        res.redirect("/")
    })
})

app.get("/lookquestion/:id", (req, res) =>{
    var id = req.params.id
    Question.findOne({
        where: {id: id}
    }).then(question => {
        if (question != undefined){
            Resposta.findAll({
                where: {questionId: question.id},
                order:[
                    ["id", "DESC"]
                ]
            }). then(answers =>{
                res.render("lookquestion",{
                    question: question,
                    answers: answers
                })
                      
            })
        } else {
            res.redirect("/")
        }
        
    })
})

app.post("/ans", (req, res) => {
    var answerBody = req.body.answerBody
    var questionId = req.body.id
    Resposta.create({
        answerBody: answerBody,
        questionId: questionId
    }).then(()=>{
        res.redirect("/lookquestion/"+questionId)
    })
})

app.listen(8080, ()=>{
    console.log("App rodando!")
})