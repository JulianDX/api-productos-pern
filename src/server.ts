import express from "express";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import db from "./config/db";

// Conectar a db

async function connectDb() {
  try {
    await db.authenticate();
    await db.sync();
    /*  console.log("Conexión exitosa en la base de datos"); */
  } catch (error) {
    console.log(error);
    console.log("Error en la base de datos");
  }
}
connectDb();

const server = express();

server.use(express.json());

server.use("/api/products", router);

// Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
