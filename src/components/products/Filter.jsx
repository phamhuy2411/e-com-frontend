import { Button, FormControl, MenuItem, Select, Tooltip, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch, FiDollarSign } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { memo } from 'react';

const Filter = memo(({ categories = [], brands = [] }) => {
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    const [category, setCategory] = useState("all");
    const [brand, setBrand] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentBrand = searchParams.get("brand") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        setCategory(currentCategory);
        setBrand(currentBrand);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
        if (minPrice && maxPrice) {
            setPriceRange([Number(minPrice), Number(maxPrice)]);
        } else {
            setPriceRange([0, 10000]);
        }
    }, [searchParams]);

    useEffect(() => { 
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;

        if (selectedBrand === "all") {
            params.delete("brand");
        } else {
            params.set("brand", selectedBrand);
        }
        navigate(`${pathname}?${params}`);
        setBrand(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ?  "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        })
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handlePriceChangeCommitted = (event, newValue) => {
        params.set("minPrice", newValue[0]);
        params.set("maxPrice", newValue[1]);
        navigate(`${pathname}?${params}`);
    };

    const handleClearFilters = () => {
        setPriceRange([0, 10000]);
        navigate({ pathname : window.location.pathname });
    };

    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* SEARCH BAR */}
            <div className="relative flex items-center w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <FiSearch className="absolute left-4 text-gray-400" size={20} aria-hidden="true" />
                <input 
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0 text-sm font-medium"
                    aria-label="Search products"
                />
            </div>

            {/* PRICE RANGE SLIDER */}
            <div className="flex flex-col w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <FiDollarSign className="text-orange-500" size={18} aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-gray-800">Price Range</h3>
                </div>
                <div className="px-2">
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        onChangeCommitted={handlePriceChangeCommitted}
                        valueLabelDisplay="off"
                        min={0}
                        max={10000}
                        step={100}
                        getAriaLabel={() => 'Price range'}
                        sx={{
                            color: '#f97316',
                            '& .MuiSlider-track': {
                                background: 'linear-gradient(to right, #f97316, #fb923c)',
                                height: 4,
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: '#fff',
                                border: '2px solid #f97316',
                                width: 20,
                                height: 20,
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: '0 0 0 8px rgba(249, 115, 22, 0.16)',
                                },
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#f3f4f6',
                                height: 4,
                            },
                            '& .MuiSlider-mark': {
                                backgroundColor: '#d1d5db',
                                width: 2,
                                height: 2,
                            },
                            '& .MuiSlider-markLabel': {
                                fontSize: '0.75rem',
                                color: '#6b7280',
                                fontWeight: 500,
                            },
                        }}
                        className="flex-1"
                        marks={[
                            { value: 0, label: '$0' },
                            { value: 2500, label: '$2.5k' },
                            { value: 5000, label: '$5k' },
                            { value: 7500, label: '$7.5k' },
                            { value: 10000, label: '$10k' }
                        ]}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-3 px-2">
                    <span className="font-semibold bg-gray-50 px-2 py-1 rounded-md">{formatPrice(priceRange[0])}</span>
                    <span className="font-semibold bg-gray-50 px-2 py-1 rounded-md">{formatPrice(priceRange[1])}</span>
                </div>
            </div>

            {/* CATEGORY SELECTION */}
            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Category</h3>
                <FormControl
                    className="w-full"
                    variant="outlined"
                    size="small">
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            className="w-full text-gray-700 bg-gray-50 border-gray-200 rounded-lg"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#e5e7eb',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#f97316',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#f97316',
                                    },
                                },
                                '& .MuiSelect-select': {
                                    padding: '10px 14px',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                },
                            }}
                            aria-label="Select category"
                         >
                            <MenuItem value="all" className="text-gray-600 font-medium">All Categories</MenuItem>
                            {categories?.map((item) => (
                                <MenuItem key={item.categoryId} value={item.categoryName} className="text-gray-700 font-medium">
                                    {item.categoryName}
                                </MenuItem>
                            ))}
                         </Select>
                </FormControl>
            </div>

            {/* BRAND SELECTION */}
            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Brand</h3>
                <FormControl
                    className="w-full"
                    variant="outlined"
                    size="small">
                        <Select
                            value={brand}
                            onChange={handleBrandChange}
                            className="w-full text-gray-700 bg-gray-50 border-gray-200 rounded-lg"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#e5e7eb',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#f97316',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#f97316',
                                    },
                                },
                                '& .MuiSelect-select': {
                                    padding: '10px 14px',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                },
                            }}
                            aria-label="Select brand"
                         >
                            <MenuItem value="all" className="text-gray-600 font-medium">All Brands</MenuItem>
                            {brands?.map((item) => (
                                <MenuItem key={item.brandId} value={item.brandName} className="text-gray-700 font-medium">
                                    {item.brandName}
                                </MenuItem>
                            ))}
                         </Select>
                </FormControl>
            </div>

            {/* SORT BUTTON & CLEAR FILTER */}
            <div className="flex flex-col gap-3 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <Tooltip title={`Sort by price: ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}> 
                    <Button variant="contained" 
                        onClick={toggleSortOrder}
                        sx={{
                            backgroundColor: '#f97316',
                            '&:hover': {
                                backgroundColor: '#ea580c',
                            },
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            padding: '12px 16px',
                            boxShadow: '0 4px 6px -1px rgba(249, 115, 22, 0.1)',
                        }}
                        className="flex items-center gap-2 w-full"
                        aria-label={`Sort by price ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                    >
                        <span>Sort by Price</span>
                        {sortOrder === "asc" ? (
                            <FiArrowUp size={18} aria-hidden="true" />
                        ) : (
                            <FiArrowDown size={18} aria-hidden="true" />
                        )}
                    </Button>
                </Tooltip>
                <button 
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition duration-200 focus:outline-none text-sm font-semibold w-full justify-center border border-gray-200"
                    onClick={handleClearFilters}
                    aria-label="Clear all filters"
                >
                    <FiRefreshCw className="font-semibold" size={16} aria-hidden="true" />
                    <span>Clear Filters</span>
                </button>
            </div>
        </div>
    );
});

Filter.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            categoryId: PropTypes.string.isRequired,
            categoryName: PropTypes.string.isRequired,
        })
    ),
    brands: PropTypes.arrayOf(
        PropTypes.shape({
            brandId: PropTypes.string.isRequired,
            brandName: PropTypes.string.isRequired,
        })
    ),
};

Filter.displayName = 'Filter';

export default Filter;