
import express from 'express';
import { createGroup, getAllGroup } from '../controller/groupController';

const router = express.Router();

router.post('/create',createGroup)
router.get("/getallGroup",getAllGroup )

export default router;
