import { Model, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from "./sequelize";

class User extends Model {
  declare id: CreationOptional<number>;
  declare userName: string;
  declare userEmail: string;
  declare firstName: string;
  declare lastName: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export { User };
