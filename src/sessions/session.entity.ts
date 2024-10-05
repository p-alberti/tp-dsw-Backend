import crypto from 'node:crypto'
import { SessionType } from '../session_types/session_types.entity.js';

export class Session{
    constructor(
        public obs: string,
        public date : Date,
        public type : SessionType,
        public id = crypto.randomUUID()
    ){}
}