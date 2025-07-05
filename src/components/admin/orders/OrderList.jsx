import { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
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
      setSelectedOrder(orders.find(o => o.orderId === selectedOrderId));
      setItemsLoading(true);
      adminApi.getOrderItems(selectedOrderId)
        .then(res => setOrderItems(res.data))
        .catch(() => setOrderItems([]))
        .finally(() => setItemsLoading(false));
    } else {
      setOrderItems([]);
      setSelectedOrder(null);
    }
  }, [selectedOrderId, orders]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">ORDER_ID</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">ORDER_DATE</th>
                <th className="px-4 py-2">ORDER_STATUS</th>
                <th className="px-4 py-2">TOTAL_AMOUNT</th>
                <th className="px-4 py-2">ADDRESS_ID</th>
                <th className="px-4 py-2">PAYMENT_ID</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8">No orders found.</td></tr>
              ) : orders.map(order => (
                <tr key={order.orderId} className="border-b">
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.orderDate}</td>
                  <td className="px-4 py-2">{order.orderStatus}</td>
                  <td className="px-4 py-2">${order.totalAmount}</td>
                  <td className="px-4 py-2">{order.addressId}</td>
                  <td className="px-4 py-2">{order.paymentId}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-orange-500 hover:text-orange-700"
                      onClick={() => setSelectedOrderId(order.orderId)}
                    >
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <AdminModal
        isOpen={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        title={selectedOrder ? `Order #${selectedOrder.orderId} Details` : ''}
        size="lg"
      >
        {selectedOrder && (
          <>
            <div className="mb-4">
              <div><b>Email:</b> {selectedOrder.email}</div>
              <div><b>Order Date:</b> {selectedOrder.orderDate}</div>
              <div><b>Status:</b> {selectedOrder.orderStatus}</div>
              <div><b>Total Amount:</b> ${selectedOrder.totalAmount}</div>
              <div><b>Address ID:</b> {selectedOrder.addressId}</div>
              <div><b>Payment ID:</b> {selectedOrder.paymentId}</div>
            </div>
            <h4 className="font-semibold mb-2">Order Items</h4>
            {itemsLoading ? (
              <div className="text-center py-4">Loading items...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2">ORDER_ITEM_ID</th>
                      <th className="px-4 py-2">DISCOUNT</th>
                      <th className="px-4 py-2">PRICE</th>
                      <th className="px-4 py-2">QUANTITY</th>
                      <th className="px-4 py-2">PRODUCT_ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-4">No items found.</td></tr>
                    ) : orderItems.map(item => (
                      <tr key={item.orderItemId} className="border-b">
                        <td className="px-4 py-2">{item.orderItemId}</td>
                        <td className="px-4 py-2">{(item.discount * 100).toFixed(0)}%</td>
                        <td className="px-4 py-2">${item.orderedProductPrice || item.price}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">{item.productId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </AdminModal>
    </div>
  );
} 