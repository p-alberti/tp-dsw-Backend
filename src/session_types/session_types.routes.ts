import { Router } from "express";

import { sanitizeSessionTypeInput, findAll, findOne, add, update, remove} from "./session_types.controller.js";

export const sessionTypeRouter = Router()

sessionTypeRouter.get('/', findAll)
sessionTypeRouter.get('/:id', findOne)
sessionTypeRouter.post('/', sanitizeSessionTypeInput, add)
sessionTypeRouter.put('/:id', sanitizeSessionTypeInput, update)
sessionTypeRouter.patch('/:id', sanitizeSessionTypeInput, update)
sessionTypeRouter.delete('/:id', remove)