"use client"
import { DateRange, Range, RangeKeyDict } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface CalenderProps {
  value: Range
  disableDates: Date[]
  onChange: (value: RangeKeyDict) => void
}

const Calendar: React.FC<CalenderProps> = ({
  onChange,
  value,
  disableDates,
}) => {
  return (
    <DateRange
      ranges={[value]}
      rangeColors={["#262626"]}
      date={new Date()}
      showDateDisplay={false}
      direction='vertical'
      minDate={new Date()}
      onChange={onChange}
      disabledDates={disableDates}
    />
  )
}

export default Calendar
