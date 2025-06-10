import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState, memo, useCallback } from 'react';
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { cart, totalPrice } = useSelector((state) => state.carts);
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );
    const { paymentMethod } = useSelector((state) => state.payment);

    const handleBack = useCallback(() => {
        setActiveStep((prevStep) => prevStep - 1);
    }, []);

    const handleNext = useCallback(() => {
        if(activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select checkout address before proceeding.");
            return;
        }

        if(activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
            toast.error("Please select payment address before proceeding.");
            return;
        }
        
        setActiveStep((prevStep) => prevStep + 1);
    }, [activeStep, selectedUserCheckoutAddress, paymentMethod]);

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment",
    ];
    
    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    const isNextButtonDisabled = useCallback(() => {
        if (errorMessage) return true;
        if (activeStep === 0 && !selectedUserCheckoutAddress) return true;
        if (activeStep === 1 && !paymentMethod) return true;
        return false;
    }, [activeStep, errorMessage, selectedUserCheckoutAddress, paymentMethod]);

    const renderStepContent = useCallback(() => {
        switch(activeStep) {
            case 0:
                return <AddressInfo address={address} />;
            case 1:
                return <PaymentMethod />;
            case 2:
                return (
                    <OrderSummary 
                        totalPrice={totalPrice}
                        cart={cart}
                        address={selectedUserCheckoutAddress}
                        paymentMethod={paymentMethod}
                    />
                );
            case 3:
                return paymentMethod === "Stripe" ? <StripePayment /> : <PaypalPayment />;
            default:
                return null;
        }
    }, [activeStep, address, cart, paymentMethod, selectedUserCheckoutAddress, totalPrice]);

    return (
        <div className='py-14 min-h-[calc(100vh-100px)]'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {isLoading ? (
                <div className='lg:w-[80%] mx-auto py-5'>
                    <Skeleton />
                </div>
            ) : (
                <div className='mt-5'>
                    {renderStepContent()}
                </div>
            )}

            <div
                className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200'
                style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}>
                <Button
                    variant='outlined'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    aria-label="Go to previous step">
                    Back
                </Button>

                {activeStep !== steps.length - 1 && (
                    <button
                        disabled={isNextButtonDisabled()}
                        className={`bg-customBlue font-semibold px-6 h-10 rounded-md text-white
                            ${isNextButtonDisabled() ? "opacity-60" : ""}`}
                        onClick={handleNext}
                        aria-label="Proceed to next step">
                        Proceed
                    </button>
                )} 
            </div>
            
            {errorMessage && <ErrorPage message={errorMessage} />}
        </div>
    );
};

export default memo(Checkout);