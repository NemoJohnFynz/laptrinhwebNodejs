import express from 'express';
import { deleteUser, getoneUser, listUser, login, logout, register } from '../controller/authController'
import { authenticate, authorizeAdmin } from '../midderwere/checkUser';


const router = express.Router(); 

router.post('/login',login);
router.post('/register',register);
router.delete('/delete/:id', authenticate,authorizeAdmin, deleteUser);
router.post('/logout',logout);
router.get('/listuser',listUser,authenticate);
router.get('/getuserbyid/:id',authenticate,authorizeAdmin,getoneUser);




export default router;
