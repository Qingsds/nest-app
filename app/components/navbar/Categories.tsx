"use client"

import Container from "../Container"
import { TbBeach, TbPool } from "react-icons/tb"
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { TbMountain } from "react-icons/tb"
import { FaSkiing } from "react-icons/fa"
import { IoDiamond } from "react-icons/io5"
import { BsSnow } from "react-icons/bs"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import { IconType } from "react-icons"

export type Category = {
  label: string
  icon: IconType
  description: string
}

export const categories = [
  {
    label: "沙滩",
    icon: TbBeach,
    description: "this property is close to the beach!",
  },
  {
    label: "风车",
    icon: GiWindmill,
    description: "this property has windmills!",
  },
  {
    label: "现代风格",
    icon: MdOutlineVilla,
    description: "this property is modern!",
  },
  {
    label: "乡村",
    icon: TbMountain,
    description: "this property is in the countryside!",
  },
  {
    label: "泳池",
    icon: TbPool,
    description: "this property has a pool!",
  },
  {
    label: "海岛",
    icon: GiIsland,
    description: "this property is on an island!",
  },
  {
    label: "湖边",
    icon: GiBoatFishing,
    description: "this property is close to a lake!",
  },
  {
    label: "滑雪🏂🏻",
    icon: FaSkiing,
    description: "this property has skiing activity!",
  },
  {
    label: "城堡",
    icon: GiCastle,
    description: "this property is in a castle!",
  },
  {
    label: "咖啡馆",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "野营⛺️",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "北极",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "沙漠",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "汽车旅馆",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === "/"
  if (!isMainPage) {
    return null
  }
  return (
    <Container>
      <div
        className='
				pt-4
				flex 
				flex-row
				items-center
				justify-between
				overflow-x-auto
			'
      >
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={item.label === category}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
