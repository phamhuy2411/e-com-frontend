import api from "../../api/api"
import {
    createOrUpdateCart as apiCreateOrUpdateCart,
    addProductToCart as apiAddProductToCart,
    getUserCart as apiGetUserCart,
    updateCartProduct as apiUpdateCartProduct,
    deleteCartProductFromCart as apiDeleteCartProductFromCart,
    orderProducts as apiOrderProducts,
    clearUserCart
} from "../../api/api"

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

export const fetchBrands = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/brands`);
        if (data) {
            dispatch({
                type: "FETCH_BRANDS",
                payload: data,
            });
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch brands",
        });
    }
};

export const fetchBrandsByCategory = (categoryName) => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories/${categoryName}/brands`);
        if (data) {
            dispatch({
                type: "FETCH_BRANDS",
                payload: data,
            });
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch brands",
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
        } catch { /* ignore */ }
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
        } catch { /* ignore */ }
    } else {
        if (toast) toast.error("Quantity Reached to Limit");
    }
};

export const decreaseCartQuantity = (data, newQuantity) => (dispatch, getState) => {
    dispatch({ type: "ADD_CART", payload: { ...data, quantity: newQuantity } });
    try {
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } catch { /* ignore */ }
};

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: data });
    if (toast) toast.success(`${data.productName} removed from cart`);
    try {
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } catch { /* ignore */ }
};

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        if (setLoader) setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        
        // Lưu thông tin user (không bao gồm token vì token đã được lưu trong cookie)
        const userInfo = {
            id: data.id,
            username: data.username,
            roles: data.roles,
            // Không lưu token vì nó đã được lưu trong cookie tự động
        };
        
        dispatch({ type: "LOGIN_USER", payload: userInfo });
        
        try {
            localStorage.setItem("auth", JSON.stringify(userInfo));
        } catch { /* ignore */ }
        
        // ĐỒNG BỘ GIỎ HÀNG LOCAL LÊN BACKEND NẾU CÓ
        const localCart = localStorage.getItem("cartItems");
        if (localCart) {
            const cartItems = JSON.parse(localCart);
            if (Array.isArray(cartItems) && cartItems.length > 0) {
                await dispatch(createUserCart(cartItems));
                localStorage.removeItem("cartItems");
            }
        }
        // LẤY GIỎ HÀNG TỪ BACKEND NGAY SAU KHI ĐĂNG NHẬP
        await dispatch(getUserCart());
        
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

export const logOutUser = (navigate) => async (dispatch) => {
    try {
        // Gọi API signout để xóa cookie JWT
        await api.post("/auth/signout");

        dispatch({ type: "LOG_OUT" });
        localStorage.removeItem("auth");
        localStorage.removeItem("cartItems"); // XÓA GIỎ HÀNG LOCAL KHI ĐĂNG XUẤT

        if (navigate) navigate("/login");
    } catch (error) {
        console.error("Logout failed", error);
        // Vẫn logout local ngay cả khi API call thất bại
        dispatch({ type: "LOG_OUT" });
        localStorage.removeItem("auth");
        localStorage.removeItem("cartItems"); // XÓA GIỎ HÀNG LOCAL KHI ĐĂNG XUẤT
        if (navigate) navigate("/login");
    }
};

export const getCurrentUser = () => async (dispatch) => {
    try {
        const { data } = await api.get("/auth/user");
        if (data) {
            // Lưu thông tin user (không bao gồm token)
            const userInfo = {
                id: data.id,
                username: data.username,
                roles: data.roles,
            };
            
            dispatch({ type: "LOGIN_USER", payload: userInfo });
            try {
                localStorage.setItem("auth", JSON.stringify(userInfo));
            } catch { /* ignore */ }
        }
    } catch (error) {
        console.error("Failed to get current user:", error);
        // Nếu không lấy được user info, có thể token đã hết hạn
        localStorage.removeItem("auth");
        dispatch({ type: "LOG_OUT" });
    }
};

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
        if (!addressId) {
            await api.post("users/addresses", sendData);
        } else {
            await api.put(`users/addresses/${addressId}`, sendData);
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
        await api.delete(`users/addresses/${addressId}`);
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
        const { data } = await api.get(`users/addresses`);
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
    } catch { /* ignore */ }
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
        await apiCreateOrUpdateCart(sendCartItems);
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
        const { data } = await apiGetUserCart();
        if (data) {
            dispatch({
                type: "GET_USER_CART_PRODUCTS",
                payload: data.products,
                totalPrice: data.totalPrice,
                cartId: data.cartId,
            });
            try {
                localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            } catch { /* ignore */ }
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
            } catch { /* ignore */ }
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
            } catch { /* ignore */ }
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

export const clearCartWithToast = (toast) => (dispatch, getState) => {
    dispatch({ type: "CLEAR_CART" });
    if (toast) toast.success("All items removed from cart");
    try {
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } catch { /* ignore */ }
};

export const addProductToCartAction = (productId, quantity, toast) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await apiAddProductToCart(productId, quantity);
        if (data) {
            dispatch({
                type: "GET_USER_CART_PRODUCTS",
                payload: data.products,
                totalPrice: data.totalPrice,
                cartId: data.cartId,
            });
            try {
                localStorage.setItem("cartItems", JSON.stringify(data.products));
            } catch { /* ignore */ }
            if (toast) toast.success("Added to cart");
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to add to cart");
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to add to cart",
        });
    }
};

export const updateCartProductAction = (productId, operation, toast) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await apiUpdateCartProduct(productId, operation);
        if (data) {
            dispatch({
                type: "GET_USER_CART_PRODUCTS",
                payload: data.products,
                totalPrice: data.totalPrice,
                cartId: data.cartId,
            });
            try {
                localStorage.setItem("cartItems", JSON.stringify(data.products));
            } catch { /* ignore */ }
            if (toast) toast.success("Cart updated");
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to update cart");
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to update cart",
        });
    }
};

export const deleteCartProductFromCartAction = (cartId, productId, toast) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await apiDeleteCartProductFromCart(cartId, productId);
        if (data) {
            dispatch({
                type: "GET_USER_CART_PRODUCTS",
                payload: data.products,
                totalPrice: data.totalPrice,
                cartId: data.cartId,
            });
            // Nếu có cartId (user đăng nhập), xóa luôn localStorage để đồng bộ với backend
            if (cartId) {
                localStorage.removeItem("cartItems");
            } else {
                try {
                    localStorage.setItem("cartItems", JSON.stringify(data.products));
                } catch { /* ignore */ }
            }
            if (toast) toast.success("Removed from cart");
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to remove from cart");
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to remove from cart",
        });
    }
};

export const orderProductsAction = (paymentMethod, orderRequestDTO, toast, navigate) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await apiOrderProducts(paymentMethod, orderRequestDTO);
        if (data) {
            dispatch({ type: "CLEAR_CART" });
            localStorage.removeItem("cartItems");
            if (toast) toast.success("Order placed successfully");
            if (navigate) navigate("/order-confirm");
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to place order");
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to place order",
        });
    }
};

export const clearUserCartAction = (cartId, toast) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await clearUserCart(cartId);
        if (data) {
            dispatch({
                type: "GET_USER_CART_PRODUCTS",
                payload: data.products,
                totalPrice: data.totalPrice,
                cartId: data.cartId,
            });
            // Nếu có cartId (user đăng nhập), xóa luôn localStorage để đồng bộ với backend
            if (cartId) {
                localStorage.removeItem("cartItems");
            } else {
                try {
                    localStorage.setItem("cartItems", JSON.stringify(data.products));
                } catch { /* ignore */ }
            }
            if (toast) toast.success("All items removed from cart");
        }
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to clear cart");
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to clear cart",
        });
    }
};
