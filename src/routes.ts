import { Router } from "express";
import { createProduct } from "./handlers/product";
import { body } from "express-validator";

const router = Router();

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),

  body("price")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .isNumeric()
    .withMessage("El precio debe ser numérico")
    .custom((value) => value > 0)
    .withMessage("El precio debe ser mayor o igual a cero"),

  createProduct
);

export default router;
