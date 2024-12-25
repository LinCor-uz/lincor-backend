import {Router} from 'express'
import {categoryController} from "@controllers";

export const router = Router()

router
    .get("/categories", categoryController.getAllCategories)
    .get("/category/:id", categoryController.getCategorById)
