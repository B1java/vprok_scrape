export type ProductData = {
    price: {
        oldPrice: string | null,
        newPrice: string | null,
        regPrice: string | null
    },
    feedback: {
        reviewsCount: string | null,
        rating: string | null
    }
}