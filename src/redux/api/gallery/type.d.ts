namespace GALLERY {
    type GalleryResponse = {
        id: number
        gallery_name: string
        gallery_image: string
        address: string
        avg_rating: number
        rating_count: number
    }[]

    type GalleryRequest = void
}