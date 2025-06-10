import { memo } from 'react';
import PropTypes from 'prop-types';

const Status = memo(({ text, icon: Icon, bg, color }) => {
    return (
        <div
            role="status"
            aria-label={`Status: ${text}`}
            className={`${bg} ${color} px-2 py-2 font-medium rounded flex items-center gap-1`}>
            {text} <Icon size={15} aria-hidden="true" />
        </div>
    )
});

Status.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    bg: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

Status.displayName = 'Status';

export default Status;