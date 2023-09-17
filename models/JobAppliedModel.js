import db from "../config/Database.js";
import Users from "./UserModel.js";
import Job from "./JobModel.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;
const JobApplied = db.define(
  "jobapplied",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
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
    status: {
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
Users.hasMany(JobApplied);
Job.hasMany(JobApplied);
JobApplied.belongsTo(Users, { foreignKey: "userId" });
JobApplied.belongsTo(Job, { foreignKey: "jobId" });

export default JobApplied;
