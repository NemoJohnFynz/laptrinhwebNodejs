import jwt from "jsonwebtoken";
import * as UserModel from "../model/UserModel";
import asyncHandler from "./asyncHandler.js";

// Middleware để xác thực người dùng

const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; 
  if (!token) {
    res.status(401).json({ message: "Không có token. Vui lòng đăng nhập." });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
    req.user = await UserModel.getUserById(decoded.userId).select("-password");
    if (!req.user) {
      res.status(401).json({ message: "Không tìm thấy người dùng." });
      return;
    }
    next(); // Cho phép tiếp tục nếu xác thực thành công
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message);
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role == 1) { // Kiểm tra quyền admin
    next();
  } else {
    res.status(403).json({ message: "Bạn không có quyền truy cập chức năng này." });
  }
};

export { authenticate, authorizeAdmin };
