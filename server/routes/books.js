import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async(req, res) =>{
    try{
        const response = await axios.get("https://openlibrary.org/search.json?title=harry+potter&author=rowling");
        if(!response.data.docs.length){
            return res.status(404).json({error:"No book found"});
        }
        const booksData = [];
        const book = response.data.docs[0];
        const books = {
            title: book.title,
            author: book.author_name[0],
            coverURL: book.cover_i? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`: "/images/book-cover-placeholder.jpeg"  
        }

        booksData.push(books);
       
        
      res.json(booksData);
    }

    
    catch(error)
    {
        //handle error
        console.error("Error fetching data: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export default router;