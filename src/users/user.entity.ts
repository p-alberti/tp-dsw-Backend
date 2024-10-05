import crypto from 'node:crypto'
import { Session } from '../sessions/session.entity.js'

export class User{
    constructor(
        public username: string,
        public name: string,
        public surname: string,
        public password: string,
        public mail: string,
        public sessions: Session[],
        public id = crypto.randomUUID()
        //public tasks: task[], el usurio conoce sus tareas, se crearan mas adelante
    ){}
}