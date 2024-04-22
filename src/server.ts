import express from "express";
import router from "./routes";

const server = express();

server.use("/api/products", router);

export default server;
