import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
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
  }, []);

  // Filter orders based on selected filter
  const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className='order add'>
      <h3 className='heading'>Order Page:</h3>

      {/* Filter Options as Dropdown */}
      <div className='filter-options'>
        <label htmlFor="order-filter">Filter Orders: </label>
        <select 
          id="order-filter" 
          onChange={(e) => setFilter(e.target.value)} 
          value={filter}
          className="filter-dropdown"
        >
          {["All", "Order Pending", "Order Approved", "Payment Received", "Delivered"].map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
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
            </div>
            <p>Price: ${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Order Pending">Pending</option>
              <option value="Order Approved">Approved</option>
              <option value="Canceled">Cancelled</option>
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