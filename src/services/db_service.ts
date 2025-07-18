import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // 👈 Make sure this runs before using process.env


 export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port : parseInt(String(process.env.DBPORT))
});




export  async function  checkDbConnection() {
  try{
    await pool.connect();
    console.log("connected to database");
  }catch(e){
  console.log(`error connecting to the database ${e}`)
  }  
}

