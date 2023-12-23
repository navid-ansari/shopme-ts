import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { dateToDDMMYY } from '../../../utils/utils'

interface IDatepicker {
  initialDate?: any
  selectedDob: (date: any) => any
}

const Datepicker = ({ initialDate = null, selectedDob }: IDatepicker) => {
  //const [startDate, setStartDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  //const handleCalendarClose = (e: any) => console.log('Calendar closed')
  //const handleCalendarOpen = (e: any) => console.log('Calendar opened')
  /*const handleDateSelect = (e: any) => {
    setSelectedDate(e)
    selectedDob(e)
  }*/
  //const handleClickOutside = (e: any) => console.log(e)

  const onDateChange = (e: any) => {
    setSelectedDate(e)
    const formattedDate = dateToDDMMYY(e)
    selectedDob(formattedDate)
  }

  const onDateSelect = (e: any) => {
    setSelectedDate(e)
    const formattedDate = dateToDDMMYY(e)
    selectedDob(formattedDate)
  }

  return (
    <DatePicker
      selected={initialDate || selectedDate}
      onChange={onDateChange}
      onSelect={onDateSelect}
      //onClickOutside={handleClickOutside}
      isClearable={true}
      showIcon={true}
      title={'Select Date of Birth'}
      showMonthDropdown={true}
      showYearDropdown={true}
      yearDropdownItemNumber={73}
      shouldCloseOnSelect={true}
      scrollableYearDropdown={true}
      dateFormat={'dd/MM/yyyy'}
    />
  )
}

export default Datepicker
