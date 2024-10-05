import express from 'express' 
import { userRouter } from './users/user.routes.js'
import { sessionRouter } from './sessions/session.routes.js'
import { sessionTypeRouter } from './session_types/session_types.routes.js'

const app = express()
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/sessions', sessionRouter)
app.use('/api/sessionTypes', sessionTypeRouter)

app.use((_, res)=>{
    return res.status(404).send({message: 'Resource Not Found'})
}) //Para manejar urls que no tenemos definidas como por ejemplo si se equivocan en algun caracter del getall ej: /api/usersss

app.listen(3000,() => {
    console.log('Server running on http://localhost:3000/')
})
    