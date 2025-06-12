import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment, memo, useRef, useEffect, useState } from "react";
import { Divider, Skeleton, Tooltip } from "@mui/material";
import Status from "./Status";
import {
  MdClose,
  MdDone,
  MdShoppingCart,
  MdInventory2,
  MdLocalOffer,
  MdInfo,
  MdCheckCircle,
} from "react-icons/md";
import PropTypes from "prop-types";
import toast from "react-hot-toast";


const ProductViewModal = memo(({ open, setOpen, product, isAvailable }) => {
  const {
    productName,
    image,
    description,
    price,
    specialPrice,
    quantity,
    discount,
  } = product;
  const closeButtonRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Focus nút Close khi mở modal
  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    // Reset states when modal opens
    if (open) {
      setIsLoading(true);
      setImageLoaded(false);
    }
  }, [open]);

  // Simulate loading state
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const calculateDiscount = () => {
    if (specialPrice && price) {
      const discountAmount = ((price - specialPrice) / price) * 100;
      return Math.round(discountAmount);
    }
    return discount || 0;
  };

  const discountPercentage = calculateDiscount();

  const handleAddToCart = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <MdCheckCircle className="h-10 w-10 text-orange-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Added to cart!
                </p>
                <p className="mt-1 text-sm text-gray-500">{productName}</p>
                <div className="mt-2 flex items-center text-sm text-slate-600">
                  <MdShoppingCart className="mr-1.5 h-4 w-4" />
                  <span>
                    {specialPrice
                      ? `Giá: ${formatPrice(specialPrice)}`
                      : `Giá: ${formatPrice(price)}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      {
        duration: 4000,
        position: "top-right",
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        },
      }
    );
  };

  const renderPrice = () => {
    if (!price || Number(price) === 0) {
      return (
        <div className="flex items-center gap-2">
          <MdInfo className="text-orange-500" size={24} />
          <span className="text-lg font-medium text-orange-600">Contact for price</span>
        </div>
      );
    }

    if (specialPrice) {
      return (
        <div className="flex items-center gap-3">
          <span className="text-gray-400 line-through text-lg">
            {formatPrice(price)}
          </span>
          <span className="text-2xl font-bold text-slate-700">
            {formatPrice(specialPrice)}
          </span>
        </div>
      );
    }

    return (
      <span className="text-2xl font-bold text-slate-700">
        {formatPrice(price)}
      </span>
    );
  };

  const renderActionButton = () => {
    if (!price || Number(price) === 0) {
      return (
        <button
          onClick={() => {
            setOpen(false);
            window.location.href = '/contact';
          }}
          className="flex-1 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          <MdInfo size={20} />
          Contact Us
        </button>
      );
    }

    return (
      <button
        onClick={handleAddToCart}
        disabled={!isAvailable || isLoading}
        className={`flex-1 px-6 py-3 text-sm font-medium text-white ${
          isAvailable
            ? "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300"
            : "bg-gray-300 cursor-not-allowed"
        } rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2`}
      >
        <MdShoppingCart size={20} />
        {isAvailable ? "Add to cart" : "Sold out"}
      </button>
    );
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setOpen(false)}
        initialFocus={closeButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all md:max-w-[680px] w-full text-left">
                {/* Discount badge */}
                {discountPercentage > 0 && !isLoading && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg animate-bounce">
                      <MdLocalOffer size={16} />
                      {discountPercentage}% OFF
                    </div>
                  </div>
                )}

                {/* Image section */}
                <div className="relative flex justify-center items-center h-[400px] bg-gray-50 overflow-hidden group">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Skeleton
                        variant="rectangular"
                        className="w-full h-full"
                        animation="wave"
                      />
                    </div>
                  )}
                  {image && (
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                      <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={productName}
                          className={`w-full h-full object-contain transition-all duration-500 ease-in-out transform group-hover:scale-110 ${
                            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                          }`}
                          loading="lazy"
                          onLoad={handleImageLoad}
                          style={{
                            objectFit: "contain",
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                        />
                        {!imageLoaded && !isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 pt-6 pb-4">
                  {/* Product Title */}
                  {isLoading ? (
                    <Skeleton variant="text" className="h-10 w-3/4 mb-4" />
                  ) : (
                    <DialogTitle
                      as="h2"
                      id="product-title"
                      className="text-2xl sm:text-3xl font-bold text-slate-700 mb-4"
                    >
                      {productName}
                    </DialogTitle>
                  )}

                  <div className="space-y-4 text-slate-700">
                    {/* Price and Status Section */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {isLoading ? (
                        <Skeleton variant="text" className="h-8 w-32" />
                      ) : (
                        renderPrice()
                      )}

                      {!isLoading && price && Number(price) > 0 && (
                        <Status
                          text={isAvailable ? "In Stock" : "Out of Stock"}
                          icon={isAvailable ? MdDone : MdClose}
                          bg={isAvailable ? "bg-orange-100" : "bg-rose-100"}
                          color={isAvailable ? "text-orange-800" : "text-rose-800"}
                        />
                      )}
                    </div>

                    {/* Product Details Section */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      {/* Stock Information */}
                      {price && Number(price) > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <MdInventory2 className="text-slate-500" size={20} />
                          <span className="text-slate-600">
                            {isAvailable
                              ? `${quantity} units available in stock`
                              : "Currently out of stock"}
                          </span>
                        </div>
                      )}

                      {/* Discount Information */}
                      {discountPercentage > 0 && price && Number(price) > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <MdLocalOffer className="text-orange-500" size={20} />
                          <span className="text-slate-600">
                            Save {formatPrice(price - specialPrice)} ({discountPercentage}% off)
                          </span>
                        </div>
                      )}

                      {/* Additional Info Tooltip */}
                      {price && Number(price) > 0 && (
                        <Tooltip
                          title="Prices include all applicable taxes and duties"
                          placement="top"
                          arrow
                        >
                          <div className="flex items-center gap-2 text-sm text-slate-500 cursor-help">
                            <MdInfo size={20} />
                            <span>Price includes taxes</span>
                          </div>
                        </Tooltip>
                      )}
                    </div>

                    <Divider className="my-4" />

                    {/* Description Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        Product Description
                      </h3>
                      {isLoading ? (
                        <div className="space-y-2">
                          <Skeleton variant="text" className="h-4 w-full" />
                          <Skeleton variant="text" className="h-4 w-5/6" />
                          <Skeleton variant="text" className="h-4 w-4/6" />
                        </div>
                      ) : (
                        <p className="leading-relaxed text-base text-slate-600 whitespace-pre-line">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between gap-4 flex-wrap">
                    {renderActionButton()}

                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="px-6 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

ProductViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    productName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    specialPrice: PropTypes.number,
  }).isRequired,
};

ProductViewModal.defaultProps = {
  product: {
    quantity: 0,
    discount: 0,
    specialPrice: 0,
  },
};

ProductViewModal.displayName = "ProductViewModal";

export default ProductViewModal;
