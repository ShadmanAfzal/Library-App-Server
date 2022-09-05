import Joi from "joi";
import { SORT_BY } from "../enum/sortBy.js";

export const sortValidator = Joi.object({
    'sortBy': Joi.string().valid(...Object.values(SORT_BY))
})