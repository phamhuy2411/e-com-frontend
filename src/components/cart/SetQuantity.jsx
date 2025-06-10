import PropTypes from 'prop-types';
import { memo } from 'react';

const btnStyles = "border-[1.2px] border-slate-800 px-3 py-1 rounded hover:bg-slate-100 transition-colors duration-200";

const SetQuantity = ({
    quantity = 1,
    cardCounter = false,
    handleQtyIncrease,
    handleQtyDecrease,
}) => {
   return (
   <div className="flex gap-8 items-center">
        {!cardCounter && <div className="font-semibold">QUANTITY</div>}
        <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
            <button
                disabled={quantity <= 1}
                className={`${btnStyles} ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleQtyDecrease}
                aria-label="Decrease quantity">
                -
            </button>
                <div className="text-red-500" aria-live="polite">{quantity}</div>
            <button
                className={btnStyles}
                onClick={handleQtyIncrease}
                aria-label="Increase quantity">
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
};

SetQuantity.defaultProps = {
    quantity: 1,
    cardCounter: false,
};

export default memo(SetQuantity);