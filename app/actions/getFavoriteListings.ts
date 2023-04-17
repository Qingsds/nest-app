import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    const favoriteIds = currentUser.favoriteIds || []

    const favoritesListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...favoriteIds],
        },
      },
    })

    const safeFavoriteListings = favoritesListings.map(fl => ({
      ...fl,
      createdAt: fl.createdAt.toISOString(),
    }))

    return safeFavoriteListings
  } catch (error) {
    throw new Error(error as any)
  }
}

export default getFavoriteListings
