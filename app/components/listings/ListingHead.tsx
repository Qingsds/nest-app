"use client"

import { SafeUser } from "@/app/types"
import Heading from "../Heading"
import useCountries from "@/app/hooks/useCountries"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingHeadProps {
  id: string
  title: string
  currentUser?: SafeUser | null
  imageSrc: string
  locationValue: string
}

const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  currentUser,
  imageSrc,
  locationValue,
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.flag} ${location?.label},${location?.region}`}
      />
      <div
        className='
					w-full
					h-[60vh]
					overflow-hidden
					rounded-xl
					relative
				'
      >
        <Image
          src={imageSrc}
          alt='image'
          fill
          className='object-cover w-full'
        />

        <div className='absolute top-5 right-5'>
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead
