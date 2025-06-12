import { useState, memo, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import { MdInfo } from "react-icons/md";

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
        if (!price || Number(price) === 0) {
            return (
                <button
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    onClick={() => window.location.href = '/contact'}
                >
                    <MdInfo className="text-lg" />
                    Contact for price
                </button>
            );
        }

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

    const renderActionButton = () => {
        if (!price || Number(price) === 0) {
            return (
                <button
                    onClick={() => window.location.href = '/contact'}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center"
                    aria-label="Contact for price"
                >
                    <MdInfo className="mr-2" aria-hidden="true" />
                    Contact Us
                </button>
            );
        }

        return (
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
        );
    };

    return (
        <div 
            className="border rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl bg-white h-full flex flex-col"
            role="article"
            aria-label={`Product: ${productName}`}
        >
            <Link 
                to={`/products/${productId}`}
                className="block w-full overflow-hidden aspect-[3/2] bg-gray-50"
                onClick={(e) => {
                    if (!about) {
                        e.preventDefault();
                        handleProductView(productData);
                    }
                }}
            >
                <img 
                    className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105 object-contain"
                    src={image}
                    alt={productName}
                    loading="lazy"
                />
            </Link>
            <div className="p-5 flex flex-col flex-1">
                <Link 
                    to={`/products/${productId}`}
                    onClick={(e) => {
                        if (!about) {
                            e.preventDefault();
                            handleProductView(productData);
                        }
                    }}
                    className="block"
                >
                    <h2 className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600 transition-colors">
                        {truncateText(productName, 50)}
                    </h2>
                </Link>
                <div className="min-h-[56px] max-h-20 mb-3">
                    <p className="text-gray-600 text-sm">
                        {truncateText(description, 80)}
                    </p>
                </div>
                {!about && (
                    <div className="flex items-center justify-between mt-auto">
                        {renderPrice()}
                        {renderActionButton()}
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