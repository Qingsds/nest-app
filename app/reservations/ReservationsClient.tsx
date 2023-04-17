"use client"

import { useState, useCallback } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import axios from "axios"

import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"

import { SafeReservation, SafeUser } from "../types"

interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser: SafeUser
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled")
          router.refresh()
        })
        .catch(error => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router]
  )
  return (
    <Container>
      <Heading
        title='Reservations'
        subtitle='Bookings on your properties'
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
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            reservation={reservation}
            data={reservation.listing}
            currentUser={currentUser}
            onAction={onCancel}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
