import express from "express";
import booksRoutes from "./routes/books.js";

const app = express();
const port = 3000;

// ✅ Serve static files from "public" folder
app.use(express.static("public"));

// ✅ Use the books route
app.use("/api/books", booksRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
