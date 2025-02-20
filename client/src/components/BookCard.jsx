import React from "react";
import "./BookCard.css";
import Preview from "./Preview";
import { useState } from "react";

function BookCard(props) {
  const [hoverStatus, setHoverStatus] = useState(false);

  return (
    <div
      className="book-card"
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => setHoverStatus(false)}
    >
      <img
        src={props.bookData.coverURL || "https://via.placeholder.com/150"}
        alt="Book Cover"
        class="cover-img"
      />

      {hoverStatus && <Preview bookData={props.bookData} />}
    </div>
  );
}

export default BookCard;
