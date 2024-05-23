import express from 'express'

const app = express()

app.use('/',(req,res) => {
    res.json({message: '<h1>Hello world!!</h1>'})
})

app.listen(3000,() => {
    console.log('Server running on http://localhost:3000/')
})