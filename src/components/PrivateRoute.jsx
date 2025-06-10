import { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = memo(({ publicPage = false }) => {
    const { user } = useSelector((state) => state.auth);
    if (publicPage) {
        return user ? <Navigate to="/" /> : <Outlet />
    }
    return user ? <Outlet /> : <Navigate to="/login" />;
});

PrivateRoute.propTypes = {
    publicPage: PropTypes.bool
};

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute