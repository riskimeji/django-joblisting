import db from "../config/Database.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const Subscription = db.define(
  "subscriptions",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Subscription;
