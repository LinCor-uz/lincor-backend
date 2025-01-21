"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
exports.categoryRouter = (0, express_1.Router)();
// "/category/ + categoryRouter"
exports.categoryRouter
    .get("/", _middlewares_1.checkAccessToken, _controllers_1.categoryController.getAllCategories)
    .get("/:id", _middlewares_1.isValidId, _controllers_1.categoryController.getCategorById)
    .post("/", _middlewares_1.uploadWokrbook.single("workbook"), _controllers_1.categoryController.createCategory)
    .put("/:id", _middlewares_1.isValidId, _middlewares_1.uploadWokrbook.single("workbook"), _controllers_1.categoryController.updateCategory)
    .delete("/:id", _middlewares_1.isValidId, _controllers_1.categoryController.deleteCategory);
