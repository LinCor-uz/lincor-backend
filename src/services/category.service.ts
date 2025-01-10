import { prisma } from "@config";
import { Category, categorySchema } from "@validations";
import { sendError } from "@utils";
import { ZodError } from "zod";

export const categoryService = {
  // get all categories
  async getAllCategories(): Promise<Category[]> {
    return prisma.category.findMany({ include: { videos: true } });
  },

  // find category by ID
  async findCategoryById(id: number): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { videos: true },
    });

    if (!category) {
      throw new sendError("Category not found", 404);
    }

    return category;
  },

  // create category
  async createCategoryService(data: unknown): Promise<Category> {
    try {
      // kelgan datani validatsiya qilish
      const validatedData = categorySchema.parse(data);

      // Prisma orqali saqlash va natijani qaytarish
      return await prisma.category.create({
        data: validatedData,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = error.errors
          .map((error) => error.message)
          .join(", ");
        throw new sendError(`Validation Error ${validationError}`, 400);
      }
      throw error;
    }
  },

  // update category by ID
  async updateCategoryService(id: number, data: unknown): Promise<Category> {
    const findById = await prisma.category.findUnique({ where: { id } });
    if (!findById) {
      throw new sendError("Category not found", 404);
    }

    // validatsiyani hammasini optional qilish update uchun
    const categoryUpdateSchema = categorySchema.partial();

    try {
      // kelgan datani validatsiya qilish
      const validatedData = categoryUpdateSchema.parse(data);
      return prisma.category.update({ where: { id }, data: validatedData });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = error.errors
          .map((error) => error.message)
          .join(", ");
        throw new sendError(`Validation Error ${validationError}`, 400);
      }
      throw error;
    }
  },

  // delete category by ID
  async deleteCategoryService(id: number): Promise<void> {
    const findById = await prisma.category.findUnique({ where: { id } });
    if (!findById) {
      throw new sendError("Category not found", 404);
    } else {
      await prisma.category.delete({ where: { id } });
    }
  },
};
