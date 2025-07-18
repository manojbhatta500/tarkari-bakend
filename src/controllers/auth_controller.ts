import { Request , Response } from "express";
import {errorModel,successModel} from "../utils/generic_models";
import {pool} from "../services/db_service";
import {getHashedPassword, isCorrectPassword} from "../services/bcrypt_service";

import {generateSignedToken} from "../services/jwt_service";

export async function login_controller(req : Request,res : Response) {
    const {mobile , password} = req.body;

    try{
        if (!mobile || !password){
        res.status(500).json(errorModel(`number and password are required feild.`));
        }
    }catch(e){
        res.status(500).json(errorModel(`internal server error${e} `));
    }


    const doesUserExistsQuery = 
    `select id from users where mobile=$1`;
    const doesUserExistsQueryData = [mobile];

    const doesUserExist = await pool.query(doesUserExistsQuery,doesUserExistsQueryData);

    if (doesUserExist.rowCount == 0){
    return res.status(400).json(errorModel("user does not exists"));
    }

    const getUserDataQuery = 
    `select id,mobile,password from users where mobile=$1 `;
    const getUserDataQueryData = [mobile]; 
    
    const getuserData = await pool.query(getUserDataQuery,getUserDataQueryData);
    const doesPasswordMatch = await isCorrectPassword(password,getuserData.rows[0].password);
    if (!doesPasswordMatch){
    res.status(500).json(errorModel(`please provide a correct password`));
    }
    const token = await generateSignedToken(getuserData.rows[0].id,getuserData.rows[0].mobile);
    res.status(200).json({
                "status": "successfully logged in",
                "token" : token
    });    
}


export async function signup_controller(req:Request,res:Response){
    try{
    const {number,password,fullname,email} = req.body;
    if (!number || !password || !fullname || !email) {
        return res.status(400).json(errorModel("number,password,fullname,email are required fields."));
    }
    const  mobileAndEmailCheckQuery = 
    `select id,email,mobile from users where email=$1 and mobile = $2`;
    const checkerArray = [email,number];
    const doesUserExist = await pool.query(mobileAndEmailCheckQuery,checkerArray);
    if(doesUserExist.rowCount! > 0){
        return     res.status(500).json(errorModel(`user already exists`));
    }
    const hashedPassword = await getHashedPassword(password);    
    const insertQuery = `
      INSERT INTO users (mobile,password,full_name,email)
      VALUES ($1, $2,$3,$4)
      RETURNING id, mobile
    `;
    const values = [number, hashedPassword,fullname,email];
    const result = await pool.query(insertQuery, values);
    res.status(201).json({
        status: 1,
        message: "User created successfully",
        id: result.rows[0].id,
        mobile: result.rows[0].mobile
    });
    }catch(e){
    console.log(`actual error while logging in ${e}`)
    res.status(500).json(errorModel(`internal server error ${e} `));
    }
}