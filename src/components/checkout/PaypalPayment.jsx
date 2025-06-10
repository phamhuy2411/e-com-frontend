import { Alert, AlertTitle } from '@mui/material'
import { memo } from 'react'

const PaypalPayment = memo(() => {
  return (
    <div className='h-96 flex justify-center items-center'>
        <Alert 
            severity="warning" 
            variant='filled' 
            style={{ maxWidth: "400px" }}
            role="alert"
        >
            <AlertTitle>Paypal Unavailable</AlertTitle>
            Paypal payment is unavailable. Please use another payment method.
        </Alert>
    </div>
  )
})

PaypalPayment.displayName = 'PaypalPayment'

export default PaypalPayment