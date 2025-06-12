import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { memo } from "react";
import PropTypes from "prop-types";

const Products = memo(() => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const {products, categories, pagination} = useSelector(
        (state) => state.products
    )
    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }

        if (errorMessage) {
            return (
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
            );
        }

        if (!products?.length) {
            return (
                <div 
                    className="flex justify-center items-center h-[200px]"
                    role="status"
                >
                    <span className="text-slate-800 text-lg font-medium">
                        No products found
                    </span>
                </div>
            );
        }

        return (
            <div className="min-h-[700px]">
                <div 
                    className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-8 gap-x-8"
                    role="list"
                    aria-label="Product list"
                >
                    {products.map((item) => (
                        <div key={item.id} role="listitem" className="flex flex-col h-full">
                            <ProductCard {...item} />
                        </div>
                    ))}
                </div>
                {pagination && (
                    <div className="flex justify-center pt-10">
                        <Paginations 
                            numberOfPage={pagination.totalPages}
                            totalProducts={pagination.totalElements}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Filter */}
                <aside className="lg:w-1/5 max-w-sm w-full mb-8 lg:mb-0 bg-white rounded-xl shadow-md p-0 lg:p-0 lg:sticky top-8 h-fit">
                    <Filter categories={categories || []} />
                </aside>
                {/* Main Product List */}
                <main className="flex-1 w-full bg-gray-50 rounded-xl p-4 lg:pl-8 min-h-[700px]">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
});

Products.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            // Add other product properties as needed
        })
    ),
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            // Add other category properties as needed
        })
    ),
    pagination: PropTypes.shape({
        totalPages: PropTypes.number,
        totalElements: PropTypes.number,
    }),
};

Products.defaultProps = {
    products: [],
    categories: [],
    pagination: null,
};

Products.displayName = 'Products';

export default Products;