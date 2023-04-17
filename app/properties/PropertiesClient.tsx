"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"

import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import { SafeListing, SafeUser } from "../types"

interface PropertiesClientProps {
  currentUser: SafeUser
  listings: SafeListing[]
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("操作成功！")
          router.refresh()
        })
        .catch(error => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(""))
    },
    [router]
  )
  return (
    <Container>
      <Heading
        title='Properties'
        subtitle='Your properties!'
      />
      <div
        className='
          gap-8
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
      '
      >
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            currentUser={currentUser}
            onAction={onCancel}
            disabled={listing.id === deletingId}
            actionLabel='Delete property'
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
