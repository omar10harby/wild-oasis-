import React from 'react'

function ConfirmPaymentBox({isPaid,onPaid}) {
  return (
    <div>
        <input id='paid' type="checkbox" disabled={isPaid} onChange={()=>onPaid(true)}   />
        <label htmlFor="paid">I confirm that Emma Watson has paid the total amount of $5,325.00</label>
    </div>
  )
}

export default ConfirmPaymentBox
