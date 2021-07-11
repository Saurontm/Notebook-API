const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const notebookRoutes = require("./API/notebook/routes");
const noteRoutes = require("./API/note/routes");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/notebooks/", notebookRoutes);
app.use("/note/", noteRoutes);

const run = async () => {
  try {
    await db.sequelize.sync(); //{ force: true }
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
