import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { validateProduct } from "./middleware";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isNumeric().withMessage("El valor debe ser numérico"),
  validateProduct,
  getProductByID
);

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
  validateProduct,
  createProduct
);

router.post(
  "/update/:id",
  param("id").isNumeric().withMessage("El valor debe ser numérico"),
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
  validateProduct,
  updateProduct
);

router.delete(
  "/delete/:id",
  param("id").isNumeric().withMessage("El valor debe ser numérico"),
  validateProduct,
  deleteProduct
);

export default router;
