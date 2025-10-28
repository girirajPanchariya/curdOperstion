import { Book } from "../model/book.js";

// Add a new book
export const postbook = async (req, res) => {
  try {
    const { BookName, BookTitle, Author, sellingPrice, publseData } = req.body;

    if (!BookName || !BookTitle || !Author || !sellingPrice || !publseData) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBook = await Book.findOne({ BookName });
    if (existingBook) {
      return res.status(400).json({ message: "This book already exists" });
    }

    const newBook = new Book({
      BookName,
      BookTitle,
      Author,
      sellingPrice,
      publseData
    });

    await newBook.save();

    return res.status(200).json({
      message: "Book added successfully",
      book: newBook
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all books
export const getAllbook = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      deletedBook
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update book
export const updatebook = async (req, res) => {
  try {
    const { id } = req.params;
    const { BookName, BookTitle, Author, sellingPrice, publseData } = req.body;

    const updatedData = { BookName, BookTitle, Author, sellingPrice, publseData };

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
