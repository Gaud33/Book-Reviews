import { useState } from "react";
import "./App.css";
import "./components/BookList";
import BookList from "./components/BookList";

function App() {
  return (
    <div class="content">
      <BookList />
    </div>
  );
}

export default App;
