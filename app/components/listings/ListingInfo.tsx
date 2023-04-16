"use client"

import { SafeUser } from "@/app/types"
import { Category } from "../navbar/Categories"
import useCountries from "@/app/hooks/useCountries"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../Map"), {
  ssr: false,
})

interface ListingInfoProps {
  user: SafeUser
  category?: Category
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div
          className='
            text-xl
            font-semibold
            flex
            flex-row
            items-center
            gap-2
          '
        >
          <div>由{user?.name}出租的房屋</div>
          <Avatar src={user.image} />
        </div>
        <div
          className='
          flex
          flex-row
          font-light
          items-center
          text-neutral-600
          gap-4
        '
        >
          <div>可住{guestCount}人</div>
          <div>{roomCount}个房间</div>
          <div>{bathroomCount}个卫生间</div>
        </div>

        <hr />
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        <hr />
        <div className='text-lg font-light text-neutral-500'>
          {description}
        </div>
        <hr />
        <Map center={coordinates}/>
      </div>
    </div>
  )
}

export default ListingInfo
