const express = require('express')
const cors = require('cors')
const data = require('../data/data.json')

const app = express()
const PORT = 5000

app.use(cors())

app.get('/', (req, res) => {
    res.json({
        data
    })
})

app.listen(PORT, () => console.log(`Server started on ${PORT} ports`))
