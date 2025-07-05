import { useEffect, useState } from 'react';
import { FiEye, FiPackage, FiCalendar, FiDollarSign, FiMapPin, FiCreditCard, FiUser, FiShoppingCart } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import AdminModal from '../shared/AdminModal';
import adminApi from '../../../api/adminApi';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(false);

  // Fetch all orders on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    adminApi.getAllOrders()
      .then(res => setOrders(res.data))
      .catch(err => setError(err?.response?.data?.message || 'Failed to fetch orders'))
      .finally(() => setLoading(false));
  }, []);

  // Fetch order items when selectedOrderId changes
  useEffect(() => {
    if (selectedOrderId) {
      const foundOrder = orders.find(o => o.orderId === selectedOrderId);
      setSelectedOrder(foundOrder);
      // Ưu tiên lấy orderItems từ order.orderItems nếu có
      if (foundOrder && Array.isArray(foundOrder.orderItems)) {
        setOrderItems(foundOrder.orderItems);
        setItemsLoading(false);
      } else {
        setItemsLoading(true);
        adminApi.getOrderItems(selectedOrderId)
          .then(res => setOrderItems(res.data))
          .catch(() => setOrderItems([]))
          .finally(() => setItemsLoading(false));
      }
    } else {
      setOrderItems([]);
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                        <td colSpan={6} className="px-6 py-12 text-center">
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
                            <div className="text-sm text-gray-900">{formatDate(order.orderDate)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiDollarSign className="text-green-600 mr-1" size={16} />
                            <div className="text-sm font-medium text-gray-900">${order.totalAmount}</div>
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
                      <p className="text-sm font-medium text-gray-900">{formatDate(selectedOrder.orderDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.orderStatus)}`}>
                        {selectedOrder.orderStatus}
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
                      <p className="text-sm font-medium text-gray-900">${selectedOrder.totalAmount}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="text-gray-400 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedOrder.address?.fullName} <br />
                        {selectedOrder.address?.addressLine}, {selectedOrder.address?.city}, {selectedOrder.address?.state} {selectedOrder.address?.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiCreditCard className="text-gray-400 mr-3" size={16} />
                    <div>
                      <p className="text-sm text-gray-500">Payment</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedOrder.payment?.paymentMethod} <br />
                        ID: {selectedOrder.payment?.paymentId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FiShoppingCart className="mr-2" size={20} />
                  Order Items
                </h4>
                {itemsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading items...</span>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Item ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Discount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orderItems.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center">
                                <div className="flex flex-col items-center">
                                  <FiShoppingCart className="text-gray-400 mb-2" size={32} />
                                  <p className="text-gray-500">No items found</p>
                                </div>
                              </td>
                            </tr>
                          ) : orderItems.map(item => (
                            <tr key={item.orderItemid} className="hover:bg-gray-50 transition-colors duration-150">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                #{item.orderItemid}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                #{item.product?.productId} <br />
                                {item.product?.name}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                ${item.orderedProductPrice}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {(item.discount * 100).toFixed(0)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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