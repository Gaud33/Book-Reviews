import pool from "../config/db.js";

// get all books
export const getAllBooks = async ()=>{
    try{
        const {rows} = await pool.query("SELECT * FROM books");
        return rows;
    }
    catch(error){
        console.log("Book query error!");
        res.status(500).json({error: "Book query error!"});
    }
}