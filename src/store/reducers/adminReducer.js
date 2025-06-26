const initialState = {
    categories: null,
    products: null,
    pagination: {},
    isLoading: false,
    isButtonLoading: false,
    errorMessage: null,
};

const updatePagination = (state, action) => ({
    ...state.pagination,
    pageNumber: action.pageNumber,
    pageSize: action.pageSize,
    totalElements: action.totalElements,
    totalPages: action.totalPages,
    lastPage: action.lastPage,
});

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADMIN_CATEGORY_LOADER":
        case "ADMIN_PRODUCT_LOADER":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };

        case "ADMIN_BUTTON_LOADER":
            return {
                ...state,
                isButtonLoading: true,
                errorMessage: null,
            };

        case "ADMIN_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isButtonLoading: false,
                errorMessage: null,
            };

        case "ADMIN_ERROR":
            return {
                ...state,
                isLoading: false,
                isButtonLoading: false,
                errorMessage: action.payload,
            };

        case "FETCH_ADMIN_CATEGORIES":
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                categories: action.payload,
                pagination: updatePagination(state, action),
            };

        case "FETCH_ADMIN_PRODUCTS":
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                products: action.payload,
                pagination: updatePagination(state, action),
            };

        case "CLEAR_ADMIN_STATE":
            return {
                ...initialState,
            };

        default:
            return state;
    }
}; 