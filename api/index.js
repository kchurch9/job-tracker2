const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.post('/', (req, res) => res.send('hello world!'))


app.listen(4001, () => console.log('example app listening on port 4001'))