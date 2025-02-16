import { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/books"); 

          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
    };

    fetchBooks();
  }, []);

  console.log(books);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <img src= {book.coverURL} alt={book.title} width="150" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
