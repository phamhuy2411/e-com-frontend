import { useState, memo, useMemo } from "react";
import { HiOutlineTrash } from "react-icons/hi";
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
        dispatch(removeFromCart(cartItem, toast));
    };
    
    return (
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-200 rounded-md lg:px-4 py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
                   <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
                    {truncateText(productName)}
                   </h3>
                </div>

                <div className="md:w-36 sm:w-24 w-12">
                    <img 
                        src={`${import.meta.env.VITE_BACK_END_URL}/images/${image}`}
                        alt={productName}
                        className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.png';
                        }}/>
                
                <div className="flex items-start gap-5 mt-3">
                    <button
                        onClick={removeItemFromCart}
                        className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                        aria-label={`Remove ${productName} from cart`}>
                        <HiOutlineTrash size={16} className="text-rose-600" aria-hidden="true"/>
                        Remove
                    </button>
                    </div>
                </div>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice(Number(specialPrice))}
            </div>

            <div className="justify-self-center">
                <SetQuantity 
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={handleQtyIncrease}
                    handleQtyDecrease={handleQtyDecrease}/>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice(totalPrice)}
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