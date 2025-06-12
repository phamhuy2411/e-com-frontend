import { useState, memo, useMemo } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { FiInfo, FiExternalLink } from "react-icons/fi";
import { Tooltip, Badge } from "@mui/material";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import truncateText from "../../utils/truncateText";
import PropTypes from 'prop-types';

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    specialPrice,
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const [isHovered, setIsHovered] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const dispatch = useDispatch();

    const cartItem = useMemo(() => ({
        image,
        productName,
        description,
        specialPrice,
        price,
        productId,
        quantity,
    }), [image, productName, description, specialPrice, price, productId, quantity]);

    const totalPrice = useMemo(() => 
        Number(currentQuantity) * Number(specialPrice),
        [currentQuantity, specialPrice]
    );

    const discount = useMemo(() => {
        if (specialPrice && price) {
            return Math.round(((price - specialPrice) / price) * 100);
        }
        return 0;
    }, [price, specialPrice]);

    const handleQtyIncrease = () => {
        dispatch(increaseCartQuantity(
            cartItem,
            toast,
            currentQuantity,
            setCurrentQuantity
        ));
    };

    const handleQtyDecrease = () => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItem, newQuantity));
        }
    };

    const removeItemFromCart = () => {
        setIsRemoving(true);
        setTimeout(() => {
            dispatch(removeFromCart(cartItem, toast));
            setIsRemoving(false);
        }, 300);
    };

    const handleViewProduct = () => {
        window.location.href = `/products/${productId}`;
    };
    
    return (
        <div 
            className={`relative bg-white rounded-xl transition-all duration-300 ${
                isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            } hover:shadow-lg`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-10">
                    <Badge
                        badgeContent={`${discount}% OFF`}
                        color="primary"
                        className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
                    />
                </div>
            )}

            <div className="grid md:grid-cols-12 gap-4 p-4 items-center">
                {/* Product Image and Info Section */}
                <div className="md:col-span-7 flex gap-4 items-center">
                    {/* Image Container */}
                    <div className="relative w-24 h-24 flex-shrink-0 group">
                        <div className="w-full h-full overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                            <img 
                                src={image}
                                alt={productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder-image.png';
                                }}
                            />
                        </div>
                        {isHovered && (
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                                <Tooltip 
                                    title="View product details"
                                    placement="top"
                                    arrow
                                >
                                    <button 
                                        onClick={handleViewProduct}
                                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                                    >
                                        <FiExternalLink size={14} />
                                        View
                                    </button>
                                </Tooltip>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                        <div>
                            <Tooltip 
                                title={productName}
                                placement="top"
                                arrow
                            >
                                <h3 
                                    onClick={handleViewProduct}
                                    className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 cursor-pointer truncate"
                                >
                                    {productName}
                                </h3>
                            </Tooltip>
                            
                            {description && (
                                <Tooltip 
                                    title={description}
                                    placement="bottom"
                                    arrow
                                >
                                    <p className="text-sm text-slate-500 mt-1 line-clamp-2 flex items-start gap-1">
                                        <FiInfo className="mt-1 flex-shrink-0" size={14} />
                                        {truncateText(description, 100)}
                                    </p>
                                </Tooltip>
                            )}
                        </div>

                        <button
                            onClick={removeItemFromCart}
                            className="self-start mt-2 flex items-center font-medium space-x-1.5 px-3 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition-all duration-200 hover:scale-105"
                            aria-label={`Remove ${productName} from cart`}
                        >
                            <HiOutlineTrash size={14} className="text-rose-600" aria-hidden="true"/>
                            <span>Remove</span>
                        </button>
                    </div>
                </div>

                {/* Price */}
                <div className="md:col-span-2 flex flex-col items-center">
                    <div className="flex flex-col items-end">
                        {specialPrice < price && (
                            <span className="text-gray-400 line-through text-sm">
                                {formatPrice(Number(price))}
                            </span>
                        )}
                        <span className="text-lg font-semibold text-blue-600">
                            {formatPrice(Number(specialPrice))}
                        </span>
                    </div>
                    {currentQuantity > 1 && (
                        <span className="text-xs text-slate-500 mt-1">
                            {currentQuantity} × {formatPrice(Number(specialPrice))}
                        </span>
                    )}
                </div>

                {/* Quantity */}
                <div className="md:col-span-2 flex items-center justify-center">
                    <SetQuantity 
                        quantity={currentQuantity}
                        cardCounter={true}
                        handleQtyIncrease={handleQtyIncrease}
                        handleQtyDecrease={handleQtyDecrease}
                    />
                </div>

                {/* Total */}
                <div className="md:col-span-1 flex flex-col items-center">
                    <span className="text-sm text-slate-500">Total</span>
                    <div className="text-lg font-bold text-slate-800">
                        {formatPrice(totalPrice)}
                    </div>
                </div>
            </div>
        </div>
    );
};

ItemContent.propTypes = {
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    specialPrice: PropTypes.number.isRequired,
};

export default memo(ItemContent);