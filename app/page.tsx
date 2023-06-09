import getListings, { IGetListingParams } from "./actions/getListings"
import ClientOnly from "./components/ClientOnly"
import Container from "./components/Container"
import EmptyState from "./components/EmptyState"
import ListingCard from "./components/listings/ListingCard"
import getCurrentUser from "./actions/getCurrentUser"

interface IParams {
  searchParams: IGetListingParams
}

export default async function Home({ searchParams }: IParams) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showRest />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className='
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-8
        '
        >
          {listings.map(listing => (
            <ListingCard
              currentUser={currentUser}
              data={listing}
              key={listing.id}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
