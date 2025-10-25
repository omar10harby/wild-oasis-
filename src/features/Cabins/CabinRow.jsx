import React from 'react'

function CabinRow({cabin}) {
  return (
    <div className='grid items-center grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-4 border-b border-gray-200 pr-5'>
            <div><img src={cabin.image} alt="" className=''/></div>
            <div>{cabin.name}</div>
            <div>{cabin.maxCapacity}</div>
            <div>{cabin.regularPrice}</div>
            <div>{cabin.discount}</div>
            <div className='text-end'>...</div>
    </div>
  )
}

export default CabinRow
