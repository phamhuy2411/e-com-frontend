import { useEffect, useState } from 'react';
import { FiEye, FiPackage, FiDollarSign, FiUser, FiShoppingCart, FiCalendar } from 'react-icons/fi';
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
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
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiPackage className="text-blue-600" size={16} />
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">#{order.orderId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiUser className="text-gray-400 mr-2" size={16} />
                            <div className="text-sm text-gray-900">{order.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiCalendar className="text-gray-400 mr-2" size={16} />
                            <div className="text-sm text-gray-900">
                              {formatDate(order.orderdate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiShoppingCart className="text-gray-400 mr-2" size={16} />
                            <div className="text-sm text-gray-900">
                              {order.orderItems?.length || 0} items
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiDollarSign className="text-green-600 mr-1" size={16} />
                            <div className="text-sm font-medium text-gray-900">
                              {calculateOrderTotal(order.orderItems).toFixed(2)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                            onClick={() => setSelectedOrderId(order.orderId)}
                          >
                            <FiEye className="mr-1" size={16} />
                            View
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
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiPackage className="mr-2" size={20} />
                  Order Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FiUser className="text-gray-400 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-500">Customer Email</p>
                      <p className="text-sm font-medium text-gray-900">{selectedOrder.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(selectedOrder.orderdate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiShoppingCart className="text-gray-400 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-500">Total Items</p>
                      <p className="text-sm font-medium text-gray-900">{selectedOrder.orderItems?.length || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.orderStatus)}`}>
                        {selectedOrder.orderStatus || 'Pending'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="text-green-600 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-sm font-medium text-gray-900">{calculateOrderTotal(selectedOrder.orderItems).toFixed(2)}</p>
                    </div>
                  </div>
                  {selectedOrder.payment && (
                    <div className="flex items-center">
                      <div className="mr-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          {selectedOrder.payment.paymentMethod}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiShoppingCart className="mr-2" size={20} />
                  Order Items
                </h4>
                {!selectedOrder.orderItems || selectedOrder.orderItems.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <FiShoppingCart className="text-gray-400 mb-2 mx-auto" size={32} />
                    <p className="text-gray-500">No items found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedOrder.orderItems.map(item => (
                      <div key={item.orderItemid} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img 
                              src={`/images/${item.product?.image || 'default-product.png'}`}
                              alt={item.product?.productName || 'Product'}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.target.src = '/images/default-product.png';
                              }}
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="text-sm font-medium text-gray-900 truncate">
                                  {item.product?.productName || 'Unknown Product'}
                                </h5>
                                <p className="text-xs text-gray-500 mt-1">
                                  {item.product?.brand?.brandName || 'Unknown Brand'} • {item.product?.category?.categoryName || 'Unknown Category'}
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-xs text-gray-500">
                                    Quantity: {item.quantity}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Price: {item.orderedProductPrice?.toFixed(2) || '0.00'}
                                  </span>
                                  {item.discount > 0 && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      {item.discount.toFixed(0)}% off
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Item Total */}
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  {((item.orderedProductPrice || 0) * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {item.orderedProductPrice?.toFixed(2) || '0.00'} each
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