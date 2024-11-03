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
        if (!req.session.user) {
            return res.status(401).send('Bạn cần đăng nhập để xem thông tin chi tiết người dùng.');
        }
        const { id } = req.params;
        const userRole = req.session.user.role;  
        const userId = req.session.user.id;

        if (userRole === 1) {
            if (userId != id) {
                return res.status(403).send('Bạn đã rơi vào lãnh địa của Nemo chỉ những người có tiền mới xem được thông tin của người khác.');
            }
        } else if (userRole === 0) {
        } else {
            return res.status(403).send('Forbidden');
        }
        await UserModel.updateUser( id, fullname, address, sex, email); 
        res.redirect('/getlistuser'); 
    } catch (error) {
        res.status(500).send('Lỗi khi cập nhật thông tin người dùng.');
    }
};


    const deleteUser = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).send('Bạn cần đăng nhập để xem thông tin chi tiết người dùng.');
            }
            const { id } = req.params;
            const userRole = req.session.user.role;  
            const userId = req.session.user.id;
            if (userRole === 1) {
                if (userId != id) {
                    // Nếu không có quyền admin thì bạn chỉ có thể xem thông tin của bản thân 
                    return res.status(403).send('Bạn đã rơi vào lãnh địa của Nemo chỉ những người có tiền mới xem được thông tin của người khác.');
                }
            } else if (userRole === 0) {
            } else {
                return res.status(403).send('Forbidden');
            }
            await UserModel.deleteUser(id);
            res.redirect('/getlistuser'); 
        } catch (error) {
            res.status(500).send('Lỗi khi xóa người dùng.');
        }
    };

    const detailUser = async (req, res) => {
        try {

            if (!req.session.user) {
                return res.status(401).send('Bạn cần đăng nhập để xem thông tin chi tiết người dùng.');
            }

            const { id } = req.params;
            const userRole = req.session.user.role;  
            const userId = req.session.user.id;

            if (userRole === 1) {
                if (userId != id) {
                    // Nếu không có quyền admin thì bạn chỉ có thể xem thông tin của bản thân 
                    return res.status(403).send('Bạn đã rơi vào lãnh địa của Nemo chỉ những người có tiền mới xem được thông tin của người khác.');
                }
            } else if (userRole === 0) {

            } else {
                return res.status(403).send('Forbidden');
            }
    

            const user = await UserModel.detailUser(id);
            if (!user) {
                return res.status(404).send('Người dùng không tồn tại.');
            }
            res.render('detailUser', { user });
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết người dùng:', error);
            res.status(500).send('Lỗi khi lấy thông tin chi tiết người dùng.');
        }
    };

    const inserUser = async (req, res) => {
        try {            if (!req.session.user) {
            return res.status(401).send('Bạn cần đăng nhập để xem thông tin chi tiết người dùng.');
        }

        const { id } = req.params;
        const userRole = req.session.user.role;  
        const userId = req.session.user.id;

        if (userRole === 1) {
            if (userId != id) {
                // Nếu không có quyền admin thì bạn chỉ có thể xem thông tin của bản thân 
                return res.status(403).send('Bạn đã rơi vào lãnh địa của Nemo chỉ những người có tiền mới xem được thông tin của người khác.');
            }
        } else if (userRole === 0) {

        } else {
            return res.status(403).send('Forbidden');
        }
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
            if (!req.session.user) {
                return res.status(401).send('Bạn cần đăng nhập để xem thông tin chi tiết người dùng.');
            }
            const { id } = req.params;
            const userRole = req.session.user.role;  
            const userId = req.session.user.id;

            if (userRole === 1) {
                if (userId != id) {
                    return res.status(403).send('Bạn đã rơi vào lãnh địa của Nemo chỉ những người có tiền mới xem được thông tin của người khác.');
                }
            } else if (userRole === 0) {
            } else {
                return res.status(403).send('Forbidden');
            }
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

            generateToken(res, user.id);
            req.session.username = user.username;
            req.session.user = user;
            console.log('user:', user);
            console.log('usersession:', req.session.user);
            console.log(user.username);
            console.log('Cookies:', req.cookies);
            console.log('Session:', req.session);
            res.redirect('/');
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            res.render('login', { error: 'Lỗi server, vui lòng thử lại sau.' });
        }
    };

    // controllers/authController.js

    const logout = (req, res) => {
    // Xóa session
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Could not log out.");
        }
        // Xóa cookie nếu cần
        res.clearCookie('connect.sid'); 
        res.clearCookie('jwt');
        res.redirect('/'); 
    });
};


    
    
export {registerUser, listUser, updateUser, deleteUser, detailUser, inserUser, getUserById, login, logout}
