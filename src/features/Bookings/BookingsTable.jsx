import React from 'react'
import TableHeader from '../../ui/TableHeader'

function BookingsTable() {
 const bookingHeading=["Cabin","Guest","Dates","Status","Amount"," "]
  return (
    <div className=''>
        <TableHeader columns={'0.6fr 2fr 2fr 1fr 1fr 0.6fr'} data={bookingHeading}/>
    </div>
  )
}

export default BookingsTable
