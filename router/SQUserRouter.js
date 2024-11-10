import express from 'express'
import { 
    createUser,
    deleteUser,
 } from '../controller/SQUserController'

 const router = express.Router();


 router.post('/createUser',createUser)
 router.delete('/deleteUser',deleteUser)

 export default router;
