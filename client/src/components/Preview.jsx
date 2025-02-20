import React from "react";
import "./Preview.css";

function Preview(props) {
  return (
    <div class="preview-display">
      <div class="preview-content">
        <img src={props.bookData.coverURL}></img>
        <div class="book-info">
          <h1 class="book-title">{props.bookData.title}</h1>
          <p>{props.bookData.author}</p>
        </div>
      </div>
      <p class="book-summary">
        "Alice in Wonderland" tells the story of a young girl named Alice who
        falls down a rabbit hole and enters a bizarre fantasy world called
        Wonderland, where she encounters peculiar creatures like the Mad Hatter,
        Cheshire Cat, and Queen of Hearts, experiencing strange situations that
        defy logic, often involving changing size by eating and drinking magical
        items; ultimately, Alice wakes up realizing her adventures were just a
        dream.{" "}
      </p>
      <div class="btn-container">
        <button class="bookmark-btn">Bookmark </button>
        <button class="review-btn">Review</button>
      </div>
    </div>
  );
}

export default Preview;
