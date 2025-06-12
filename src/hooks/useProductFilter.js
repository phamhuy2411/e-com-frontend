import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions";

/**
 * Custom hook to fetch products based on URL search params.
 * Only triggers side effects, does not return any value.
 */
const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        // Handle pagination
        let currentPage = searchParams.get("page");
        currentPage = currentPage && !isNaN(Number(currentPage)) ? Number(currentPage) : 1;
        params.set("pageNumber", currentPage - 1);

        // Handle sorting
        const sortOrder = searchParams.get("sortby") || "asc";
        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder);

        // Handle category filter
        const categoryParams = searchParams.get("category") || null;
        if (categoryParams) {
            params.set("category", categoryParams);
        }

        // Handle search keyword
        const keyword = searchParams.get("keyword") || null;
        if (keyword) {
            params.set("keyword", keyword);
        }

        // Handle price range filter
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        if (minPrice && maxPrice) {
            params.set("minPrice", minPrice);
            params.set("maxPrice", maxPrice);
        }

        const queryString = params.toString();
        // Uncomment for debugging:
        // if (process.env.NODE_ENV === 'development') {
        //   console.log("QUERY STRING", queryString);
        // }
        dispatch(fetchProducts(queryString));

    }, [dispatch, searchParams]);
};

export default useProductFilter;