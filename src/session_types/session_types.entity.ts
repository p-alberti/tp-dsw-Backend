import crypto from 'node:crypto'

export class SessionType{
    constructor(
        public typeName: string,
        public focusTime: Date,
        public shortBreak: Date,
        public longBreak: Date,
        public id = crypto.randomUUID()
    ){}
}