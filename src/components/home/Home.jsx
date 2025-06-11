import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import { memo } from "react";
import PropTypes from "prop-types";

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
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" aria-hidden="true" />
                    <span className="text-slate-800 text-lg font-medium">
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
        <div className="lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBanner />
            </div>
            
            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-800 text-4xl font-bold"> Products</h1>
                        <span className="text-slate-700">
                            Discover our handpicked selection of top-rated items just for you!
                        </span>
                    
                </div>

                {isLoading ? (
                    <Loader />
                ) : errorMessage ? (
                    <div 
                        className="flex justify-center items-center h-[200px]"
                        role="alert"
                        aria-live="polite"
                    >
                        <FaExclamationTriangle 
                            className="text-slate-800 text-3xl mr-2" 
                            aria-hidden="true"
                        />
                        <span className="text-slate-800 text-lg font-medium">
                            {errorMessage}
                        </span>
                    </div>
                ) : (
                    renderProducts()
                )}
            </div>
        </div>
    )
});

Home.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            // Add other product properties as needed
        })
    ),
};

Home.defaultProps = {
    products: [],
};

Home.displayName = 'Home';

export default Home;