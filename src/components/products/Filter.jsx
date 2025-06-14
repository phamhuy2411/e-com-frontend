import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch, FiDollarSign } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { memo } from 'react';

const Filter = memo(({ categories }) => {
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        setCategory(currentCategory);
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
        <div className="flex flex-col gap-6 w-full">
            {/* SEARCH BAR */}
            <div className="relative flex items-center w-full mb-2 bg-white rounded-lg shadow p-3">
                <input 
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-orange-200 text-slate-800 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 shadow-sm bg-white"
                    aria-label="Search products"
                />
                <FiSearch className="absolute left-3 text-orange-400" size={22} aria-hidden="true" />
            </div>

            {/* PRICE RANGE SLIDER */}
            <div className="flex flex-col w-full bg-white rounded-lg shadow p-3">
                <label className="text-sm font-semibold text-slate-700 mb-1 ml-1">Price Range</label>
                <div className="flex items-center gap-2">
                    <FiDollarSign className="text-orange-500" size={18} aria-hidden="true" />
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        onChangeCommitted={handlePriceChangeCommitted}
                        valueLabelDisplay="off"
                        min={0}
                        max={10000}
                        step={100}
                        sx={{
                            color: '#f97316',
                            '& .MuiSlider-track': {
                                background: 'linear-gradient(to right, #f97316, #fb923c)',
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: '#fff',
                                border: '2px solid #f97316',
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: '0 0 0 8px rgba(249, 115, 22, 0.16)',
                                },
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#fef3c7',
                            },
                        }}
                        className="flex-1"
                        aria-label="Price range"
                        marks={[
                            { value: 0, label: '$0' },
                            { value: 2500, label: '$2.5k' },
                            { value: 5000, label: '$5k' },
                            { value: 7500, label: '$7.5k' },
                            { value: 10000, label: '$10k' }
                        ]}
                    />
                </div>
                <div className="flex justify-between text-xs text-slate-600 mt-1 px-1">
                    <span className="font-medium">{formatPrice(priceRange[0])}</span>
                    <span className="font-medium">{formatPrice(priceRange[1])}</span>
                </div>
            </div>

            {/* CATEGORY SELECTION */}
            <div className="w-full bg-white rounded-lg shadow p-3">
                <FormControl
                    className="text-slate-800 border-orange-200 w-full mt-2"
                    variant="outlined"
                    size="small">
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                            className="w-full text-slate-800 border-orange-200 bg-white rounded-lg"
                            aria-label="Select category"
                         >
                            <MenuItem value="all">All</MenuItem>
                            {categories?.map((item) => (
                                <MenuItem key={item.categoryId} value={item.categoryName}>
                                    {item.categoryName}
                                </MenuItem>
                            ))}
                         </Select>
                </FormControl>
            </div>

            {/* SORT BUTTON & CLEAR FILTER */}
            <div className="flex flex-col gap-3 mt-2 bg-white rounded-lg shadow p-3">
                <Tooltip title={`Sort by price: ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}> 
                    <Button variant="contained" 
                        onClick={toggleSortOrder}
                        sx={{
                            backgroundColor: '#f97316',
                            '&:hover': {
                                backgroundColor: '#ea580c',
                            },
                        }}
                        className="flex items-center gap-2 h-11 rounded-lg shadow-md px-6 text-base font-semibold w-full"
                        aria-label={`Sort by price ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                    >
                        SORT BY
                        {sortOrder === "asc" ? (
                            <FiArrowUp size={20} aria-hidden="true" />
                        ) : (
                            <FiArrowDown size={20} aria-hidden="true" />
                        )}
                    </Button>
                </Tooltip>
                <button 
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition duration-200 shadow-md focus:outline-none text-base font-semibold h-11 w-full justify-center"
                    onClick={handleClearFilters}
                    aria-label="Clear all filters"
                >
                    <FiRefreshCw className="font-semibold" size={18} aria-hidden="true" />
                    <span>Clear Filter</span>
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
};

Filter.defaultProps = {
    categories: [],
};

Filter.displayName = 'Filter';

export default Filter;