const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.port || 3000
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// app.use(allowCrossDomain());

app.use('/users' , require('./api/user.api'))
app.use('/messages' , require('./api/message.api'))

app.use('*' , (req, res) =>{
    res.json({message: "this path not found"})
 })


   


mongoose.connect(process.env.DATABASEURL).then(() => {
    console.log('database connected')
}).catch((err) => {
    console.log(err)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))