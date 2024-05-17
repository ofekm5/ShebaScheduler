"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const apiRouter_1 = __importDefault(require("./middleware/apiRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api', apiRouter_1.default);
app.use((err, req, res, next) => {
    logger_1.default.error(err.stack);
    res.status(500).send(err.message);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
