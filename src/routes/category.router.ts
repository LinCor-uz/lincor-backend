import {Router} from 'express'
import {categoryController} from "@controllers";

export const router = Router()

router
    .get("/categories", categoryController.getAllCategories)
    .get("/category/:id", categoryController.getCategorById)
    .post("/category", categoryController.createCategory)
    .put("/category/:id", categoryController.updateCategory)
    .delete("/category/:id", categoryController.deleteCategory)
