import { RotatingLines } from "react-loader-spinner";
import PropTypes from 'prop-types';
import { memo } from 'react';

const Loader = memo(({ text }) => {
    return (
        <div 
            className="flex justify-center items-center w-full h-[450px]"
            role="status"
            aria-live="polite"
        >
            <div className="flex flex-col items-center gap-1">
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="red"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                <p className="text-slate-800">
                    {text || "Please wait...."}
                </p>
            </div>
        </div>
    );
});

Loader.propTypes = {
    text: PropTypes.string,
};

Loader.defaultProps = {
    text: "Please wait....",
};

Loader.displayName = 'Loader';

export default Loader;