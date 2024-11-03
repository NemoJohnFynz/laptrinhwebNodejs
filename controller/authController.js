import * as UserModel from "../model/UserModel";
import generateToken  from "../midderwere/createToken"
import bcrypt from 'bcryptjs';



    const login = async(req, res) => {
        const { username, password } = req.body;
        console.log("username",username);
        console.log("password",password);

        if (!username || !password) {
            return res.status(400).json({ message: 'Vui lòng cung cấp tên người dùng và mật khẩu' });
        }
        try {
            const user = await UserModel.login(username);

            if (!user) {
                return res.status(404).json({ message: 'Tên người dùng không tồn tại' });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: 'Sai mật khẩu' });
            }

            const token = generateToken(res, user.id);
            res.json({ message: 'Đăng nhập thành công', token });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    };

    const register = async(req,res) =>{
        const  { username, password, fullname, address, sex, email  } = req.body;
        console.log(username);
        if (!username || !address || !password || !fullname) {
            res.status(400);
            throw new Error("Please fill all the inputs.");
    }
        try {
            const userExists = await UserModel.getUserByUsername(username);
            if (userExists) {
            res.status(400).json({ message: "username is already exists." });
            return;
            }
            await UserModel.register(username, password, fullname, address, sex, email);
            res.json({ message: 'Đăng ký thành công', username, fullname, address, sex, email });
        } catch (error) {
            console.error("Lỗi khi đăng ký người dùng:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
}

const deleteUser = async (req, res) => {
    const { id } = req.params; 
    const currentUserId = req.user.id;
    try {
        if (req.user.role !== 0 && currentUserId !== id) {
            return res.status(403).json({ message: "Bạn không có quyền xóa tài khoản này." });
        }
        const result = await UserModel.deleteUser(id); // Thêm dòng này
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }

        res.json({ message: "Người dùng đã được xóa thành công." });

    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


    const logout = async (req, res) => {
        res.cookie("jwt", "", {
          httyOnly: true,
          expires: new Date(0),
        });
        res.status(200).json({ message: "Logged out successfully" });
      };


      const listUser = async (req, res) => {
        try {
            const users = await UserModel.gelAllUser()
            res.status(200).json(users); 
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error); 
            res.status(500).send('Lỗi khi lấy danh sách người dùng.');
        }
    };

    const getoneUser = async (req,res) =>{
        const id = req.params.id;
        const currentUserId = req.user.id;
        try {
            if (req.user.role !== 0 && currentUserId !== id) {
                return res.status(403).json({ message: "Bạn không có quyền xóa tài khoản này." });
            }
            const user = await UserModel.getUserById(parseInt(id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('Người dùng không tìm thấy');
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            res.status(500).send('Lỗi khi lấy thông tin người dùng.');
        }
    };
    



export {
    login,
    register,
    deleteUser,
    logout,
    listUser,
    getoneUser,

}