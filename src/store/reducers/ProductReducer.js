const initialState = {
    products: null,
    categories: null,
    pagination: {},
};

const updatePagination = (state, action) => ({
    ...state.pagination,
    pageNumber: action.pageNumber,
    pageSize: action.pageSize,
    totalElements: action.totalElements,
    totalPages: action.totalPages,
    lastPage: action.lastPage,
});

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS":
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                products: action.payload,
                pagination: updatePagination(state, action),
            };
        case "FETCH_CATEGORIES":
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                categories: action.payload,
                pagination: updatePagination(state, action),
            };
        case "RESET_PRODUCTS":
            return {
                ...state,
                products: null,
                pagination: {},
            };
        case "RESET_CATEGORIES":
            return {
                ...state,
                categories: null,
                pagination: {},
            };
        default:
            return state;
    }
};