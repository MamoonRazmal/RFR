import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  productPhotoController,
  singleProductController,
  deleteProductController,
  updateproductController,
  productFiltersController,
  productController,
  productListController,
  serachProductController,
  relatedproductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/ProductController.js";
import formidable from "express-formidable";
const Router = express.Router();

Router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

Router.get("/get-product", getProductController);
Router.get("/get-product/:slug", singleProductController);

Router.get("/product-photo/:pid", productPhotoController);
Router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);
Router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateproductController
);
Router.post("/product-filter", productFiltersController);
Router.get("/product-count", productController);
Router.get("/product-list/:page", productListController);
Router.get("/search/:keyword", serachProductController);

//similar product
Router.get("/related-product/:pid/:cid", relatedproductController);
Router.get("/product-category/:slug", productCategoryController);
Router.get("/braintree/token", braintreeTokenController);
Router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default Router;
