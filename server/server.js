const express = require('express')
const mongoose = require('mongoose')
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const app = express()
const AuthRoute = require ('./routes/Auth')
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose
  .connect("mongodb://127.0.0.1:27017/instar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server run on port ${PORT}`)
})

app.use('/api', AuthRoute)