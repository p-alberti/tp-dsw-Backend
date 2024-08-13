import { Request, Response, NextFunction } from "express"
import { UserRepository } from "./user.repository.js"
import { User } from "./user.entity.js"

const repository = new UserRepository()

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

function findAll(req: Request,res: Response){
    res.json({data: repository.findAll()}) 
}

function findOne(req: Request,res:Response) {
    const id = req.params.id
    const user = repository.findOne({id})
    if (!user) {
        return res.status(404).send({message: 'User not found'})
    }
    res.json(user)
}


function add(req: Request,res:Response){
    const input = req.body.sanitizedInput

    const userInput = new User(
        input.username ,
        input.name, 
        input.surname, 
        input.password, 
        input.mail
    )

    const user = repository.add(userInput)
    return res.status(201).send({message:'Character created', data:user})
}

function update(req: Request,res:Response){
    req.body.sanitizedInput.id = req.params.id
    const user = repository.update(req.body.sanitizedInput)
   
    if(!user){
        return res.status(404).send({message: 'User not found'})
    }
    return res.status(200).send({message: 'User updated successfully', data: user})
}

function remove(req: Request,res:Response) {
    const id = req.params.id
    const user = repository.delete({id})
    
    if(!user){
        res.status(404).send({message: 'User not found'})
    }else{    
        res.status(200).send({message: 'User deleted successfully'})
    }
}

export {sanitizeUserInput, findAll, findOne, add, update, remove}