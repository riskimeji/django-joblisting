import Sequelize from "sequelize";

const db = new Sequelize("crud_node", "root", "", {
  host: "host.docker.internal",
  port: 3306,
  dialect: "mysql",
});

// db.sync({});

export default db;
