import {
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from './sequelize';
import { User } from './user';

class Channel extends Model<InferAttributes<Channel>, InferCreationAttributes<Channel>> {
  declare addUser: HasManyAddAssociationMixin<User, number>;
  declare id: CreationOptional<number>;
  declare channelName: string;
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
  { sequelize },
);

Channel.belongsToMany(User, { through: 'UserChannel' });
User.belongsToMany(Channel, { through: 'UserChannel' });
export { Channel };
