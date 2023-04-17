"use client"

import Container from "../components/Container"
import Heading from "../components/Heading"

import { SafeListing, SafeUser } from "../types"
import ListingCard from "../components/listings/ListingCard"

interface FavoritesClientProps {
  currentUser: SafeUser
  favorites: SafeListing[]
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  favorites,
}) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='my favorites list'
      />

      <div
        className='
					mt-10
					gap-8
					grid
					grid-cols-1
					sm:grid-cols-2
					md:grid-cols-3
					lg:grid-cols-4
					xl:grid-cols-5
					2xl:grid-cols-6
				'
      >
        {favorites.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
