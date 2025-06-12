import { Badge } from "@mui/material";
import { useState, useCallback, memo } from "react";
import { FiShoppingCart, FiLogIn } from 'react-icons/fi'
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import UserMenu from "../UserMenu";
import logo from "../../assets/gearvana-logo.png";

const NavLink = memo(({ to, path, children, className = "" }) => (
    <li className="font-[500] transition-all duration-150">
        <Link 
            className={`${path === to ? "text-white font-semibold" : "text-gray-200"} ${className}`}
            to={to}
        >
            {children}
        </Link>
    </li>
));

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

NavLink.displayName = 'NavLink';

const Navbar = memo(() => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);

    const toggleNavbar = useCallback(() => {
        setNavbarOpen(prev => !prev);
    }, []);

    const cartItemsCount = cart?.length || 0;
    
    return (
        <nav 
            className="h-[70px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white z-50 flex items-center sticky top-0 shadow-lg"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link 
                    to="/" 
                    className="flex items-center text-2xl font-bold group"
                    aria-label="Home"
                >
                    <img
                        src={logo}
                        alt="Gearvana Logo"
                        className="mr-2 h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                        style={{ maxHeight: 48 }}
                    />
                    <span className="font-[Poppins] bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Gearvana</span>
                </Link>

                <ul 
                    className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-lg ${
                        navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
                    } transition-all duration-100 sm:h-fit sm:bg-none bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
                    role="menubar"
                >
                    <NavLink to="/" path={path}>Home</NavLink>
                    <NavLink to="/products" path={path}>Products</NavLink>
                    <NavLink to="/about" path={path}>About</NavLink>
                    <NavLink to="/contact" path={path}>Contact</NavLink>

                    <li className="font-[500] transition-all duration-150">
                        <Link 
                            to="/cart"
                            className={`${path === "/cart" ? "text-blue-400 font-semibold" : "text-gray-200 hover:text-blue-400"}`}
                            aria-label={`Cart (${cartItemsCount} items)`}
                        >
                            <Badge
                                showZero
                                badgeContent={cartItemsCount}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#3b82f6',
                                        color: 'white'
                                    }
                                }}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                <FiShoppingCart size={25} aria-hidden="true" />
                            </Badge>
                        </Link>
                    </li>

                    {user?.id ? (
                        <li className="font-[500] transition-all duration-150">
                            <UserMenu />
                        </li>
                    ) : (
                        <li className="font-[500] transition-all duration-150">
                            <Link 
                                className="flex items-center space-x-2 px-4 py-[6px] 
                                    bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
                                    text-white font-semibold rounded-md shadow-lg 
                                    hover:from-blue-500 hover:via-blue-400 hover:to-cyan-300 
                                    transition duration-300 ease-in-out transform hover:scale-105"
                                to="/login"
                                aria-label="Login"
                            >
                                <FiLogIn aria-hidden="true" />
                                <span>Login</span>
                            </Link>
                        </li>
                    )}
                </ul>

                <button
                    onClick={toggleNavbar}
                    className="sm:hidden flex items-center sm:mt-0 mt-2"
                    aria-expanded={navbarOpen}
                    aria-controls="main-menu"
                    aria-label={navbarOpen ? "Close menu" : "Open menu"}
                >
                    {navbarOpen ? (
                        <RxCross2 className="text-white text-3xl" aria-hidden="true" />
                    ) : (
                        <IoIosMenu className="text-white text-3xl" aria-hidden="true" />
                    )}
                </button>
            </div>
        </nav>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;