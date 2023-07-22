import {
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./sequelize";
import { User } from "./user";
class Channel extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare addUser: HasManyAddAssociationMixin<User, number>;
}
Channel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    channelName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize }
);

Channel.belongsToMany(User, { through: "UserChannel" });
User.belongsToMany(Channel, { through: "UserChannel" });
export { Channel };
