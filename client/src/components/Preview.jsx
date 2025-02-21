import React from "react";
import "./Preview.css";
import LinearProgress from '@mui/joy/LinearProgress';

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

      {/*render the markdown received from descrption as HTML*/}
      <div
        class="book-summary"
        dangerouslySetInnerHTML={{ __html: props.bookData.description }}
      />

      <div class="btn-container">
        
        <button class ="bookmark-btn"> Bookmark </button>
        <button class="review-btn">Review</button>
      </div>
    </div>
  );
}

export default Preview;
