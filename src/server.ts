import express from "express";
import router from "./routes";
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

server.use("/api", (req, res) => {
  res.json({ msg: "Desde api" });
});

export default server;
