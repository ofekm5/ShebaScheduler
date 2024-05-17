"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkParams_1 = __importDefault(require("./checkParams"));
const userHandlers_1 = require("./userHandlers");
const otpHandler_1 = __importDefault(require("./otpHandler"));
const apiRouter = (0, express_1.Router)();
apiRouter.use(checkParams_1.default);
apiRouter.get('/login', userHandlers_1.loginHandler);
apiRouter.get('/verifyOTP', otpHandler_1.default);
// apiRouter.post('/setAppo', setAppo);
// apiRouter.get('/getAppo', getAppo);
apiRouter.post('/signup', userHandlers_1.signupHandler);
exports.default = apiRouter;
