import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';

const Paginations = memo(({ numberOfPage }) => {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    const paramValue = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const onChangeHandler = useCallback((event, value) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", value.toString());
        navigate(`${pathname}?${params}`);
    }, [searchParams, pathname, navigate]);

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
};

Paginations.defaultProps = {
    numberOfPage: 1,
};

Paginations.displayName = 'Paginations';

export default Paginations;