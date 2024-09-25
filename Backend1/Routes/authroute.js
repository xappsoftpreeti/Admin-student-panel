import express from 'express';
import { registerController } from "../Controllers/authController.js";

//router object
const router = express.Router()
//routing
//Registration(POST)
router.post('/registration',registerController)


export default router ``