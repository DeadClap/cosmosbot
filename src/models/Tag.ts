import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize';

// Define attributes for the Tag model
interface TagAttributes {
  id: number;
  name: string;
  content: string;
  createdBy: string;
  guildId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define creation attributes (omit 'id', 'createdAt', 'updatedAt' for new rows)
interface TagCreationAttributes
  extends Optional<TagAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Extend the Model class for Tag
class Tag extends Model<TagAttributes, TagCreationAttributes> {}

// Initialize the Tag model
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_guild_name', // Part of the composite unique constraint
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'unique_guild_name', // Part of the composite unique constraint
    },
  },
  {
    sequelize,
    modelName: 'Tag',
    timestamps: true, // Enable createdAt and updatedAt
  }
);

export default Tag;
