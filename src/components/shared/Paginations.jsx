import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';

const Paginations = memo(({ numberOfPage = 1, page, onChange }) => {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    const paramValue = typeof page === 'number' ? page : (searchParams.get("page") ? Number(searchParams.get("page")) : 1);

    const onChangeHandler = useCallback((event, value) => {
        if (onChange) {
            onChange(event, value);
        } else {
            const params = new URLSearchParams(searchParams);
            params.set("page", value.toString());
            navigate(`${pathname}?${params}`);
        }
    }, [onChange, searchParams, pathname, navigate]);

    return (
        <Pagination 
            count={numberOfPage} 
            page={paramValue}
            defaultPage={1} 
            siblingCount={0} 
            boundaryCount={2} 
            shape="rounded" 
            onChange={onChangeHandler}
            aria-label="Pagination navigation"
            sx={{
                '& .MuiPaginationItem-root': {
                    color: '#f97316',
                    '&.Mui-selected': {
                        backgroundColor: '#f97316',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#ea580c',
                        },
                    },
                    '&:hover': {
                        backgroundColor: '#fff7ed',
                    },
                },
            }}
            size="large"
        />
    );
});

Paginations.propTypes = {
    numberOfPage: PropTypes.number.isRequired,
    page: PropTypes.number,
    onChange: PropTypes.func,
};

Paginations.displayName = 'Paginations';

export default Paginations;