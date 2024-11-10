import SQUser from "../model/SqUserModel";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
    try {
      const { email, password, username, fullname, address, sex } = req.body;
  
      // Băm mật khẩu với độ mạnh 10
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Tạo người dùng với mật khẩu đã băm
      const newUser = await SQUser.create({
        email,
        password: hashedPassword,
        username,
        fullname,
        address,
        sex,
      });
  
      // Loại bỏ trường password khỏi kết quả trả về
      const { password: _, ...userWithoutPassword } = newUser.toJSON();
  
      res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      // Lấy ID từ body
      const { id } = req.body;
  
      // Kiểm tra nếu ID không có
      if (!id) {
        return res.status(400).json({ message: 'ID is required' });
      }
  
      // Tìm người dùng theo ID
      const user = await SQUser.findByPk(id);
      
      if (user) {
        // Xóa người dùng nếu tìm thấy
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
  };
  

export {
    createUser,
    deleteUser,
}
