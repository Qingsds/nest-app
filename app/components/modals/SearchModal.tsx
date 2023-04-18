"use client"

import qs from "query-string"
import useSearchModal from "@/app/hooks/useSearchModal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import Modal from "./Modal"

import dynamic from "next/dynamic"
import { Range, RangeKeyDict } from "react-date-range"
import { CountrySelectValue } from "../inputs/CountrySelect"
import { formatISO } from "date-fns"
import Heading from "../Heading"
import CountrySelect from "../inputs/CountrySelect"
import Calendar from "../inputs/Calendar"
import Counter from "../inputs/Counter"

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRang, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  })

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const onBack = useCallback(() => {
    setStep(s => s - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep(s => s + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRang.startDate) {
      updateQuery.startDate = formatISO(dateRang.startDate)
    }

    if (dateRang.endDate) {
      updateQuery.endDate = formatISO(dateRang.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [
    bathroomCount,
    dateRang,
    guestCount,
    location,
    onNext,
    params,
    roomCount,
    searchModal,
    step,
    router,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined
    return "Back"
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location!'
      />
      <CountrySelect
        value={location}
        onChange={val => setLocation(val)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />

        <Calendar
          value={dateRang}
          onChange={value => setDateRange(value.selection)}
        />
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='More information'
          subtitle='Find your perfect place'
        />
        <Counter
          title='GuestCount'
          subtitle='how many guests are coming'
          value={guestCount}
          onChange={val => setGuestCount(val)}
        />
        <Counter
          title='Room'
          subtitle='how many rooms do you need'
          value={roomCount}
          onChange={val => setGuestCount(val)}
        />
        <Counter
          title='Bathroom'
          subtitle='how many bathroom do you need'
          value={bathroomCount}
          onChange={val => setGuestCount(val)}
        />
      </div>
    )
  }
  return (
    <Modal
      title='Filters'
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default SearchModal
