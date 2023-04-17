import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

interface IParams {
  listingId: string
}

export async function GET(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }
}

/**
 * favorites post
 * @param request
 * @param param1
 * @returns
 */
export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID")
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds.push(listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(user)
}

/**
 * favorite delete
 * @param request
 * @param param1
 * @returns
 */
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID")
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds = favoriteIds.filter(f => f !== listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(user)
}
