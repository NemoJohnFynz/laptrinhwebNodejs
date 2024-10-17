import express from 'express';
import { listUser, registerUser } from '../controller/userController'; 

const userRouter = express.Router(); 


userRouter.get('/register', (req, res) => {
    res.render('register', { error: null });
});

userRouter.post('/registerUser', registerUser);
userRouter.get('/getlistuser',listUser)

export default userRouter;
