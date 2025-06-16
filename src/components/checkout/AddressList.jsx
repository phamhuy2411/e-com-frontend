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
        <div className="space-y-4" role="list">
            {addresses.map((address) => (
                <div
                    key={address.addressId}
                    onClick={() => handleAddressSelection(address)}
                    className={`p-5 border-2 rounded-2xl cursor-pointer relative shadow transition-all duration-200 group bg-white hover:border-orange-400 focus-within:border-orange-500 outline-none ${
                        selectedUserCheckoutAddress?.addressId === address.addressId
                        ? "border-orange-500 ring-2 ring-orange-200 bg-orange-50"
                        : "border-gray-200"
                    }`}
                    role="listitem"
                    tabIndex={0}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleAddressSelection(address);
                        }
                    }}>
                    <div className="flex items-start">
                        <div className="space-y-1 w-full">
                            <div className="flex items-center mb-1">
                                <FaBuilding size={16} className='mr-2 text-orange-400' aria-hidden="true" />
                                <p className='font-semibold text-slate-800 text-base'>{address.buildingName}</p>
                                {selectedUserCheckoutAddress?.addressId === address.addressId && (
                                    <FaCheckCircle className='text-orange-500 ml-2 animate-bounce' aria-hidden="true" />
                                )}
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <FaStreetView size={16} className='mr-2 text-slate-400' aria-hidden="true" />
                                <p>{address.street}</p>
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <MdLocationCity size={16} className='mr-2 text-slate-400' aria-hidden="true" />
                                <p>{address.city}, {address.state}</p>
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <MdPinDrop size={16} className='mr-2 text-slate-400' aria-hidden="true" />
                                <p>{address.pincode}</p>
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <MdPublic size={16} className='mr-2 text-slate-400' aria-hidden="true" />
                                <p>{address.country}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 absolute top-4 right-3">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditButtonHandler(address);
                            }}
                            aria-label={`Edit address ${address.buildingName}`}
                            className="p-2 rounded-full bg-orange-50 hover:bg-orange-100 focus:bg-orange-200 shadow text-orange-500 transition-all duration-200">
                            <FaEdit size={18} aria-hidden="true" />
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteButtonHandler(address);
                            }}
                            aria-label={`Delete address ${address.buildingName}`}
                            className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 focus:bg-rose-200 shadow text-rose-500 transition-all duration-200">
                            <FaTrash size={17} aria-hidden="true" />
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