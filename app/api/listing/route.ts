import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }
  const body = await request.json()
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body

  const listing = await prisma.listing.create({
    data: {
      category,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      title,
      price: parseInt(price, 10),
      description,
      userId: currentUser.id,
      locationValue: location.value,
    },
  })

  return NextResponse.json(listing)
}
