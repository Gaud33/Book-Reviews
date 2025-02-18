import pool from "../config/db.js";

// get all users
export const getAllUsers = async () =>{
    try{
        const {rows} = await pool.query("SELECT * FROM users");
        return rows;
    }

    catch(error){
        console.log("User Query error!");
        res.status(500).json({error: "User query error"});
    }
    
}