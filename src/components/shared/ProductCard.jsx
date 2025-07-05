import { useState, memo, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addProductToCartAction } from "../../store/actions";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import { MdInfo } from "react-icons/md";

const ProductCard = memo(({
    productId,
    productName,
    image,
    description,
    quantity = 0,
    price,
    discount = 0,
    specialPrice = 0,
    about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

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

    const addToCartHandler = useCallback(() => {
        if (user) {
            dispatch(addProductToCartAction(
                productId,
                1,
                toast
            ));
        } else {
            dispatch(addToCart({
                image,
                productName,
                description,
                specialPrice,
                price,
                productId,
                quantity,
            }, 1, toast));
        }
    }, [dispatch, productId, user, image, productName, description, specialPrice, price, quantity]);

    // Helper to get image URL from backend
    const getImageUrl = (img) => {
        if (!img) return '/placeholder-image.png';
        if (img.startsWith('http://') || img.startsWith('https://')) return img;
        if (img.startsWith('/images/')) return `http://localhost:8080${img}`;
        return `http://localhost:8080/images/${img}`;
    };

    const renderPrice = () => {
        if (!price || Number(price) === 0) {
            return (
                <button
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1 mb-2"
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
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white py-1.5 px-3 rounded-lg items-center transition-colors duration-300 w-28 flex justify-center h-[42px]"
                    aria-label="Contact for price"
                >
                    Contact Us
                </button>
            );
        }

        return (
            <button
                disabled={!isAvailable}
                onClick={addToCartHandler}
                className={`bg-gradient-to-r from-orange-500 to-orange-400 ${
                    isAvailable ? "opacity-100 hover:from-orange-400 hover:to-orange-300" : "opacity-70"
                } text-white py-1.5 px-2 rounded-lg items-center transition-colors duration-300 w-28 flex justify-center h-[42px] text-sm`}
                aria-label={isAvailable ? "Add to cart" : "Out of stock"}
            >
                <FaShoppingCart className="mr-1 text-sm" aria-hidden="true" />
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
                    src={getImageUrl(image)}
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
                    <h2 className="text-lg font-semibold mb-2 cursor-pointer hover:text-orange-600 transition-colors">
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

ProductCard.displayName = 'ProductCard';

export default ProductCard;