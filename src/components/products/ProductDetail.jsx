import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, memo } from "react";
import { 
    MdShoppingCart, 
    MdInventory2, 
    MdLocalOffer, 
    MdInfo,
    MdArrowBack,
    MdShare,
    MdFavorite,
    MdFavoriteBorder
} from "react-icons/md";
import { Tooltip, Divider, Badge } from "@mui/material";
import { toast } from "react-hot-toast";
import Status from "../shared/Status";
import { formatPrice } from "../../utils/formatPrice";
import { addToCart } from "../../store/actions";

const ProductDetail = memo(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Lấy danh sách sản phẩm từ store
    const products = useSelector((state) => state.products.products);

    // Tìm sản phẩm theo id (chú ý kiểu dữ liệu)
    const product = products && products.find(
        (item) => String(item.id || item.productId) === String(id)
    );

    useEffect(() => {
        if (product?.image) {
            setSelectedImage(product.image);
        }
    }, [product]);

    if (!products) {
        return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                        Product Not Found
                    </h2>
                    <p className="text-slate-600 mb-4">
                        The product you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <MdArrowBack className="mr-2" />
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            image: product.image,
            productName: product.productName,
            description: product.description,
            specialPrice: product.specialPrice,
            price: product.price,
            productId: product.id || product.productId,
            quantity: product.quantity,
        }, quantity, toast));
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(
            isFavorite ? "Removed from favorites" : "Added to favorites"
        );
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product?.productName,
                text: product?.description,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const calculateDiscount = () => {
        if (product?.specialPrice && product?.price) {
            return Math.round(((product.price - product.specialPrice) / product.price) * 100);
        }
        return 0;
    };

    const discount = calculateDiscount();
    const isAvailable = product?.quantity > 0;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb and Actions */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate("/products")}
                        className="inline-flex items-center text-slate-600 hover:text-slate-900"
                    >
                        <MdArrowBack className="mr-2" />
                        Back to Products
                    </button>
                    <div className="flex items-center gap-4">
                        <Tooltip title="Share product">
                            <button
                                onClick={handleShare}
                                className="p-2 text-slate-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                            >
                                <MdShare size={20} />
                            </button>
                        </Tooltip>
                        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                            <button
                                onClick={toggleFavorite}
                                className="p-2 text-slate-600 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                            >
                                {isFavorite ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
                            </button>
                        </Tooltip>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Image Section */}
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                <img
                                    src={selectedImage || product?.image}
                                    alt={product?.productName}
                                    className="w-full h-full object-contain"
                                />
                                {discount > 0 && (
                                    <div className="absolute top-4 left-4">
                                        <Badge
                                            badgeContent={`${discount}% OFF`}
                                            color="primary"
                                            className="bg-blue-500"
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Thumbnail Gallery */}
                            {product?.images?.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(image)}
                                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                                                selectedImage === image
                                                    ? "border-blue-500"
                                                    : "border-transparent hover:border-slate-200"
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.productName} - ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info Section */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                    {product?.productName}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <Status
                                        text={isAvailable ? "In Stock" : "Out of Stock"}
                                        icon={isAvailable ? MdInventory2 : MdInfo}
                                        bg={isAvailable ? "bg-green-100" : "bg-rose-100"}
                                        color={isAvailable ? "text-green-800" : "text-rose-800"}
                                    />
                                    {isAvailable && (
                                        <span className="text-sm text-slate-600">
                                            {product.quantity} units available
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-baseline gap-4">
                                    {product?.specialPrice ? (
                                        <>
                                            <span className="text-3xl font-bold text-slate-900">
                                                {formatPrice(product.specialPrice)}
                                            </span>
                                            <span className="text-xl text-slate-400 line-through">
                                                {formatPrice(product.price)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-slate-900">
                                            {formatPrice(product?.price)}
                                        </span>
                                    )}
                                </div>

                                {discount > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MdLocalOffer className="text-rose-500" size={20} />
                                        <span>
                                            Save {formatPrice(product.price - product.specialPrice)} ({discount}% off)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <Divider />

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Description
                                </h2>
                                <p className="text-slate-600 whitespace-pre-line">
                                    {product?.description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-slate-200 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 text-slate-900">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product?.quantity || 0, quantity + 1))}
                                            className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                                            disabled={quantity >= (product?.quantity || 0)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!isAvailable}
                                        className={`flex-1 px-6 py-3 text-white font-medium rounded-lg transition-colors ${
                                            isAvailable
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-gray-300 cursor-not-allowed"
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <MdShoppingCart size={20} />
                                            {isAvailable ? "Add to Cart" : "Out of Stock"}
                                        </div>
                                    </button>
                                </div>

                                <Tooltip title="Prices include all applicable taxes and duties">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <MdInfo size={16} />
                                        <span>Price includes taxes</span>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProductDetail.displayName = "ProductDetail";

export default ProductDetail; 