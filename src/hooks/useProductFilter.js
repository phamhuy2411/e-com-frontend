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

        let currentPage = searchParams.get("page");
        currentPage = currentPage && !isNaN(Number(currentPage)) ? Number(currentPage) : 1;
        params.set("pageNumber", currentPage - 1);

        const sortOrder = searchParams.get("sortby") || "asc";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;
        params.set("sortBy","price");
        params.set("sortOrder", sortOrder);

        if (categoryParams) {
            params.set("category", categoryParams);
        }

        if (keyword) {
            params.set("keyword", keyword);
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