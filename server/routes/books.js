import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async(req, res) =>{
    try{
        const response = await axios.get("https://openlibrary.org/search.json?title=harry+potter&author=rowling");
        if(!response.data.docs.length){
            return res.status(404).json({error:"No book found"});
        }
        const book = response.data.docs[0];
       

        const cover_id = book.cover_i;
        const cover_URL = cover_id? `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`
       :"images/books-cover-placeholder.jpeg";

       res.send({
        title: book.title,
        author: book.author,
        coverURL: cover_URL
       });
    }

    
    catch(error)
    {
        //handle error
        console.error("Error fetching data: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});