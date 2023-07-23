import {
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "./sequelize";
import { User } from "./user";
import { Channel } from "./channel";

class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare addUser: HasManyAddAssociationMixin<User, number>;
  declare addChannel: HasManyAddAssociationMixin<Channel, number>;
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
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  { sequelize }
);

// User.hasMany(Message, { foreignKey: "userId" });
User.hasMany(Message);
Message.belongsTo(User);
// Channel.hasMany(Message, { foreignKey: "channelId" });
Channel.hasMany(Message);
Message.belongsTo(Channel);

export { Message };
