import { memo } from 'react';
import PropTypes from 'prop-types';

const AdminTable = memo(({ headers, children, isLoading, emptyMessage }) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded-t-lg"></div>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="h-16 bg-gray-100 border-t border-gray-200"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {children}
                    </tbody>
                </table>
            </div>
            
            {!children && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-sm">{emptyMessage || 'No data available'}</p>
                </div>
            )}
        </div>
    );
});

AdminTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    emptyMessage: PropTypes.string,
};

AdminTable.displayName = 'AdminTable';

export default AdminTable; 