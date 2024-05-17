import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  userID: number;
  userName: string;
  userPass: string;
  fullname: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public userID!: number;
  public userName!: string;
  public userPass!: string;
  public fullname!: string;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userPass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    }
  );

  return User;
};
