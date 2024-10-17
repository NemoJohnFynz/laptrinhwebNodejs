import express from 'express';
import myDateTime from '../date'; // Đường dẫn tới file chứa hàm lấy thời gian
import { getParamsURL } from '../getURL'; // Đường dẫn tới file chứa hàm lấy URL params
import { homeController } from '../controller/Home.controller';
import { aboutController } from '../controller/aboutController';
import { contactController } from '../controller/ContactController';

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
    res.render('test'); // Render trang test.ejs
});

export default router;
