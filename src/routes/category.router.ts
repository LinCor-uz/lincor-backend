import {Router} from 'express'
import {categoryController} from "@controllers";
import {isValidId, upload} from "@middlewares";

export const router = Router()

router
    .get("/categories", categoryController.getAllCategories)
    .get("/category/:id", isValidId, categoryController.getCategorById)
    .post("/category", upload.single('workbook'), categoryController.createCategory)
    .put("/category/:id", isValidId, upload.single('workbook'), categoryController.updateCategory)
    .delete("/category/:id", isValidId, categoryController.deleteCategory)
