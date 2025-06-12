import {TfiShoppingCartFull} from "react-icons/tfi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import { useMemo } from "react";
import { clearCartWithToast } from "../../store/actions";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
import { Tooltip } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useState } from "react";

const Cart = () => {
    const { cart } = useSelector((state) => state.carts);
    const dispatch = useDispatch();
    
    const newCart = useMemo(() => {
        if (!cart) return { totalPrice: 0 };
        return {
            ...cart,
            totalPrice: cart.reduce(
                (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 
                0
            )
        };
    }, [cart]);

    const [openConfirm, setOpenConfirm] = useState(false);
    const handleRemoveAll = () => setOpenConfirm(true);
    const handleConfirmRemoveAll = () => {
        dispatch(clearCartWithToast(toast));
        setOpenConfirm(false);
    };
    const handleCancelRemoveAll = () => setOpenConfirm(false);

    if (!cart || cart.length === 0) return <CartEmpty />;

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                  <TfiShoppingCartFull  size={36} className="text-gray-700" />
                    Your Cart
                </h1>
                <p className="text-lg text-gray-600 mt-2">All your selected items</p>
            </div>

            {cart && cart.length > 0 && (
                <div className="flex justify-end mb-4">
                    <Tooltip title="Remove all items from cart" arrow>
                        <button
                            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded-md text-sm font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                            onClick={handleRemoveAll}
                        >
                            <HiOutlineTrash size={18} />
                            Remove All
                        </button>
                    </Tooltip>
                    <Dialog open={openConfirm} onClose={handleCancelRemoveAll}>
                        <DialogTitle>Remove All Items?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to remove all items from your cart? This action cannot be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelRemoveAll} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleConfirmRemoveAll} color="error" variant="contained">
                                Remove All
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}

            <div className="grid md:grid-cols-12 gap-4 pb-2 font-semibold items-center">
                <div className="md:col-span-7 text-lg text-slate-800 lg:ps-4">
                    Product
                </div>
                <div className="md:col-span-2 text-lg text-slate-800 text-center">
                    Price
                </div>
                <div className="md:col-span-2 text-lg text-slate-800 text-center">
                    Quantity
                </div>
                <div className="md:col-span-1 text-lg text-slate-800 text-center">
                    Total
                </div>
            </div>

            <div>
                {cart && cart.length > 0 &&
                    cart.map((item) => <ItemContent key={item.id || item._id} {...item}/>)}
            </div>

            <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
                <div></div>
                <div className="flex text-sm gap-1 flex-col">
                    <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(newCart?.totalPrice)}</span>
                    </div>

                    <p className="text-slate-500">
                        Taxes and shipping calculated at checkout
                    </p>

                    <Link className="w-full flex justify-end" to="/checkout">
                    <button
                        className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-customBlue text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500">
                        <TfiShoppingCartFull  size={20} />
                        Checkout
                    </button>
                    </Link>

                    <Link className="flex gap-2 items-center mt-2 text-slate-500" to="/products">
                        <FiArrowLeftCircle />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;