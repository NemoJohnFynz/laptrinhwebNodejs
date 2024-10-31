import express from 'express';
import myDateTime from '../date'; // Đường dẫn tới file chứa hàm lấy thời gian
import { getParamsURL } from '../getURL'; // Đường dẫn tới file chứa hàm lấy URL params
import { homeController } from '../controller/Home.controller';
import { aboutController } from '../controller/aboutController';
import { contactController } from '../controller/ContactController';
import { deleteUser, detailUser, inserUser, listUser, registerUser, updateUser, getUserById, login } from '../controller/userController'; 


const router = express.Router();

// Route cho trang chủ
router.get('/', homeController)

// Route cho trang About
router.get('/about', aboutController)

//router cho trang contact
router.get('/contact', contactController)

// Route cho trang Date
router.get('/date', (req, res) => {
    res.send(myDateTime()); // Trả về thời gian hiện tại
});

// Route cho việc lấy URL params
router.get('/getURL', (req, res) => {
    res.send(getParamsURL(req)); // Trả về các params URL
});

// Route cho trang Test
router.get('/test', (req, res) => {
    res.render('test'); 
});


//đăng ký 
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});
router.post('/registerUser', registerUser);

//list user
router.get('/getlistuser',listUser);


//cập nhật người dùng
router.get('/:id/updateUser', getUserById); 
router.post('/:id/updates', updateUser); 


router.get('/:id/detailUser', (req, res) => {
    res.render('detailUser', { userId: req.params.id });
});
router.get('/:id/details', detailUser);


//thêm user
router.get('/insertUser', (req, res) => {
    res.render('insertUser'); // Hiển thị form thêm người dùng mới
});
router.post('/insertUser', inserUser);


//só user
router.post('/:id/delete', deleteUser);

//login user

router.get('/login', (req, res) => res.render('login', { error: null }));
router.post('/login',login)


export default router;
