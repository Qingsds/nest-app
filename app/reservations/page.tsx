import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Unauthorized!'
          subtitle='Place login'
        />
      </ClientOnly>
    )
  }

  return <div>reservation page</div>
}

export default ReservationsPage
