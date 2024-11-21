import api from "../../store/api";

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "/players",
      providesTags: ["Puppy"],
    }),
    getPuppy: build.query({
      query: (id) => `/players/${id}`,
      providesTags: (result, error, id) => [{ type: "Puppy", id }],
    }),
    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: "/players",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: ["Puppy"],
    }),
    deletePuppy: build.mutation({
      query: (id) => ({
        url: `/players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Puppy", id }],
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
