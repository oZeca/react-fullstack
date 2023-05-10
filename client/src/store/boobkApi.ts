import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookType } from "../components/book/bookType";

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "api" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // list
    getBooks: builder.query<
      [BookType],
      string
    >({
      query: () => `/get`,
      providesTags: ["Books"],
    }),
    // insert
    insertBook: builder.mutation<
      any,
      { setBookName: string; setReview: string }
    >({
      query: (body) => ({
        url: `insert/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Books"],
    }),
    // edit
    editBook: builder.mutation<any, { id: string; reviewUpdate: string }>({
      query: (body) => ({
        url: `update/${body.id}`,
        method: "PUT",
        body: { reviewUpdate: body.reviewUpdate },
      }),
      invalidatesTags: ["Books"],
    }),
    // edit
    deleteBook: builder.mutation<any, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBooksQuery,
  useInsertBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
