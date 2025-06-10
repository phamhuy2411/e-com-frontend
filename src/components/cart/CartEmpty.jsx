import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { memo } from "react";

const CartEmpty = memo(() => {
 return (
    <div className="min-h-[800px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
            <MdShoppingCart size={80} className="mb-4 text-slate-500" aria-hidden="true"/>
            <h1 className="text-3xl font-bold text-slate-700">
                Your cart is empty
            </h1>
            <p className="text-lg text-slate-500 mt-2">
                Add some products to get started
            </p>
        </div>
        <div className="mt-6">
            <Link
                to="/products"
                className="flex gap-2 items-center text-blue-500 hover:text-blue-600 transition"
                aria-label="Start shopping">
                    <MdArrowBack size={24} aria-hidden="true" />
                    <span className="font-medium">Start Shopping</span>
                </Link>
        </div>
    </div>
 )   
});

CartEmpty.displayName = 'CartEmpty';

export default CartEmpty;