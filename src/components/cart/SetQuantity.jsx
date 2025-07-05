import PropTypes from 'prop-types';
import { memo, useRef } from 'react';

const btnStyles = "border-[1.2px] border-slate-800 px-3 py-1 rounded hover:bg-slate-100 transition-colors duration-200";

const SetQuantity = ({
    quantity = 1,
    cardCounter = false,
    handleQtyIncrease,
    handleQtyDecrease,
    isAuthenticated,
    loading = false,
}) => {
    // Debounce click để tránh spam
    const debounceRef = useRef(false);
    const debounce = (fn) => {
        if (debounceRef.current) return;
        debounceRef.current = true;
        fn();
        setTimeout(() => { debounceRef.current = false; }, 400); // 400ms debounce
    };

    return (
        <div className="flex gap-8 items-center">
            {!cardCounter && <div className="font-semibold">QUANTITY</div>}
            <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
                <button
                    disabled={quantity <= 1 || !isAuthenticated || loading}
                    className={`${btnStyles} ${(quantity <= 1 || !isAuthenticated || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => debounce(handleQtyDecrease)}
                    aria-label="Decrease quantity">
                    -
                </button>
                <div className="text-red-500" aria-live="polite">{quantity}</div>
                <button
                    className={btnStyles}
                    onClick={() => debounce(handleQtyIncrease)}
                    aria-label="Increase quantity"
                    disabled={!isAuthenticated || loading}
                    style={(!isAuthenticated || loading) ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                    +
                </button>
            </div>
        </div>
    );
};

SetQuantity.propTypes = {
    quantity: PropTypes.number,
    cardCounter: PropTypes.bool,
    handleQtyIncrease: PropTypes.func.isRequired,
    handleQtyDecrease: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired, // Bắt buộc truyền từ cha
    loading: PropTypes.bool, // loading để disable nút khi đang gọi API
};

SetQuantity.defaultProps = {
    quantity: 1,
    cardCounter: false,
    loading: false,
};

export default memo(SetQuantity);