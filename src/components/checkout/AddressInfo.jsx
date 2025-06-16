import { useState, memo } from 'react'
import Skeleton from '../shared/Skeleton';
import { FaRegAddressCard  } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../store/actions';
import PropTypes from 'prop-types';

const AddressInfo = ({ address = [] }) => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const dispatch = useDispatch();
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    const addNewAddressHandler = () => {
        setSelectedAddress(null);
        setOpenAddressModal(true);
    };

    const deleteAddressHandler = () => {
        if (!selectedAddress?.addressId) return;
        dispatch(deleteUserAddress(
            toast,
            selectedAddress.addressId,
            setOpenDeleteModal
        ));
    };

    const noAddressExist = !address || address.length === 0;

    return (
        <div className="pt-4">
            {noAddressExist ? (
                <div className="p-8 rounded-2xl max-w-md mx-auto flex flex-col items-center justify-center bg-white shadow-2xl border border-gray-100">
                    <FaRegAddressCard  size={56} className="text-orange-400 mb-4" aria-hidden="true" />
                    <h1 className="mb-2 text-slate-800 text-center font-bold text-2xl">
                        No Address Added Yet
                    </h1>
                    <p className="mb-6 text-slate-600 text-center">
                        Please add your address to complete purchase
                    </p>

                    <button
                        onClick={addNewAddressHandler}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl shadow hover:from-orange-400 hover:to-orange-300 transition-all text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-label="Add new address">
                        Add Address
                    </button>
                </div>
            ) : (
                <div className="relative p-8 rounded-2xl max-w-md mx-auto bg-white shadow-2xl border border-gray-100">
                    <h1 className="text-slate-800 text-center font-bold text-2xl mb-2">
                        Select Address
                    </h1>
                    <div className="border-b border-gray-200 mb-4"></div>
                {isLoading ? (
                    <div className="py-4 px-8">
                        <Skeleton />
                    </div>
                ) : (
                    <>
                    <div className="space-y-4 pt-2">
                        <AddressList 
                            addresses={address}
                            setSelectedAddress={setSelectedAddress}
                            setOpenAddressModal={setOpenAddressModal}
                            setOpenDeleteModal={setOpenDeleteModal}
                            />
                    </div>

                    {address.length > 0 && (
                        <div className="mt-6 flex justify-center">
                            <button 
                                onClick={addNewAddressHandler}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-xl shadow hover:from-orange-400 hover:to-orange-300 transition-all text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                aria-label="Add another address">
                                    Add More
                            </button>
                        </div>
                    )}
                    </>
                )}
                </div>
            )}

            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}>
                    <AddAddressForm 
                        address={selectedAddress}
                        setOpenAddressModal={setOpenAddressModal}/>
            </AddressInfoModal>

            <DeleteModal 
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler={deleteAddressHandler}
            />
        </div>
    );
};

AddressInfo.propTypes = {
    address: PropTypes.arrayOf(
        PropTypes.shape({
            addressId: PropTypes.string,
            buildingName: PropTypes.string,
            city: PropTypes.string,
            street: PropTypes.string,
            state: PropTypes.string,
            pincode: PropTypes.string,
            country: PropTypes.string,
        })
    ),
};

export default memo(AddressInfo);