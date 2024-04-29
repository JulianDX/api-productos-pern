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
/**
 * @swagger
 * components:
 *    schemas:
 *       Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: Product's name
 *                  example: TV Samsung
 *              price:
 *                  type: float
 *                  description: Product's price
 *                  example: 300.5
 *              availability:
 *                  type: boolean
 *                  description: Describes if an product is available or not
 *                  example: true
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *    get:
 *        summary: Get the list of products
 *        tags:
 *            - Products
 *        description: Returns the list of products from the database
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Product'
 */

router.get(
  "/:id",
  param("id").isNumeric().withMessage("El valor debe ser numérico"),
  validateProduct,
  getProductByID
);

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *        summary: Get a product by ID
 *        tags:
 *           - Products
 *        description: Returns the products from the databse depending on the ID
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product we want to get
 *            required: true
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Succesfull response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            404:
 *                description: Not found
 *            400:
 *                description: Bad request, invalid ID
 */

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

/**
 * @swagger
 * /api/products:
 *    post:
 *        summary: Creates a new product
 *        tags:
 *            - Products
 *        description: Returns a new record in the database
 *        requestBody: 
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: "TV Samsung"
 *                            price:
 *                                type: number  
 *                                example: 300.5
 *        responses:
 *            201:
 *              description: Product updated succsesuflly
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request, invalid input data
 */

router.put(
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

/**
 * @swagger
 * /api/products/update/{id}:
 *    put:
 *      summary: Updates a product given an ID
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product we want to get
 *            required: true
 *            schema:
 *                type: integer
 *      requestBody: 
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: "TV Samsung"
 *                            price:
 *                                type: number  
 *                                example: 300.5
 *                            availability:
 *                                type: boolean
 *                                example: true
 *      responses:
 *          200:
 *              description: Product updated succsesuflly
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request, invalid ID or invalid input data
 *          404:
 *              description: Product not found
 */

router.delete(
  "/delete/:id",
  param("id").isNumeric().withMessage("El valor debe ser numérico"),
  validateProduct,
  deleteProduct
);

/**
 * @swagger
 * /api/products/delete/{id}:
 *    delete:
 *        summary: Deletes a product given an ID
 *        tags:
 *            - Products
 *        description: Returns a success deletion message
 *        parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product we want to delete
 *              required: true
 *              schema:
 *                 type: integer
 *        responses:
 *            200:
 *                description: Product deleted succesfully
 *            400:
 *                description: Bad Request, invalid ID or invalid input data
 *            404:
 *                description: Product not found
 */

export default router;
