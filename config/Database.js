import Sequelize from "sequelize";

const db = new Sequelize("crud_node", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
