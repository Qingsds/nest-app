"use client"

import useCountries from "@/app/hooks/useCountries"
import Select from "react-select"

export type CountrySelectValue = {
  flag: string
  label: string
  latlng: number[]
  value: string
  region: string
}
interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (val: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useCountries()
  return (
    <div>
      <Select
        placeholder='anywhere you want'
        value={value}
        onChange={val => onChange(val as CountrySelectValue)}
        options={getAll()}
        isClearable
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className='flex flex-row gap-3 items-center'>
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className='text-neutral-500 ml-1'>
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  )
}

export default CountrySelect
