"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const _services_1 = require("@services");
exports.categoryController = {
    // get category by category ID
    getCategorById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        console.log(id);
        try {
            const category = yield _services_1.categoryService.findCategoryById(id);
            res.status(200).send(category);
        }
        catch (error) {
            const err = error;
            console.log("#ERROR getCategoryById - ", err);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    // get all categories
    getAllCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield _services_1.categoryService.getAllCategories();
            res.status(200).send(data);
        }
        catch (error) {
            const err = error;
            console.log("#ERROR getAllCategory - ", err);
            res.status(500).send({ success: false, error: err.message });
        }
    }),
    // create category
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (req.body.price) {
                req.body.price = Number(req.body.price);
            }
            const data = Object.assign(Object.assign({}, req.body), { workbook_path: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
            const result = yield _services_1.categoryService.createCategoryService(data);
            res.status(201).send({
                success: true,
                result: result,
            });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR createCategory - ", err);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    // update category by ID
    updateCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = Number(req.params.id);
            req.body.price = Number(req.body.price);
            const data = Object.assign(Object.assign({}, req.body), { workbook_path: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
            const result = yield _services_1.categoryService.updateCategoryService(id, data);
            res.status(200).send({ success: true, result: result });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR updateCategory - ", err);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    // delete category by ID
    deleteCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield _services_1.categoryService.deleteCategoryService(id);
            res
                .status(200)
                .send({ success: true, message: "Category deleted successfully" });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR deleteCategory - ", err);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
};
