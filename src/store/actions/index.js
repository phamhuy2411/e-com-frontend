import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        if (data) {
            dispatch({
                type: "FETCH_PRODUCTS",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
};

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        if (data) {
            dispatch({
                type: "FETCH_CATEGORIES",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
        });
    }
};

export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(item => item.productId === data.productId);

    const isQuantityExist = getProduct?.quantity >= qty;

    if (isQuantityExist) {
        dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
        if (toast) toast.success(`${data?.productName} added to the cart`);
        try {
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } catch {
            // ignore localStorage errors
        }
    } else {
        if (toast) toast.error("Out of stock");
    }
};

export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) => (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(item => item.productId === data.productId);

    const isQuantityExist = getProduct?.quantity >= currentQuantity + 1;

    if (isQuantityExist) {
        const newQuantity = currentQuantity + 1;
        if (setCurrentQuantity) setCurrentQuantity(newQuantity);
        dispatch({ type: "ADD_CART", payload: { ...data, quantity: newQuantity } });
        try {
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } catch {
            // ignore localStorage errors
        }
    } else {
        if (toast) toast.error("Quantity Reached to Limit");
    }
};

export const decreaseCartQuantity = (data, newQuantity) => (dispatch, getState) => {
    dispatch({ type: "ADD_CART", payload: { ...data, quantity: newQuantity } });
    try {
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } catch {
        // ignore localStorage errors
    }
};

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: data });
    if (toast) toast.success(`${data.productName} removed from cart`);
    try {
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } catch {
        // ignore localStorage errors
    }
};

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        if (setLoader) setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        dispatch({ type: "LOGIN_USER", payload: data });
        try {
            localStorage.setItem("auth", JSON.stringify(data));
        } catch {
            // ignore localStorage errors
        }
        if (reset) reset();
        if (toast) toast.success("Login Success");
        if (navigate) navigate("/");
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
        if (setLoader) setLoader(false);
    }
};

export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async () => {
    try {
        if (setLoader) setLoader(true);
        const { data } = await api.post("/auth/signup", sendData);
        if (reset) reset();
        if (toast) toast.success(data?.message || "User Registered Successfully");
        if (navigate) navigate("/login");
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
    } finally {
        if (setLoader) setLoader(false);
    }
};

export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    try {
        localStorage.removeItem("auth");
    } catch {
        // ignore localStorage errors
    }
    if (navigate) navigate("/login");
};

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
        if (!addressId) {
            await api.post("/addresses", sendData);
        } else {
            await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses());
        if (toast) toast.success("Address saved successfully");
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({ type: "IS_ERROR", payload: null });
    } finally {
        if (setOpenAddressModal) setOpenAddressModal(false);
    }
};

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        if (toast) toast.success("Address deleted successfully");
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some Error Occurred",
        });
    } finally {
        if (setOpenDeleteModal) setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress = () => ({
    type: "REMOVE_CHECKOUT_ADDRESS",
});

export const getUserAddresses = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/addresses`);
        if (data) {
            dispatch({ type: "USER_ADDRESS", payload: data });
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
        });
    }
};

export const selectUserCheckoutAddress = (address) => {
    try {
        localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    } catch {
        // ignore localStorage errors
    }
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    };
};

export const addPaymentMethod = (method) => ({
    type: "ADD_PAYMENT_METHOD",
    payload: method,
});

export const createUserCart = (sendCartItems) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post("/cart/create", sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
        });
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get("/carts/users/cart");
        if (data) {
            dispatch({
                type: "GET_USER_CART_PRODUCTS",
                payload: data.products,
                totalPrice: data.totalPrice,
                cartId: data.cartId,
            });
            try {
                localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            } catch {
                // ignore localStorage errors
            }
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
        });
    }
};

export const createStripePaymentSecret = (totalPrice, toast) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.post("/order/stripe-client-secret", {
            amount: Number(totalPrice) * 100,
            currency: "usd",
        });
        if (data) {
            dispatch({ type: "CLIENT_SECRET", payload: data });
            try {
                localStorage.setItem("client-secret", JSON.stringify(data));
            } catch {
                // ignore localStorage errors
            }
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to create client secret");
    }
};

export const stripePaymentConfirmation = (sendData, setErrorMesssage, setLoading, toast) => async (dispatch) => {
    try {
        const response = await api.post("/order/users/payments/online", sendData);
        if (response.data) {
            try {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
            } catch {
                // ignore localStorage errors
            }
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
            dispatch({ type: "CLEAR_CART" });
            if (toast) toast.success("Order Accepted");
        } else {
            if (setErrorMesssage) setErrorMesssage("Payment Failed. Please try again.");
        }
    } catch {
        if (setErrorMesssage) setErrorMesssage("Payment Failed. Please try again.");
    } finally {
        if (setLoading) setLoading(false);
    }
};

export const fetchProductById = (productId) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products/${productId}`);
        if (data) {
            dispatch({
                type: "FETCH_PRODUCT_DETAIL",
                payload: data
            });
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch product details",
        });
    }
};
