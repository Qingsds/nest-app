"use client"

import differenceInCalendarDays from "date-fns/esm/fp/differenceInCalendarDays"
import { useCallback, useEffect, useMemo, useState } from "react"
import { categories } from "@/app/components/navbar/Categories"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import axios from "axios"

import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { toast } from "react-hot-toast"
import { Range } from "react-date-range"
import { eachDayOfInterval } from "date-fns"

import ListingReservation from "@/app/components/listings/ListingReservation"
import ListingHead from "@/app/components/listings/ListingHead"
import ListingInfo from "@/app/components/listings/ListingInfo"
import Container from "@/app/components/Container"

interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsLoading(true)

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("操作成功！")
        setDateRange(initialDateRange)
        router.push("/trips")
      })
      .catch(error => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    currentUser,
    totalPrice,
    dateRange,
    listing.id,
    loginModal,
    router,
  ])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  /**
   * find current category
   */
  const category = useMemo(() => {
    return categories.find(item => {
      return item.label === listing.category
    })
  }, [listing])

  /**
   *
   */
  const disableDates = useMemo(() => {
    let dates: Date[] = []
    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })
      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            currentUser={currentUser}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />
        </div>
        <div
          className='
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          '
        >
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div
            className='
              order-1
              mb-10
              md:order-last
              md:col-span-3
            '
          >
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              disabled={isLoading}
              dateRange={dateRange}
              disableDates={disableDates}
              onChangeDate={value => setDateRange(value)}
              onSubmit={onCreateReservation}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
export default ListingClient
