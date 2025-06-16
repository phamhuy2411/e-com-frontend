import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import Advertisement from "./Advertisement";
import { adData } from "../../utils/adData";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import { memo } from "react";

const Home = memo(() => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const renderProducts = () => {
        if (!products?.length) {
            return (
                <div className="flex justify-center items-center h-[200px] bg-white rounded-2xl shadow-lg border border-slate-200">
                    <FaExclamationTriangle className="text-orange-500 text-3xl mr-2" aria-hidden="true" />
                    <span className="text-slate-700 text-lg font-medium">
                        No products available
                    </span>
                </div>
            );
        }

        return (
            <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                {products.slice(0, 6).map((item) => (
                    <ProductCard key={item.id} {...item} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="lg:px-14 sm:px-8 px-4">
                <div className="py-2 mt-4">
                    <Advertisement 
                        leftAds={adData.leftAds}
                        rightAds={adData.rightAds}
                        bottomAd={adData.bottomAd}
                    >
                        <HeroBanner />
                    </Advertisement>
                </div>
                
                <div className="py-5">
                    <div className="flex flex-col justify-center items-center space-y-2 mb-8">
                        <h1 className="text-slate-800 text-4xl font-bold">Featured Products</h1>
                        <span className="text-slate-600 text-lg">
                            Discover our latest and most popular products
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <Loader />
                        </div>
                    ) : errorMessage ? (
                        <div 
                            className="flex justify-center items-center h-[200px] bg-white rounded-2xl shadow-lg border border-slate-200"
                            role="alert"
                            aria-live="polite"
                        >
                            <FaExclamationTriangle 
                                className="text-orange-500 text-3xl mr-2" 
                                aria-hidden="true"
                            />
                            <span className="text-slate-700 text-lg font-medium">
                                {errorMessage}
                            </span>
                        </div>
                    ) : (
                        renderProducts()
                    )}
                </div>
            </div>
        </div>
    )
});

Home.displayName = 'Home';

export default Home;