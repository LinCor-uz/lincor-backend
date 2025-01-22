"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.categoryRouter = (0, express_1.Router)();
// "/category/ + categoryRouter"
exports.categoryRouter
    .get("/", middlewares_1.checkAccessToken, controller_1.categoryController.getAllCategories)
    .get("/:id", middlewares_1.isValidId, controller_1.categoryController.getCategorById)
    .post("/", middlewares_1.uploadWokrbook.single("workbook"), controller_1.categoryController.createCategory)
    .put("/:id", middlewares_1.isValidId, middlewares_1.uploadWokrbook.single("workbook"), controller_1.categoryController.updateCategory)
    .delete("/:id", middlewares_1.isValidId, controller_1.categoryController.deleteCategory);
