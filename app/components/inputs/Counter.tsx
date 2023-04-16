"use client"

import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

interface CounterProps {
  title: string
  subtitle: string
  value: number
  onChange: (val: number) => void
}

const Counter: React.FC<CounterProps> = ({
  value,
  title,
  subtitle,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [value, onChange])

  const onReduce = useCallback(() => {
    if (value === 1) return
    onChange(value - 1)
  }, [value, onChange])

  return (
    <div className='flex flex-row items-center justify-between'>
      {/* title */}
      <div className='flex flex-col'>
        <div className='font-medium'>{title}</div>
        <div className='font-light text-gray-600'>{subtitle}</div>
      </div>
      {/* counter */}
      <div className='flex flex-row items-center gap-4'>
        <div
          onClick={onReduce}
          className='
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            cursor-pointer
            hover:opacity-75
            transition
        '
        >
          <AiOutlineMinus />
        </div>
        <div className='font-light text-xl text-neutral-600 select-none'>
          {value}
        </div>
        <div
          onClick={onAdd}
          className='
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            cursor-pointer
            hover:opacity-75
            transition
        '
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  )
}



export default Counter
