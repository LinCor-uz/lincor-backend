import {Request, Response} from "express";
import {categoryService} from "@services";
import {categorySchema} from "@validations";


export const categoryController = {

    // get category by category ID
    getCategorById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        console.log(id)
        try {
            const category = await categoryService.findCategoryById(id)
            res.status(200).send(category)
        } catch (error: unknown) {
            const err = error as Error
            console.log("#ERROR getCategoryById - ", err)
            res.status(500).send({success: false, error: err.message})
        }

    },

    // get all categories
    getAllCategories: async (req: Request, res: Response) => {
        try {
            const data = await categoryService.getAllCategories()
            res.status(200).send(data)
        } catch (error: unknown) {
            const err = error as Error
            console.log("#ERROR getAllCategory - ", err)
            res.status(500).send({success: false, error: err.message})
        }
    },

    // create category
    createCategory: async (req: Request, res: Response) => {
        const result = await categoryService.createCategoryService(req.body)

        if (!result) {
            throw new Error("Category not created")
        }

        res.status(200).send({
            success: true,
            result: result
        })
    }
}

