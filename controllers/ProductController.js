import productModel from "../models/productModel.js";
import slug from "slugify";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import { response } from "express";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      (photo && photo.size > 1000000)
    ) {
      return res.status(500).send({ error: "same thing is missing" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Production saving failed",
      error,
    });
  }
};
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counttotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "getting product not successsful",
      error,
    });
  }
};
export const singleProductController = async (req, res) => {
  try {
    const singleProduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "get single product successfully",
      singleProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "getting single product has faild",
      error,
    });
  }
};
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "not sucessfull for getting photo",
      error,
    });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params.pid;
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "deleting product not sucessfull",
      error,
    });
  }
};
export const updateproductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      (photo && photo.size > 1000000)
    ) {
      return res.status(500).send({ error: "same thing is missing" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "product update successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "update product not successfully",
      error,
    });
  }
};

///filter
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error while filtering", error });
  }
};

export const productController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({ succes: true, total });
  } catch (error) {
    res.status(400).send({
      succes: false,
      message: "something went wrong in priduct count",
      error,
    });
  }
};
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({ succes: true, products });
  } catch (error) {
    res.status(400).send({
      succes: true,
      message: "some thing went wrong in page controller",
      error,
    });
  }
};
export const serachProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    res.status(400).send({ succes: true, message: "problem in search", error });
  }
};

export const relatedproductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({ category: cid, _id: { $ne: pid } })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      succes: true,
      message: "related items found successfully",
      products,
    });
  } catch (error) {
    res.status(400).send({
      succes: true,
      message: "there is some problem in realted category",
      error,
    });
  }
};
export const productCategoryController = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      succes: true,
      message: "found product from category successfull",
      category,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong in productCategory,error",
    });
  }
};

//// for payment token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (error, response) {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTranscation = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
