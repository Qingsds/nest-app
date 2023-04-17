import prisma from "@/app/libs/prismadb"

export interface IGetListingParams {
  userId?: string
}

export default async function getListings(params: IGetListingParams) {
  try {
    const { userId } = params
    const query: any = {}

    if (userId) {
      query.userId = userId
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    })
    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error) {
    throw new Error(error as any)
  }
}
