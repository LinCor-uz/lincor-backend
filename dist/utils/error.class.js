"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
class sendError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.sendError = sendError;
