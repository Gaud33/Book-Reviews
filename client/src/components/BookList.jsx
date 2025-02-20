import { useEffect, useState } from "react";
import axios from "axios";
import "./BookList.css";
import Slider from "./Slider.jsx";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");

        console.log("Fetched data:", response.data); // Debugging API response
        setBooks(response.data); // Update state
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      {/* Render components only when loading completes*/}
      {!loading && books && Object.keys(books).length > 0 && (
        <div>
          <h2>Book List</h2>

          {Object.keys(books).map(
            (
              category // category is horror/fiction/...etc
            ) => (
              <div key={category}>
                <h3>{category}</h3>
                <Slider
                  className="books-display"
                  books={books[category]} // books["horror"] = {....}
                />
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default BookList;
