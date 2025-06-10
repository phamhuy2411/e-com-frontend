import { useState, memo, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';

const ProductCard = memo(({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const productData = {
        id: productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
    };

    const handleProductView = useCallback((product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    }, [about]);

    const addToCartHandler = useCallback((cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    }, [dispatch]);

    const renderPrice = () => {
        if (specialPrice) {
            return (
                <div className="flex flex-col">
                    <span className="text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                    </span>
                    <span className="text-xl font-bold text-slate-700">
                        ${Number(specialPrice).toFixed(2)}
                    </span>
                </div>
            );
        }
        return (
            <span className="text-xl font-bold text-slate-700">
                ${Number(price).toFixed(2)}
            </span>
        );
    };

    return (
        <div 
            className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300"
            role="article"
            aria-label={`Product: ${productName}`}
        >
            <div 
                onClick={() => handleProductView(productData)} 
                className="w-full overflow-hidden aspect-[3/2]"
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleProductView(productData)}
            >
                <img 
                    className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                    src={image}
                    alt={productName}
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h2 
                    onClick={() => handleProductView(productData)}
                    className="text-lg font-semibold mb-2 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleProductView(productData)}
                >
                    {truncateText(productName, 50)}
                </h2>
                
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">
                        {truncateText(description, 80)}
                    </p>
                </div>

                {!about && (
                    <div className="flex items-center justify-between">
                        {renderPrice()}

                        <button
                            disabled={!isAvailable}
                            onClick={() => addToCartHandler({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            className={`bg-blue-500 ${
                                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
                            } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
                            aria-label={isAvailable ? "Add to cart" : "Out of stock"}
                        >
                            <FaShoppingCart className="mr-2" aria-hidden="true" />
                            {isAvailable ? "Add to Cart" : "Stock Out"}
                        </button>
                    </div>
                )}
            </div>
            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    );
});

ProductCard.propTypes = {
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    specialPrice: PropTypes.number,
    about: PropTypes.bool,
};

ProductCard.defaultProps = {
    quantity: 0,
    discount: 0,
    specialPrice: 0,
    about: false,
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;