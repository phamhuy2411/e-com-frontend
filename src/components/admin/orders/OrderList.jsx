import { useEffect, useState } from 'react';
import { FiEye, FiPackage, FiDollarSign, FiUser, FiShoppingCart, FiCalendar, FiMapPin } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import AdminModal from '../shared/AdminModal';
import adminApi from '../../../api/adminApi';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all orders on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    adminApi.getAllOrders()
      .then(res => setOrders(res.data))
      .catch(err => setError(err?.response?.data?.message || 'Failed to fetch orders'))
      .finally(() => setLoading(false));
  }, []);

  // Set selected order when selectedOrderId changes
  useEffect(() => {
    if (selectedOrderId) {
      setSelectedOrder(orders.find(o => o.orderId === selectedOrderId));
    } else {
      setSelectedOrder(null);
    }
  }, [selectedOrderId, orders]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateOrderTotal = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return 0;
    return orderItems.reduce((total, item) => {
      return total + (item.orderedProductPrice * item.quantity);
    }, 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };



  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage and view all customer orders</p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <FiPackage className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">{orders.length} Orders</span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading orders...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-red-600 font-medium">{error}</div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Customer
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                        Date
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Total
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <FiPackage className="text-gray-400 mb-2" size={48} />
                            <p className="text-gray-500 text-lg font-medium">No orders found</p>
                            <p className="text-gray-400 text-sm">Orders will appear here once customers place them</p>
                          </div>
                        </td>
                      </tr>
                    ) : orders.map(order => (
                      <tr key={order.orderId} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiPackage className="text-blue-600" size={16} />
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">#{order.orderId}</div>
                              <div className="text-xs text-gray-500 md:hidden">{order.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                          <div className="flex items-center">
                            <FiUser className="text-gray-400 mr-2" size={16} />
                            <div className="text-sm text-gray-900 truncate max-w-32">{order.email}</div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                          <div className="flex items-center">
                            <FiCalendar className="text-gray-400 mr-2" size={16} />
                            <div className="text-sm text-gray-900">
                              {formatDate(order.orderdate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center">
                            <FiShoppingCart className="text-gray-400 mr-2" size={16} />
                            <div className="text-sm text-gray-900">
                              {order.orderItems?.length || 0} items
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus || 'Pending'}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                          <div className="flex items-center">
                            <FiDollarSign className="text-green-600 mr-1" size={16} />
                            <div className="text-sm font-medium text-gray-900">
                              {calculateOrderTotal(order.orderItems).toFixed(2)}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-sm font-medium">
                          <button
                            className="inline-flex items-center px-2 sm:px-3 py-2 border border-transparent text-xs sm:text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                            onClick={() => setSelectedOrderId(order.orderId)}
                          >
                            <FiEye className="mr-1" size={14} />
                            <span className="hidden sm:inline">View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <AdminModal
          isOpen={!!selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          title={selectedOrder ? `Order #${selectedOrder.orderId} Details` : ''}
          size="lg"
        >
          {selectedOrder && (
            <div className="space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <FiPackage className="mr-2 sm:mr-3" size={20} />
                  Order Summary
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                        <FiUser className="text-blue-600" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Customer Email</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1 truncate">{selectedOrder.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                        <FiCalendar className="text-green-600" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order Date</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{formatDate(selectedOrder.orderdate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                        <FiShoppingCart className="text-purple-600" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Items</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{selectedOrder.orderItems?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</p>
                        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border mt-1 ${getStatusColor(selectedOrder.orderStatus)}`}>
                          {selectedOrder.orderStatus || 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                        <FiDollarSign className="text-green-600" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Amount</p>
                        <p className="text-base sm:text-lg font-bold text-green-600 mt-1">${calculateOrderTotal(selectedOrder.orderItems).toFixed(2)}</p>
                      </div>
                    </div>
                    {selectedOrder.payment && (
                      <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg border border-gray-100">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                          <span className="text-xs font-bold text-purple-600">PAY</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payment Method</p>
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200 mt-1">
                            {selectedOrder.payment.paymentMethod}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {selectedOrder.address && (
                <div className="bg-blue-50 rounded-xl p-4 sm:p-6 lg:p-8">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <FiMapPin className="mr-2 sm:mr-3" size={20} />
                    Shipping Address
                  </h4>
                  <div className="bg-white rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        {selectedOrder.address.street && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Street</p>
                              <p className="text-sm font-semibold text-gray-900 mt-1 truncate">{selectedOrder.address.street}</p>
                            </div>
                          </div>
                        )}
                        {selectedOrder.address.buildingName && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Building</p>
                              <p className="text-sm font-semibold text-gray-900 mt-1 truncate">{selectedOrder.address.buildingName}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {selectedOrder.address.city && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                              {selectedOrder.address.city}
                            </span>
                          )}
                          {selectedOrder.address.state && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                              {selectedOrder.address.state}
                            </span>
                          )}
                          {selectedOrder.address.country && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                              {selectedOrder.address.country}
                            </span>
                          )}
                          {selectedOrder.address.pincode && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                              {selectedOrder.address.pincode}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <FiShoppingCart className="mr-2 sm:mr-3" size={20} />
                  Order Items
                </h4>
                {!selectedOrder.orderItems || selectedOrder.orderItems.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-8 sm:p-12 text-center">
                    <FiShoppingCart className="text-gray-400 mb-4 mx-auto" size={40} />
                    <p className="text-gray-500 text-base sm:text-lg font-medium">No items found</p>
                    <p className="text-gray-400 text-sm mt-2">This order doesn&apos;t contain any items</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {selectedOrder.orderItems.map(item => (
                      <div key={item.orderItemid} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
                        <div className="flex items-start space-x-4 sm:space-x-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img 
                              src={`/images/${item.product?.image || 'default-product.png'}`}
                              alt={item.product?.productName || 'Product'}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-gray-200 shadow-sm"
                              onError={(e) => {
                                e.target.src = '/images/default-product.png';
                              }}
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1 min-w-0">
                                <h5 className="text-sm sm:text-base font-semibold text-gray-900 truncate mb-1 sm:mb-2">
                                  {item.product?.productName || 'Unknown Product'}
                                </h5>
                                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                                  {item.product?.brand?.brandName || 'Unknown Brand'} • {item.product?.category?.categoryName || 'Unknown Category'}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Qty</span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                      {item.quantity}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                      ${item.orderedProductPrice?.toFixed(2) || '0.00'}
                                    </span>
                                  </div>
                                  {item.discount > 0 && (
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Off</span>
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                        {item.discount.toFixed(0)}%
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Item Total */}
                              <div className="text-right mt-3 sm:mt-0 sm:ml-6">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total</p>
                                <div className="text-base sm:text-lg font-bold text-gray-900">
                                  ${((item.orderedProductPrice || 0) * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  ${item.orderedProductPrice?.toFixed(2) || '0.00'} each
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </AdminModal>
      </div>
    </AdminLayout>
  );
} 