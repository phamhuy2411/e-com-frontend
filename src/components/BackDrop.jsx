import { memo } from 'react';
import PropTypes from 'prop-types';

const BackDrop = memo(({ data }) => {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`z-20 transition-all duration-200 opacity-50 w-screen h-screen bg-slate-300 fixed ${data ? "top-16" : "top-0"} left-0`}
    />
  );
});

BackDrop.propTypes = {
  data: PropTypes.bool
};

BackDrop.defaultProps = {
  data: false
};

BackDrop.displayName = 'BackDrop';

export default BackDrop;