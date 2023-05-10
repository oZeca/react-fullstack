import React, { useState } from "react";
import { BookType } from './bookType'
import { useDeleteBookMutation, useEditBookMutation } from "../../store/boobkApi";

interface Props {
    book: BookType
}

function Book(props: Props) {
    const [reviewUpdate, setReviewUpdate] = useState<string>("");

    const [editBook, editBookState] = useEditBookMutation();
    const [deleteBook, deleteBookState] = useDeleteBookMutation();

    const deleteB = (id: number) => {
        if (window.confirm("Do you want to delete? ")) {
            deleteBook(id.toString());
        }
    };

    const edit = (id: number) => {
        editBook({ id: id.toString(), reviewUpdate });
    };

    return (
        <div
            className="flex flex-row flex-wrap bg-slate-200 p-4 rounded-md"
        >
            <div className="text-left">
                <h5>{props.book.book_name}</h5>
                <p>{props.book.book_review}</p>
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
                    edit(props.book.id);
                }}
            >
                Update
            </button>
            <button
                disabled={deleteBookState.isLoading}
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={() => {
                    deleteB(props.book.id);
                }}
            >
                Delete
            </button>
        </div>
    );
}

export default Book