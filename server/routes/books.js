import express from "express";
import axios from "axios";
import { getAllUsers } from "../models/userModel.js";
import {getAllBooks} from "../models/bookModel.js";
import { getBookReview } from "../models/bookReviewModel.js";
import {marked} from "marked";

const router = express.Router();

// get book data from fetched response
const getBookData = async (response) => {
  if (!(response.data.docs || response.data.works)) {
    throw new Error("Error getting data!");
  }
  // check for different api routes/ params
  const bookData = response.data.docs
    ? response.data.docs
    : response.data.works;

  
  // Use Promise.all to await all descriptions
  const booksWithDescriptions = await Promise.all(
    bookData.map(async (book) => {
      const description = await getBookDescription(book); // Await the description
      return {
        title: book.title,
        author: book.author_name ? book.author_name[0] : (book.authors ? book.authors[0].name : "Unknown"), // subject route has authors instead of author_name 
        coverURL: (book.cover_i || book.cover_id)
          ? `https://covers.openlibrary.org/b/id/${book.cover_i || book.cover_id}-L.jpg`
          : "/images/book-cover-placeholder.jpeg",  
        description: description, // Now the description is awaited
      };
    })
  );

  return booksWithDescriptions;

};

//get book description
const getBookDescription = async(book) => {
  const workID = book.key.split("/").pop(); // split the key in / and get last element i.e workID
  const response = await axios.get(`https://openlibrary.org/works/${workID}.json`);

  
  let description= response.data.description;
  if(description)
    description = (typeof description === "string")? description : description.value; // markdown value
  else 
    description = "No description";

      //Convert Markdown to HTML (if available)
      if (typeof marked !== "undefined") {
        description = marked(description);
    }
    ;
  return description;
}

// Database connection test
router.get("/dbtestuser", async(req,res) =>{
  try{
    const users = await getAllUsers();
  res.json(users);
  } catch(error){
    res.status(500).json({error: "Failed to fetch users"});
  } 
})

router.get("/dbtestbooks", async(req,res) =>{
  try{
    const books = await getAllBooks();
    console.log("books retrieved ", books);
    const reviewResponse = await getBookReview(books[0].coverurl);
    console.log("books review retrieved", reviewResponse);
    console.log(reviewResponse);
    books[0].reviews = reviewResponse[0].review;

  res.json(books);
  } catch(error){
    res.status(500).json({error: "Failed to fetch books"});
  } 
})

// default home route
router.get("/", async (req, res) => {
  try {
    // trending books 
    let response = await axios.get(
      `https://openlibrary.org/trending/daily.json?limit=10`
    );

    const trendingBooks = await getBookData(response);

    // horror books
    response = await axios.get(
      "https://openlibrary.org/subjects/horror.json?limit=10"
    );
    const horrorBooks = await getBookData(response);

    // fantasy books
    response = await axios.get(
      "https://openlibrary.org/subjects/fantasy.json?limit=10"
    );
    const fantasyBooks = await getBookData(response);

    res.json({
      trending: trendingBooks,
      horor: horrorBooks,
      fantasy: fantasyBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

// book search route
router.get("/search", async (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ message: "Book name is required!" });
  }

  //encode spaces properly
  const encodedName = encodeURIComponent(name);

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${encodedName}`
    );

    if (!response.data.docs.length) {
      return res.status(404).json({ error: "No book found" });
    }
    let booksData = await getBookData(response);

    // check if the books have reviews
     for(const book of booksData){
      const response = await getBookReview(book.coverURL);
      
      if(response[0]){
          book.review = response[0].review;
      }
    }
    res.json(booksData);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

export default router;
