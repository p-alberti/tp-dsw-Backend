import { Router } from "express";

import { sanitizeSessionInput, findAll, findOne, add, update, remove } from "./session.controller.js";

export const sessionRouter = Router()

sessionRouter.get('/', findAll)
sessionRouter.get('/:id', findOne)
sessionRouter.post('/', sanitizeSessionInput, add)
sessionRouter.put('/:id', sanitizeSessionInput, update)
sessionRouter.patch('/:id', sanitizeSessionInput, update)
sessionRouter.delete('/:id', remove)