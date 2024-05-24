import crypto from 'node:crypto'

export class User{
    constructor(
        public username: string,
        public name: string,
        public surname: string,
        private password: string,
        public mail: string,
        public id = crypto.randomUUID()
        //public sessions: session[], el usuario conoce sus sesiones, se crearan mas adelante
        //public tasks: task[], el usurio conoce sus tareas, se crearan mas adelante
    ){}
}