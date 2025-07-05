const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART": {
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            if(existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return productToAdd;
                    } else {
                        return item;
                    }
                });

                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart,
                };
            }
        }
        case "REMOVE_CART":
            return {
                ...state,
                cart: state.cart.filter(
                    (item) => item.productId !== action.payload.productId
                ),
            };
        case "GET_USER_CART_PRODUCTS": {
            const nextState = {
                ...state,
                cart: action.payload,
                totalPrice: action.totalPrice,
            };
            if (action.cartId !== undefined && action.cartId !== null) {
                nextState.cartId = action.cartId;
            }
            return nextState;
        }
        case "CLEAR_CART":
            return {
                ...initialState
            };
        default:
            return state;
    }
}