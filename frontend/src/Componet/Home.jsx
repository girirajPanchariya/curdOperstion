import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    sellingPrice: "",
    publseData: "",
  });

  const [edit, setEdit] = useState(null);
  const [books, setBooks] = useState([]);

  const handleOnChangeEvent = (e) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = "your_auth_token"; // Replace with your actual token

      if (edit) {
        const res = await axios.put(
          `http://localhost:4000/add/update/${edit}`,
          bookForm,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert(res.data.message || "Book updated");
      } else {
        const res = await axios.post(
          "http://localhost:4000/add/book",
          bookForm,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert(res.data.message || "Book added");
      }

      fetchBooks();
      setBookForm({
        BookName: "",
        BookTitle: "",
        Author: "",
        sellingPrice: "",
        publseData: "",
      });
      setEdit(null);
    } catch (error) {
      console.error("Error submitting book:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const fetchBooks = async () => {
    try {
      const token = "your_auth_token"; // Replace with your actual token
      const res = await axios.get("http://localhost:4000/add/bookAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(res.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleReab = async (id) => {
    try {
      const token = "your_auth_token"; // Replace with your actual token
      const res = await axios.post(`http://localhost:4000/user/read/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = "your_auth_token"; // Replace with your actual token
      await axios.delete(`http://localhost:4000/add/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdate = (b) => {
    setBookForm({
      BookName: b.BookName,
      BookTitle: b.BookTitle,
      Author: b.Author,
      sellingPrice: b.sellingPrice,
      publseData: b.publseData?.split("T")[0] || "",
    });
    setEdit(b._id);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full px-5 min-h-[calc(100vh-60px)]">
        <form onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-5 gap-3">
            <div className="w-full flex flex-col">
              <label>Book Name:</label>
              <input
                type="text"
                name="BookName"
                value={bookForm.BookName}
                onChange={handleOnChangeEvent}
                placeholder="Book Name"
                className="w-full border border-gray-400 rounded-sm px-2 h-10 text-gray-800"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Book Title:</label>
              <input
                type="text"
                name="BookTitle"
                value={bookForm.BookTitle}
                onChange={handleOnChangeEvent}
                placeholder="Book Title"
                className="w-full border border-gray-400 rounded-sm px-2 h-10 text-gray-800"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Book Author:</label>
              <input
                type="text"
                name="Author"
                value={bookForm.Author}
                onChange={handleOnChangeEvent}
                placeholder="Book Author"
                className="w-full border border-gray-400 rounded-sm px-2 h-10 text-gray-800"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Selling Price:</label>
              <input
                type="text"
                name="sellingPrice"
                value={bookForm.sellingPrice}
                onChange={handleOnChangeEvent}
                placeholder="Selling Price"
                className="w-full border border-gray-400 rounded-sm px-2 h-10 text-gray-800"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Publish Date:</label>
              <input
                type="date"
                name="publseData"
                value={bookForm.publseData}
                onChange={handleOnChangeEvent}
                className="w-full border border-gray-400 rounded-sm px-2 h-10 text-gray-800"
              />
            </div>
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-400 h-10 rounded-sm w-[10%] hover:cursor-pointer"
            >
              {edit ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        {/* Book List Table */}
        <div className="w-full mt-10">
          <table className="w-full bg-white divide-y divide-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Selling Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Publish Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-400">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-200">
                  <td className="px-6 py-3 whitespace-nowrap">{book.BookName}</td>
                  <td className="px-6 py-3 whitespace-nowrap">{book.BookTitle}</td>
                  <td className="px-6 py-3 whitespace-nowrap">{book.Author}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    ${book.sellingPrice}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book.publseData?.split("T")[0]}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap space-x-3">
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete 
                    </button>
                    <button
                      className="text-gre.en-600 cursor-pointer"
                      onClick={() => handleUpdate(book)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleReab(book._id)}>
                      Read Book
                    </button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
