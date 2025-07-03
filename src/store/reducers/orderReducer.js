const initialState = {
    orderSuccess: false,
    orderError: null,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ORDER_SUCCESS":
            return {
                ...state,
                orderSuccess: true,
                orderError: null,
            };
        case "ORDER_ERROR":
            return {
                ...state,
                orderSuccess: false,
                orderError: action.payload,
            };
        case "ORDER_RESET":
            return initialState;
        default:
            return state;
    }
}; 