"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = __importDefault(require("./models/user"));
const appointment_1 = __importDefault(require("./models/appointment"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'mydatabase',
    dialect: 'postgres',
    username: 'myuser',
    password: 'mypassword',
    host: 'localhost',
    port: 5432,
    models: [user_1.default, appointment_1.default]
});
exports.default = sequelize;
