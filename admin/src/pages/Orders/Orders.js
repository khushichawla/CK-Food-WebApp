import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All"); // State for selected filter

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        // Filter out canceled orders and sort by date
        const filteredOrders = response.data.data
          .filter(order => order.status !== "Canceled")
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setOrders(filteredOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []); // Run once on mount

  // Filter orders based on selected filter
  const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className='order add'>
      <h3>Order Page</h3>

      {/* Filter Options as Buttons */}
      <div className='filter-options'>
        <span>Filter Orders: </span>
        {["All", "Order Pending", "Order Approved", "Canceled", "Payment Received", "Delivered"].map(status => (
          <button
            key={status}
            className={`filter-button ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className='order-list'>
        {filteredOrders.map((order, index) => (
          <div key={index} className='order-item'>
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => (
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>
              <p className='order-item-info'>
                <b>User:</b> {order.user?.name} <br/>
                <b>Phone:</b> {order.user?.phone} <br/>
                <b>Date:</b> {new Date(order.date).toLocaleDateString()}
              </p>
              <p className='order-item-phone'>
                
              </p>
              <p className='order-item-date'>
                
              </p>
            </div>
            <p>Items: {order.items.length} <br/>Price: ${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Order Pending">Order Pending</option>
              <option value="Order Approved">Order Approved</option>
              <option value="Canceled">Order Cancelled</option>
              <option value="Payment Received">Payment Received</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;