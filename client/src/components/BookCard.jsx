import React from "react";
import "./BookCard.css";

function BookCard(props) {
    return (
        <div className="book-card">
            <img 
                src={props.bookData.coverURL || "https://via.placeholder.com/150"} 
                alt="Book Cover"
                class = "cover-img"
            />
        </div>  
    );
}

export default BookCard;
