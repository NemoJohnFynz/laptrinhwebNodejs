import * as UserModel from "../model/UserModel";

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

export {registerUser, listUser, updateUser, deleteUser, detailUser, inserUser, getUserById}
