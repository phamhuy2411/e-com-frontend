import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const getLocalStorageItem = (key, defaultValue) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
        return defaultValue;
    }
};

const user = getLocalStorageItem("auth", null);
const cartItems = getLocalStorageItem("cartItems", []);
const selectedUserCheckoutAddress = getLocalStorageItem("CHECKOUT_ADDRESS", null);

const initialState = {
    auth: { 
        user, 
        selectedUserCheckoutAddress,
        address: [],
        clientSecret: null
    },
    carts: { 
        cart: cartItems,
        totalPrice: 0,
        cartId: null
    },
};

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
    },
    preloadedState: initialState,
});

export default store;