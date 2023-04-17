import getCurrentUser from "@/app/actions/getCurrentUser"
import getListings from "../actions/getListings"

import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient"
import getFavoriteListings from "../actions/getFavoriteListings"

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Unauthorized'
          subtitle='Place login'
        />
      </ClientOnly>
    )
  }

  const favorites = await getFavoriteListings()
  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found ~'
          subtitle='Looks like you have on favorite rooms'
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient
        currentUser={currentUser}
        favorites={favorites}
      />
    </ClientOnly>
  )
}

export default FavoritesPage
