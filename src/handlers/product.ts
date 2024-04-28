import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(400).json("No se encontró el producto");
    }
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(400).json("No se encontró el producto");
    }
    product.availability = !product.availability;
    product.save();
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(400).json("No se encontró el producto");
    }
    product.destroy();
    res.json("Producto eliminado correctamente");
  } catch (error) {
    console.log(error);
  }
};
