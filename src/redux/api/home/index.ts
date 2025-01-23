import {api as index} from ".."

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getAttractions: builder.query<HOME.AttractionsResponse, HOME.AttractionsRequest>({
            query: () => ({
                url: "/attractions",
                method: "GET",
            }),
            providesTags: ["attractions"]
        })
    })
})

export const {useGetAttractionsQuery} = api