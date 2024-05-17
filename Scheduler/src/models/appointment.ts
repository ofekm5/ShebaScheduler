import { Model, DataTypes, Sequelize } from 'sequelize';

interface AppointmentAttributes {
  appointmentID: number;
  description: string;
  date: Date;
}

export class Appointment extends Model<AppointmentAttributes> implements AppointmentAttributes {
  public appointmentID!: number;
  public description!: string;
  public date!: Date;
}

export default (sequelize: Sequelize) => {
  Appointment.init(
    {
      appointmentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments',
      timestamps: false,
    }
  );

  return Appointment;
};
