import {Request, Response, NextFunction} from "express"
import { SessionRepository } from "./session.repository.js"
import { Session } from "./session.entity.js"
import { SessionType } from "../session_types/session_types.entity.js"

const repository = new SessionRepository()

function sanitizeSessionInput(req: Request, res:Response, next: NextFunction){

    req.body.sanitizedInput = {
        obs : req.body.obs,
        date : req.body.date
    }
    Object.keys(req.body.sanitizedInput).forEach(key=> {
        if (req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

function findAll(req: Request, res: Response){
    res.json({data: repository.findAll()})
}

function findOne(req:Request, res:Response){
    const id = req.params.id
    const session = repository.findOne({id})
    if(!session) {
        return res.status(404).send({message: 'Session not found'})
    }
    res.json(session)
}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const sessionInput = new Session (
        input.obs, 
        input.date,
        new SessionType(   
            'Pomodoro 1',
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00')
        ),
    )

    const session = repository.add(sessionInput)
    return res.status(201).send({message: 'Session created succesfully', data:session})

    //agregar funcionalidad para que la session se agregue al array del usuario que la crea
}

function update(req: Request, res:Response){
    req.body.sanitizedInput.id = req.params.id
    const session = repository.update(req.body.sanitizedInput)

    if(!session){
        return res.status(404).send({message: 'Session not found'})
    }
    return res.status(200).send({message: 'Session updated succesfully', data:session})
}

function remove(req: Request, res:Response){
    const id = req.params.id
    const session = repository.delete({id})

    if(!session){
        res.status(404).send({message: 'Session not found'})
    }else{
        res.status(200).send({message: 'Session removed succesfully'})
    }
}

export {sanitizeSessionInput, findAll, findOne, add, update, remove}