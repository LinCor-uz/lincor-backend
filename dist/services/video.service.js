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
exports.videoService = void 0;
const _validations_1 = require("@validations");
const _config_1 = require("@config");
const zod_1 = require("zod");
const _utils_1 = require("@utils");
exports.videoService = {
    // create video service
    createVideo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                const validateData = _validations_1.videoSchema.parse(data);
                return yield _config_1.prisma.video.create({ data: validateData });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    const validationError = err.errors.map((e) => e.message).join(", ");
                    throw new _utils_1.sendError(`Validation Error: ${validationError}`, 400);
                }
                throw err;
            }
        });
    },
    // delete video service
    deleteVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findById = yield _config_1.prisma.video.findUnique({ where: { id } });
            if (!findById) {
                throw new _utils_1.sendError("Video not found", 404);
            }
            else {
                yield _config_1.prisma.video.delete({ where: { id } });
            }
        });
    },
    //get all videos service
    getAllVideos() {
        return __awaiter(this, void 0, void 0, function* () {
            return _config_1.prisma.video.findMany({ include: { Category: true } });
        });
    },
    // update video by id
    updateVideo(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findById = yield _config_1.prisma.video.findUnique({ where: { id } });
            if (!findById) {
                throw new _utils_1.sendError("Video not found", 404);
            }
            const videoUpdateSchema = _validations_1.videoSchema.partial();
            const validatedData = videoUpdateSchema.parse(data);
            return _config_1.prisma.video.update({ where: { id }, data: validatedData });
        });
    }
};
