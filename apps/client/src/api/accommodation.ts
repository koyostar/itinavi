import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Accommodation = {
  id?: number;
  hotel: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  notes?: string;
};

export const accommodationApi = createApi({
  reducerPath: "accommodationApi", // key for this API slice in Redux store
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }), // shared base URL
  tagTypes: ["Accommodations"], // used for cache invalidation
  endpoints: (builder) => ({
    // GET /accommodation
    getAccommodations: builder.query<Accommodation[], void>({
      query: () => "/accommodation",
      providesTags: ["Accommodations"],
    }),

    // GET /accommodation/:id
    getOneAccommodation: builder.query<Accommodation, number>({
      query: (id) => `/accommodation/${id}`,
    }),

    // POST /accommodation
    createAccommodation: builder.mutation<Accommodation, Accommodation>({
      query: (newData) => ({
        url: "/accommodation",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Accommodations"],
    }),

    // DELETE /accommodation/:id
    deleteAccommodation: builder.mutation<void, number>({
      query: (id) => ({
        url: `/accommodation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Accommodations"],
    }),

    // PUT /accommodation/:id
    updateAccommodation: builder.mutation<
      Accommodation,
      { id: number; data: Partial<Accommodation> }
    >({
      query: ({ id, data }) => ({
        url: `/accommodation/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Accommodations"],
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetAccommodationsQuery,
  useGetOneAccommodationQuery,
  useCreateAccommodationMutation,
  useDeleteAccommodationMutation,
  useUpdateAccommodationMutation,
} = accommodationApi;
