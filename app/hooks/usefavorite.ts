import { useRouter } from "next/navigation"
import { SafeUser } from "../types"
import { useCallback, useMemo } from "react"
import useLoginModal from "./useLoginModal"
import { toast } from "react-hot-toast"
import axios from "axios"

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const hasFavorited = useMemo(() => {
    // console.log(currentUser?.favoriteIds)
    const list = currentUser?.favoriteIds || []
    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()
        toast.success("success!")
      } catch (error) {
        toast.error("Something went error")
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
