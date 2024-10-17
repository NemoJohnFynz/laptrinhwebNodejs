import * as UserModel from "../model/UserModel";

const registerUser = async (req, res) => {
    try {
        const { username, password, fullname, address, sex, email } = req.body;
        await UserModel.register(username, password, fullname, address, sex, email);
        
        
        res.redirect('/');
    } catch (error) {
       
        res.render('register', { error: error.message });
    };
}

    const listUser = async (req, res) => {
        try {
            
            const users = await UserModel.gelAllUser(); 
            res.render('listUser', { users }); 
            
        } catch (error) {
            // Nếu có lỗi, trả về thông báo lỗi
            res.status(500).send('Lỗi khi lấy danh sách người dùng.');
        }
    }


export {registerUser, listUser}
