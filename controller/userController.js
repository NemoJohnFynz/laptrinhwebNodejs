import * as UserModel from "../model/UserModel";
import generateToken  from "../midderwere/createToken"
import bcrypt from 'bcryptjs';


const registerUser = async (req, res) => {
    try {
        const { username, password, fullname, address, sex, email } = req.body;
        await UserModel.register(username, password, fullname, address, sex, email);
        
        
        res.redirect('/getlistuser');
    } catch (error) {
       
        res.render('register', { error: error.message });
    };
}

const listUser = async (req, res) => {
    try {
        const users = await UserModel.gelAllUser(); // Sử dụng hàm đúng
        res.render('listUser', { users }); 
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error); // Ghi lại lỗi
        res.status(500).send('Lỗi khi lấy danh sách người dùng.');
    }
};


const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ params
        const { fullname, address, sex, email } = req.body;
        await UserModel.updateUser( id, fullname, address, sex, email); 
        res.redirect('/getlistuser'); 
    } catch (error) {
        res.status(500).send('Lỗi khi cập nhật thông tin người dùng.');
    }
};


    const deleteUser = async (req, res) => {
        try {
            const { id } = req.params; 
            await UserModel.deleteUser(id);
            res.redirect('/getlistuser'); 
        } catch (error) {
            res.status(500).send('Lỗi khi xóa người dùng.');
        }
    };

    const detailUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserModel.detailUser(id);
            res.render('detailUser', { user }); 
        } catch (error) {
            res.status(500).send('Lỗi khi lấy thông tin chi tiết người dùng.');
        }
    };

    const inserUser = async (req, res) => {
        try {
            const { username, password, fullname, address, sex, email } = req.body;
            await UserModel.inserUser(username, password, fullname, address, sex, email);
            res.redirect('/getlistuser'); // Chuyển hướng sau khi thêm thành công
        } catch (error) {
            res.status(500).send('Lỗi khi thêm người dùng.');
        }
    };

    const getUserById = async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await UserModel.getUserById(userId); 
            if (user) {
                res.render('updateUser', { user }); 
                res.status(404).send('Người dùng không tồn tại.');
            }
        } catch (err) {
            console.error(err); 
            res.status(500).send('Lỗi khi lấy thông tin người dùng.');
        }
    };

    const login = async (req, res) => {
        
        const { username, password } = req.body;
        
        try {
            const user = await UserModel.login(username);
            if (!user) {
                return res.render('login', { error: 'Tên người dùng không tồn tại.' });
            }
    
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.render('login', { error: 'Sai mật khẩu.' });
            }
    
            // Tạo token và gán vào cookie
            generateToken(res, user.id);
            res.cookie("username", user.username, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
              });
    
            
            res.redirect('/getlistuser');
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            res.render('login', { error: 'Lỗi server, vui lòng thử lại sau.' });
        }
    };
    
    
export {registerUser, listUser, updateUser, deleteUser, detailUser, inserUser, getUserById, login}
