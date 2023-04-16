"use client"
import { signIn } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { AiFillGithub } from "react-icons/ai"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-hot-toast"
import Input from "../inputs/Input"
import Heading from "../Heading"
import { useCallback, useState } from "react"
import Button from "../Button"
import Modal from "./Modal"

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then(callback => {
        setIsLoading(false)
        if (callback?.ok) {
          toast.success("logged in! 😁")
          router.refresh()
          loginModal.onClose()
        }

        if (callback?.error) {
          toast.error(callback.error)
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='欢迎您回来!'
        subtitle='请登录你的账号!'
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
        onClick={() => signIn("github")}
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
        <div>first time using Airbnb? 🥹 </div>
        <div
          onClick={toggle}
          className='
            text-neutral-700 
            cursor-pointer 
            hover:underline 
            transition
          '
        >
          Create an account
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Login'
      actionLabel='Continue'
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
