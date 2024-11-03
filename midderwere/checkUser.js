import jwt from "jsonwebtoken";
import * as UserModel from "../model/UserModel";
import asyncHandler from "./asyncHandler.js";



const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt; 
  if (!token) {
    return res.status(401).json({ message: "Không có token. Vui lòng đăng nhập." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.getUserById(decoded.userId);
    console.log(req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Không tìm thấy người dùng." });
    }
    next(); 
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message);
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  }
};

// const decodeToken = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return next(); // Nếu không có token, vẫn tiếp tục, nhưng username sẽ không có
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await UserModel.getUserById(decoded.userId).select("username"); // Chỉ lấy username
//     if (user) {
//       req.user = user; // Gán đối tượng người dùng vào req.user
//     }
//   } catch (error) {
//     console.error("Lỗi giải mã token:", error.message);
//   }
  
//   next(); // Tiếp tục cho các middleware hoặc route khác
// };

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role == 0) { 
    next();
  } else {
    res.status(403).json({ message: "Bạn không có quyền truy cập chức năng này." });
  }
};

export { authenticate, authorizeAdmin };
