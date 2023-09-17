import Sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "../models/UserModel.js";
import Career from "./CareerModel.js";
import Category from "./CategoryModel.js";
import JobType from "./JobTypeMode.js";

const { DataTypes } = Sequelize;
const Job = db.define(
  "job",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    careerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jobtypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    est_gaji: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 3000],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Job);
Category.hasMany(Job);
Career.hasMany(Job);
JobType.hasMany(Job);
Job.belongsTo(Users, { foreignKey: "userId" });
Job.belongsTo(Category, { foreignKey: "categoryId" });
Job.belongsTo(Career, { foreignKey: "careerId" });
Job.belongsTo(JobType, { foreignKey: "jobtypeId" });

export default Job;
