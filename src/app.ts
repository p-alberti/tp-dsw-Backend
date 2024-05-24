import express from 'express' 
import { User } from './user.js'

const app = express()
app.use(express.json())

const users = [
    new User(
        'paulaperez',
        'Paula',
        'Perez',
        '12345',
        'paulaperez@gmail.com',
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]

app.get('/api/users',(req,res) => {
    res.json(users) 
})

app.get('/api/users/:id',(req,res) => {
    const user = users.find((user)=>user.id===req.params.id)
    if (!user) {
        res.status(404).send({message: 'User not found'})
    }
    res.json(user)
})

app.post('/api/users',(req,res) =>{
    const {username, name, surname, password, mail} = req.body

    const user = new User(username ,name, surname, password, mail)

    users.push(user)
    res.status(201).send({message:'Character created',data:user})
})

app.listen(3000,() => {
    console.log('Server running on http://localhost:3000/')
})