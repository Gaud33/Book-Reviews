import express from "express";
import booksRoutes from "./routes/books.js";
import cors from "cors";

const app = express();
const port = 3000;


app.use(express.static("public"));

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
