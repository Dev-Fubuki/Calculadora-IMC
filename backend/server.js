import express from 'express'; 

const app = express()
app.use(express.json());

const user = []

app.post('/senddata', (req, res) => {
    user.push(req.body)

    res.status(201).json(req.body)
    console.log(`Status: ${res.statusCode}`, "Criado com Sucesso");


})

app.get('/getdata', (req, res) => {
    res.status(200).json(user)
    console.log(`Status: ${res.statusCode}`, "Dados Recebidos com Sucesso");

})

app.listen(3000)




//mongodb
// dev-fubuki
//password iX1LOaHUbDxR3dcf


