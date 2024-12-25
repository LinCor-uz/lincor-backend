import {Request, Response} from "express";
import {categoryService} from "@services";


const categoryController = {

    // get category by category ID
    getCategorById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        try {
            const category = await categoryService.findCategoryById(id)
            res.status(200).send(category)
        } catch (error: unknown) {
            const err = error as Error
            console.log("#ERROR getCategoryById - ", err)
            res.status(500).send({error: err.message})
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
            res.status(500).send({error: err.message})
        }
    }
}
