const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 8085
app.listen(PORT, ()=>console.log(`Server started on PORT: ${PORT}`));

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res)=> res.json('Checking the endpoint'))

const USER_NAME = "admin"
const PASSWORD = "admin123"

const basicAuth = (req,res,next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.status(401).json({message: `No Auth Header provided`})
    const base64Creds = authHeader.split(' ')[1]
    const creds = Buffer.from(base64Creds, 'base64').toString('ascii')
    const [userName, password] = creds.split(':')

    if(userName === USER_NAME && password === PASSWORD) return next();
    return res.status(401).json({message: `Invalid Creds provided`})
}
app.get('/sum', basicAuth, (req,res)=>{
    const {a,b} = req.query;
    if (isNaN(a) || isNaN(b)) return res.json({message: `Invalid Input given for the query parameters. They have to be numbers`})
    const sum = parseInt(a)+ parseInt(b)
    res.status(200).json(`Sum of ${a} and ${b} is ${sum}`)
})
