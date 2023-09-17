import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import JobRoute from "./routes/JobRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import Subscription from "./routes/SubscriptionRoute.js";
import CareerRoute from "./routes/CareerRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import JobtypeRoute from "./routes/JobTypeRoute.js";
import JobAppliedRoute from "./routes/JobAppliedRoute.js";
dotenv.config();

import db from "./config/Database.js";

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});
// (async () => {
//   await db.sync();
// })();
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    // origin: "*",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(JobRoute);
app.use(AuthRoute);
app.use(Subscription);
app.use(CareerRoute);
app.use(CategoryRoute);
app.use(JobtypeRoute);
app.use(JobAppliedRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server running");
});
