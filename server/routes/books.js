import express from "express";
import axios from "axios";

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

  return bookData.map((book) => ({
    title: book.title,
    author: book.author_name ? book.author_name[0] : "Unknown",
    coverURL: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : "/images/book-cover-placeholder.jpeg",
  }));
};

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

// search route
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
    const booksData = await getBookData(response);

    res.json(booksData);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

export default router;
