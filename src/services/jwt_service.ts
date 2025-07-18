import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();




export async function generateSignedToken(userid:string,mobile:string){
const token = jwt.sign(
  { userId: userid,mobile_number:mobile  },
  process.env.JWT_SECRET!, 
  { expiresIn: "7d" }
);
return token
}

