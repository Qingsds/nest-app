"use client"
import { Range } from "react-date-range"
import Calendar from "../inputs/Calendar"
import Button from "../Button"

interface ListingReservationProps {
  price: number
  totalPrice: number
  disabled: boolean
  dateRange: Range
  onChangeDate: (val: Range) => void
  onSubmit: () => void
  disableDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disableDates,
  disabled,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div
      className='
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
    '
    >
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='font-light text-neutral-400'>night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        onChange={value => onChangeDate(value.selection)}
        disableDates={disableDates}
      />
      <hr />
      <div className='p-4'>
        <Button
          label='保存'
          onClick={onSubmit}
          disable={disabled}
        />
      </div>
      <div
        className='
          flex
          flex-row
          items-center
          justify-between
          p-4
          font-semibold
          text-lg
        '
      >
        <div>合计</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}

export default ListingReservation
