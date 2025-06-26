import { memo } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from './shared/AdminSidebar';
import AdminHeader from './shared/AdminHeader';

const AdminLayout = memo(({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <AdminHeader />
            
            <main className="ml-64 pt-16 min-h-screen">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
});

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

AdminLayout.displayName = 'AdminLayout';

export default AdminLayout; 