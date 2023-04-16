import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"

import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='未登录'
          subtitle='请先登录'
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (!reservations || reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='You have no trips!'
          subtitle='place add trips first'
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default TripsPage
