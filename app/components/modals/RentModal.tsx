"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useMemo, useState } from "react"

import useRentModal from "@/app/hooks/useRentModal"
import CountrySelect from "../inputs/CountrySelect"
import CategoryInput from "../inputs/CategoryInput"
import ImageUpload from "../inputs/ImageUpload"
import Counter from "../inputs/Counter"
import dynamic from "next/dynamic"
import Heading from "../Heading"
import Modal from "./Modal"

import { categories } from "../navbar/Categories"
import Input from "../inputs/Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
  // 分类
  CATEGORY,
  // 位置
  LOCATION,
  // 信息
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const router = useRouter()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  })

  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")
  const imageSrc = watch("imageSrc")

  // 当 location 变化是 重新渲染 Map
  const Map = useMemo(() => {
    return dynamic(() => import("../Map"), {
      ssr: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep(val => val - 1)
  }

  const onNext = () => {
    setStep(val => val + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)

    axios
      .post("/api/listing", data)
      .then(() => {
        toast.success("Listing Created")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(error => {
        toast.error("something went wrong")
      })
      .finally(() => setIsLoading(false))
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create"
    }

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return "Back"
  }, [step])

  // 选择分类
  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place ?'
        subtitle='Pick a category'
      />
      <div
        className='
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        '
      >
        {categories.map(item => (
          <div
            key={item.label}
            className='col-span-1'
          >
            <CategoryInput
              onClick={category =>
                setCustomValue("category", category)
              }
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
  // 选择地址
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located ?'
          subtitle='help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={val => setCustomValue("location", val)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }
  // 房间数量
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title={"Share some basics about your place"}
          subtitle={"What amenities do you have?"}
        />
        <Counter
          title='Guests'
          subtitle='How many guests'
          value={guestCount}
          onChange={val => setCustomValue("guestCount", val)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={val => setCustomValue("roomCount", val)}
        />
        <hr />
        <Counter
          title='Bathroom'
          subtitle='How many bathroom do you have?'
          value={bathroomCount}
          onChange={val => setCustomValue("bathroomCount", val)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          value={imageSrc}
          onChange={val => setCustomValue("imageSrc", val)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe you place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          register={register}
          errors={errors}
          type='number'
          disabled={isLoading}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Airbnb your home!'
      actionLabel={actionLabel}
      disabled={isLoading}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  )
}

export default RentModal
