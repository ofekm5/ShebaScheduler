import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, ModelCtor } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import configJSON from '../../config/config.json';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = (configJSON as any)[env];
const db: { [key: string]: ModelCtor<any> | Sequelize } = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config as SequelizeOptions);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config as SequelizeOptions);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
