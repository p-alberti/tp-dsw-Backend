import { SessionType } from "../session_types/session_types.entity.js";
import { Repository } from "../shared/repository.js";
import { Session } from "./session.entity.js";

const sessions = [
    new Session(
       'sesion de prueba',
       new Date("2024-09-28"),
        new SessionType(   
            'Pomodoro 1',
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00')
        ),
       'a02b26bc-3769-4221-beb1-d7a3cfh7dad' 
    ),
]

export class SessionRepository implements Repository<Session>{
    public findAll(): Session[] | undefined{
        return sessions
    } 

    public findOne(item: {id:String}): Session | undefined {
        return sessions.find((session)=> session.id === item.id)
    }

    public add(item: Session): Session | undefined{
        sessions.push(item)
        return item
        //llamar a procedimiento que tambien añada la session al array del usuario
    }

    public update(item: Session): Session | undefined {
        const sessionIdx = sessions.findIndex(session => session.id === item.id)

        if (sessionIdx !== -1){
            sessions[sessionIdx] = {...sessions[sessionIdx], ...item}
        }
        return sessions[sessionIdx]
    }

    public delete(item: {id: String}): Session | undefined {
        const sessionIdx = sessions.findIndex(session => session.id === item.id)

        if(sessionIdx !== -1){
            const deletedSessions = sessions[sessionIdx]
            sessions.splice(sessionIdx,1)
            return deletedSessions
        }
    }
}