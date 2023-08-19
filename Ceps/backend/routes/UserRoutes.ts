import { Router } from "express";
import UserController from "../controllers/UserController";
import verifyToken from "../helpes/verifyToken";
import {imageUpload} from '../helpes/image-upload';

const router = Router();

router.post('/register',UserController.registerUser);
router.post('/login',UserController.login);
router.get('/myuser',verifyToken,UserController.myUser);
router.patch('/update',verifyToken,imageUpload.single('photo'),UserController.updateUser);
router.delete('/delete',verifyToken,UserController.deleteUser);

export default router;