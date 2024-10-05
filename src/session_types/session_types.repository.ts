import { Repository } from "../shared/repository.js";
import { SessionType } from "./session_types.entity.js";

const sessionTypes = [
    new SessionType(
        'Pomodoro 1',
        new Date('2024-10-04T14:30:00'),
        new Date('2024-10-04T14:30:00'),
        new Date('2024-10-04T14:30:00'),
        '3301d471-92e6-4fb5-886f-e98c24251f61'
    ),
]

export class SessionTypeRepository implements Repository<SessionType>{
    
    public findAll(): SessionType[] | undefined{
        return sessionTypes
    } 

    public findOne(item: {id:String}): SessionType | undefined {
        return sessionTypes.find((sessionType)=> sessionType.id === item.id)
    }

    public add(item: SessionType): SessionType | undefined{
        sessionTypes.push(item)
        return item
    }

    public update(item: SessionType): SessionType | undefined {
        const sessionTypeIdx = sessionTypes.findIndex(sessionType => sessionType.id === item.id)

        if (sessionTypeIdx !== -1){
            sessionTypes[sessionTypeIdx] = {...sessionTypes[sessionTypeIdx], ...item}
        }
        return sessionTypes[sessionTypeIdx]
    }

    public delete(item: {id: String}): SessionType | undefined {
        const sessionTypeIdx = sessionTypes.findIndex(sessionType => sessionType.id === item.id)

        if(sessionTypeIdx !== -1){
            const deletedSessionsTypes = sessionTypes[sessionTypeIdx]
            sessionTypes.splice(sessionTypeIdx,1)
            return deletedSessionsTypes
        }
    }
}