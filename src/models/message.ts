import {
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import { sequelize } from './sequelize';
import { User } from './user';
import { Channel } from './channel';

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  declare addUser: HasManyAddAssociationMixin<User, number>;
  declare addChannel: HasManyAddAssociationMixin<Channel, number>;
  declare id: CreationOptional<number>;
  declare content: string;
  declare timeStamp: CreationOptional<Date>;
  declare attachment: string | null;
  declare UserId: ForeignKey<User>;
  declare ChannelId: ForeignKey<Channel>;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    attachment: {
      type: DataTypes.STRING,
    },
  },
  { sequelize },
);

// User.hasMany(Message, { foreignKey: "userId" });
User.hasMany(Message);
Message.belongsTo(User);
// Channel.hasMany(Message, { foreignKey: "channelId" });
Channel.hasMany(Message);
Message.belongsTo(Channel);

export { Message };
