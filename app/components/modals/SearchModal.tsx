"use client"

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.LOCATION)

  const onBack = () => {
    if (step === STEPS.LOCATION) return
    setStep(s => s - 1)
  }

  const onNext = () => {
    if (step === STEPS.INFO) {
      // submit
      return
    } else {
      setStep(s => s + 1)
    }
  }

  let bodyContent = <div></div>
  if (step === STEPS.DATE) {
    bodyContent = <div></div>
  }
  if (step === STEPS.INFO) {
    bodyContent = <div></div>
  }
  return (
    <Modal
      title='Filters'
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onClose}
      actionLabel={"Search"}
      body={bodyContent}
    />
  )
}

export default SearchModal
