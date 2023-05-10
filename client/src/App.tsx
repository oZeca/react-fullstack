import React, { useState } from "react";
import "./App.css";
import {
  useGetBooksQuery,
  useInsertBookMutation,
} from "./store/boobkApi";
import Book from "./components/book/book";

function App() {
  const [setBookName, setSetBookName] = useState<string>("");
  const [setReview, setSetReview] = useState<string>("");

  const getBooks = useGetBooksQuery("");
  const [insertBook, insertBookState] = useInsertBookMutation();

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    insertBook({ setBookName, setReview });
  };

  const card = getBooks.data?.map((book, key) => {
    return <Book book={book} key={key} />
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
