import {api as index} from ".."


const api = index.injectEndpoints({
    endpoints: (builder) => ({
        getGallery: builder.query<GALLERY.GalleryResponse, GALLERY.GalleryRequest>({
            query: () => ({
                url: `/gallery`,
                method: "GET",
            }),
            providesTags: ["gallery" ],
        }),
    })

})

export const {useGetGalleryQuery} = api