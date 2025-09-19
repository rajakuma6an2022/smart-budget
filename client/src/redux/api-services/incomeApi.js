import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Income"],
  endpoints: (builder) => ({
    // Get all incomes
    getIncomes: builder.query({
      query: () => "/income/get",
      providesTags: ["Income"],
    }),

    // Add new income
    addIncome: builder.mutation({
      query: (body) => ({
        url: "/income/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Income"],
    }),

    // Update income
    updateIncome: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/income/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Income"],
    }),

    // Delete income
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/income/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Income"],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;

export default incomeApi.reducer;
