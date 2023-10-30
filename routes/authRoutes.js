import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getallOrderController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();
//routing
//register || method post
router.post("/register", registerController);
///Login
router.post("/login", loginController);
///forget
router.post("/forgot-password", forgotPasswordController);
//test
router.get("/test", requireSignIn, isAdmin, testController);

//be protected allway use secure Lineee user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
///protected admi9n ropute
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfileController);
router.get("/orders", requireSignIn, getOrderController);
router.get("/all-orders", requireSignIn, isAdmin, getallOrderController);
//status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
