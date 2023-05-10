import React, { useState } from "react";
import "./App.css";
import {
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBooksQuery,
  useInsertBookMutation,
} from "./store/boobkApi";

function App() {
  const [setBookName, setSetBookName] = useState<string>("");
  const [setReview, setSetReview] = useState<string>("");
  const [reviewUpdate, setReviewUpdate] = useState<string>("");

  const getBooks = useGetBooksQuery("");
  const [insertBook, insertBookState] = useInsertBookMutation();
  const [editBook, editBookState] = useEditBookMutation();
  const [deleteBook, deleteBookState] = useDeleteBookMutation();

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    insertBook({ setBookName, setReview });
  };

  const deleteB = (id: number) => {
    if (window.confirm("Do you want to delete? ")) {
      deleteBook(id.toString());
    }
  };

  const edit = (id: number) => {
    editBook({ id: id.toString(), reviewUpdate });
  };

  const card = getBooks.data?.map((val, key) => {
    return (
      <div
        className="flex flex-row flex-wrap bg-slate-200 p-4 rounded-md"
        key={key}
      >
        <div className="text-left">
          <h5>{val.book_name}</h5>
          <p>{val.book_review}</p>
        </div>
        <input
          name="reviewUpdate"
          onChange={(e) => setReviewUpdate(e.target.value)}
          placeholder="Update Review"
          className="block w-full rounded-md border-0 py-1.5 p-2 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          disabled={editBookState.isLoading}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            edit(val.id);
          }}
        >
          Update
        </button>
        <button
          disabled={deleteBookState.isLoading}
          className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={() => {
            deleteB(val.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="App flex min-h-full flex-col px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-bold underline">BOOKS</h1>
      <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <input
          required
          name="setBookName"
          placeholder="Enter Book Name"
          onChange={(e) => setSetBookName(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          required
          name="setReview"
          placeholder="Enter Review"
          onChange={(e) => setSetReview(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          disabled={insertBookState.isLoading}
          type="submit"
          onClick={submit}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>{" "}
      </form>
      <div className="my-20 border-b-2 border-indigo-500" />
      {card && card.length > 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 gap-10 w-full">{card}</div>
      ) : (
        "Your books will appear here after you create one."
      )}
    </div>
  );
}

export default App;
