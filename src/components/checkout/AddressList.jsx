import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCheckoutAddress } from '../../store/actions';
import PropTypes from 'prop-types';
import { memo } from 'react';

const AddressList = ({ 
    addresses = [], 
    setSelectedAddress, 
    setOpenAddressModal, 
    setOpenDeleteModal 
}) => {
    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    const onEditButtonHandler = (address) => {
        setSelectedAddress(address);
        setOpenAddressModal(true);
    };

    const onDeleteButtonHandler = (address) => {
        setSelectedAddress(address);
        setOpenDeleteModal(true);
    };

    const handleAddressSelection = (address) => {
        dispatch(selectUserCheckoutAddress(address));
    };

    if (!addresses?.length) {
        return null;
    }

    return (
        <div className='space-y-4' role="list">
            {addresses.map((address) => (
                <div
                    key={address.addressId}
                    onClick={() => handleAddressSelection(address)}
                    className={`p-4 border rounded-md cursor-pointer relative ${
                        selectedUserCheckoutAddress?.addressId === address.addressId
                        ? "bg-green-100"
                        : "bg-white"
                    }`}
                    role="listitem"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleAddressSelection(address);
                        }
                    }}>
                    <div className="flex items-start">
                        <div className="space-y-1">
                            <div className="flex items-center">
                                <FaBuilding size={14} className='mr-2 text-gray-600' aria-hidden="true" />
                                <p className='font-semibold'>{address.buildingName}</p>
                                {selectedUserCheckoutAddress?.addressId === address.addressId && (
                                    <FaCheckCircle className='text-green-500 ml-2' aria-hidden="true" />
                                )}
                            </div>

                            <div className="flex items-center">
                                <FaStreetView size={17} className='mr-2 text-gray-600' aria-hidden="true" />
                                <p>{address.street}</p>
                            </div>

                            <div className="flex items-center">
                                <MdLocationCity size={17} className='mr-2 text-gray-600' aria-hidden="true" />
                                <p>{address.city}, {address.state}</p>
                            </div>

                            <div className="flex items-center">
                                <MdPinDrop size={17} className='mr-2 text-gray-600' aria-hidden="true" />
                                <p>{address.pincode}</p>
                            </div>

                            <div className="flex items-center">
                                <MdPublic size={17} className='mr-2 text-gray-600' aria-hidden="true" />
                                <p>{address.country}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 absolute top-4 right-2">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditButtonHandler(address);
                            }}
                            aria-label={`Edit address ${address.buildingName}`}>
                            <FaEdit size={18} className="text-teal-700" aria-hidden="true" />
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteButtonHandler(address);
                            }}
                            aria-label={`Delete address ${address.buildingName}`}>
                            <FaTrash size={17} className="text-rose-600" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

AddressList.propTypes = {
    addresses: PropTypes.arrayOf(
        PropTypes.shape({
            addressId: PropTypes.string.isRequired,
            buildingName: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            pincode: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
        })
    ),
    setSelectedAddress: PropTypes.func.isRequired,
    setOpenAddressModal: PropTypes.func.isRequired,
    setOpenDeleteModal: PropTypes.func.isRequired,
};

export default memo(AddressList);