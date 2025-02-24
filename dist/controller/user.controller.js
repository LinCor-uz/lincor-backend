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
exports.userController = void 0;
const services_1 = require("../services");
exports.userController = {
    getMe: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = Object.assign({}, req.user);
            const user = yield services_1.userService.getMe(data);
            res.send({
                success: true,
                data: user,
            });
        }
        catch (error) {
            const err = error;
            console.log("###ERROR in create USER- ", err.message);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userInfo = yield services_1.userService.editProfile(req.body, req.user);
            res.status(200).send({
                success: true,
                userInfo,
            });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR updateUserInfo - ", err);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield services_1.userService.getAllUser();
            res.status(200).send({
                success: true,
                data: users,
            });
        }
        catch (error) {
            const err = error;
            console.log("###ERROR in create USER- ", err.message);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
};
