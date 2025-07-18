
import { Router } from "express";
import {test }   from "../controllers/test";
import  {login_controller, signup_controller}  from "../controllers/auth_controller";


export const router = Router();


router.get('/',test);


router.post("/login",login_controller);

router.post("/signup",signup_controller);


