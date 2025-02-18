import pool from "../config/db.js";

export const getBookReview = async (coverURL) =>{
    try{
        const {rows} = await pool.query(`SELECT review 
            FROM bookreviews br
            INNER JOIN books b ON br.id = b.id
            WHERE b.coverurl = $1`,
        [coverURL]
    );
            return(rows);
    }
    catch(error){
        throw new Error("Database query failed");
    }
}