import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
    FiHome, 
    FiPackage, 
    FiGrid, 
    FiUsers, 
    FiSettings,
    FiBarChart2,
    FiShoppingCart,
    FiTag
} from 'react-icons/fi';

const SidebarItem = memo(({ to, icon: Icon, children, isActive }) => (
    <Link
        to={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
        }`}
    >
        <Icon size={20} />
        <span className="font-medium">{children}</span>
    </Link>
));

SidebarItem.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool.isRequired,
};

SidebarItem.displayName = 'SidebarItem';

const AdminSidebar = memo(() => {
    const location = useLocation();
    
    const menuItems = [
        { to: '/admin', icon: FiHome, label: 'Dashboard' },
        { to: '/admin/categories', icon: FiGrid, label: 'Categories' },
        { to: '/admin/brands', icon: FiTag, label: 'Brands' },
        { to: '/admin/products', icon: FiPackage, label: 'Products' },
        { to: '/admin/orders', icon: FiShoppingCart, label: 'Orders' },
        { to: '/admin/users', icon: FiUsers, label: 'Users' },
        { to: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
        { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
            <div className="p-6">
                <Link to="/admin" className="flex items-center space-x-2 mb-8">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <FiHome className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold text-gray-800">Admin Panel</span>
                </Link>
                
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.to}
                            to={item.to}
                            icon={item.icon}
                            isActive={location.pathname === item.to}
                        >
                            {item.label}
                        </SidebarItem>
                    ))}
                </nav>
            </div>
        </aside>
    );
});

AdminSidebar.displayName = 'AdminSidebar';

export default AdminSidebar; 