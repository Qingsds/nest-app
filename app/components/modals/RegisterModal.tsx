"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import { useCallback, useState } from "react"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const toggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose()
      })
      .catch(error => {
        toast.error("something went wrong!")
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='欢迎您来到 Airbnb'
        subtitle='创建一个账号!'
      />
      <Input
        id='email'
        label='邮箱'
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='姓名'
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='密码'
        type='password'
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='使用 Google 账号登录'
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label='使用 Github 账号登录'
        icon={AiFillGithub}
        onClick={() => signIn("google")}
      />
      <div
        className='
          flex
          items-center
          justify-center
          flex-row
          gap-2
        '
      >
        <div>已经有账号了？ </div>
        <div
          onClick={toggle}
          className='
            text-neutral-700 
            cursor-pointer 
            hover:underline 
            transition
          '
        >
          登录
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Register'
      actionLabel='Continue'
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
