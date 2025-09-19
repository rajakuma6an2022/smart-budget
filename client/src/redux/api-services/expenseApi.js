import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    // Get all Expense
    getExpenses: builder.query({
      query: () => "/expense/get",
      providesTags: ["Expense"],
    }),

    // Add new Expense
    addExpense: builder.mutation({
      query: (body) => ({
        url: "/expense/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expense"],
    }),

    // Update Expense
    updateExpense: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/expense/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Expense"],
    }),

    // Delete income
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expense/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} = expenseApi;

export default expenseApi.reducer;
