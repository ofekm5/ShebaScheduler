"use strict";
// models/appointment.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db")); // Adjust the path according to your setup
const user_1 = __importDefault(require("./user"));
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
Appointment.init({
    appointmentID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'userID',
        },
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hour: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    testType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: false,
});
exports.default = Appointment;
