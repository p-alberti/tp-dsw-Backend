import express, {NextFunction, Request, Response} from 'express' 
import { User } from './users/entities/user.js'

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

function sanitizeUserInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        username : req.body.username,
        name : req.body.name,
        surname : req.body.surname,
        password : req.body.password,
        mail : req.body.mail,
    }
    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if (req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

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

app.post('/api/users',sanitizeUserInput, (req,res) =>{
    const input = req.body.sanitizedInput

    const user = new User(input.username ,input.name, input.surname, input.password, input.mail)

    users.push(user)
    res.status(201).send({message:'Character created',data:user})
})

app.put('/api/users/:id', sanitizeUserInput, (req, res) => {
    const userIdx = users.findIndex(user => user.id === req.params.id)

    if(userIdx === -1){
        res.status(404).send({message: 'User not found'})
    }

    users[userIdx] = {...users[userIdx], ...req.body.sanitizedInput}

    res.status(200).send({message: 'User updated successfully', data: users[userIdx]})
})

app.patch('/api/users/:id', sanitizeUserInput, (req, res) => {
    const userIdx = users.findIndex(user => user.id === req.params.id)

    if(userIdx === -1){
        res.status(404).send({message: 'User not found'})
    }

    users[userIdx] = {...users[userIdx], ...req.body.sanitizedInput}

    res.status(200).send({message: 'User updated successfully', data: users[userIdx]})
})

app.delete('/api/users/:id', (req, res) => {
    const userIdx = users.findIndex(user => user.id === req.params.id)

    if(userIdx === -1){
        res.status(404).send({message: 'User not found'})
    }    
    users.splice(userIdx,1)
    res.status(200).send({message: 'User deleted successfully'})
})

app.listen(3000,() => {
    console.log('Server running on http://localhost:3000/')
})