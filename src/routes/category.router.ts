import {Router} from 'express'
import {categoryController} from "@controllers";
import {isValidId, uploadWokrbook} from "@middlewares";

export const categoryRouter = Router()

// "/category/ + categoryRouter"

categoryRouter
    .get("/", categoryController.getAllCategories)
    .get("/:id", isValidId, categoryController.getCategorById)
    .post("/", uploadWokrbook.single('workbook'), categoryController.createCategory)
    .put("/:id", isValidId, uploadWokrbook.single('workbook'), categoryController.updateCategory)
    .delete("/:id", isValidId, categoryController.deleteCategory)
