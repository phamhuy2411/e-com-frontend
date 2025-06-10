const initialState = {
    paymentMethod: null,
};

export const paymentMethodReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PAYMENT_METHOD":
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case "RESET_PAYMENT_METHOD":
            return {
                ...initialState
            };
        default:
            return state;
    }
};