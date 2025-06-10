import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { memo } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AddressInfoModal = ({ open, setOpen, children }) => {
  return (
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)} 
      className="relative z-50"
      as="div"
      role="dialog"
      aria-modal="true">
        <DialogBackdrop 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel 
            className="relative w-full max-w-md mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all"
            role="document">
            <div className='px-6 py-6'>
                {children}
            </div>
            <div className='flex justify-end gap-4 absolute right-4 top-2'>
                <button 
                  onClick={() => setOpen(false)} 
                  type='button'
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Close modal">
                    <FaTimes className='text-slate-700' size={25} aria-hidden="true" />
                </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
  );
};

AddressInfoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(AddressInfoModal);