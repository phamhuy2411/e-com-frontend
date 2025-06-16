import { useEffect, memo } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';
import PropTypes from 'prop-types';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const {
            register,
            handleSubmit,
            setValue,
            formState: {errors},
        } = useForm({
            mode: "onTouched",
        });

        const onSaveAddressHandler = async (data) => {
            dispatch(addUpdateUserAddress(
                data,
                toast,
                address?.addressId,
                setOpenAddressModal
            ));
        };

        useEffect(() => {
            if (address?.addressId) {
                setValue("buildingName", address?.buildingName);
                setValue("city", address?.city);
                setValue("street", address?.street);
                setValue("state", address?.state);
                setValue("pincode", address?.pincode);
                setValue("country", address?.country);
            }
        }, [address, setValue]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="space-y-4">
                    <div className="flex justify-center items-center mb-4 font-bold text-2xl text-slate-800 py-2 px-4">
                        <FaAddressCard className="mr-2 text-2xl text-orange-400" aria-hidden="true"/>
                        <h1>
                            {!address?.addressId ? 
                            "Add Address" :
                            "Update Address"
                            }
                        </h1>
                    </div>
            <div className="flex flex-col gap-4">
                <InputField
                    label="Building Name"
                    required
                    id="buildingName"
                    type="text"
                    message="*Building Name is required"
                    placeholder="Enter Building Name"
                    register={register}
                    errors={errors}
                    className="focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />

                <InputField
                    label="City"
                    required
                    id="city"
                    type="text"
                    message="*City is required"
                    placeholder="Enter City"
                    register={register}
                    errors={errors}
                    className="focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />

                <InputField
                    label="State"
                    required
                    id="state"
                    type="text"
                    message="*State is required"
                    placeholder="Enter State"
                    register={register}
                    errors={errors}
                    className="focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />

                <InputField
                    label="Pincode"
                    required
                    id="pincode"
                    type="text"
                    pattern="[0-9]{6}"
                    message="*Pincode must be 6 digits"
                    placeholder="Enter Pincode"
                    register={register}
                    errors={errors}
                    className="focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />    
                <InputField
                    label="Street"
                    required
                    id="street"
                    type="text"
                    message="*Street is required"
                    placeholder="Enter Street"
                    register={register}
                    errors={errors}
                    className="focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />   

                <InputField
                    label="Country"
                    required
                    id="country"
                    type="text"
                    message="*Country is required"
                    placeholder="Enter Country"
                    register={register}
                    errors={errors}
                    className="focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />        
            </div>

            <button
                disabled={btnLoader}
                className="w-full text-white bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 rounded-xl mt-4 hover:from-orange-400 hover:to-orange-300 transition-colors duration-200 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-base"
                type="submit"
                aria-label={btnLoader ? "Saving address..." : "Save address"}>
                {btnLoader ? (
                    <>
                    <Spinners /> Loading...
                    </>
                ) : (
                    <>Save</>
                )}
            </button>
            </form>
        </div>
  )
}

AddAddressForm.propTypes = {
    address: PropTypes.shape({
        addressId: PropTypes.string,
        buildingName: PropTypes.string,
        city: PropTypes.string,
        street: PropTypes.string,
        state: PropTypes.string,
        pincode: PropTypes.string,
        country: PropTypes.string,
    }),
    setOpenAddressModal: PropTypes.func.isRequired,
};

AddAddressForm.defaultProps = {
    address: null,
};

export default memo(AddAddressForm);