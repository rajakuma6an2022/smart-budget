import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
export default userApi.reducer;
