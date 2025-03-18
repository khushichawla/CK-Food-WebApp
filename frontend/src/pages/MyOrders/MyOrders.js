import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import { GoPackage } from "react-icons/go";
import axios from 'axios'
import { toast } from 'react-toastify';

const MyOrders = () => {
    const {url, token} = useContext(StoreContext)
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, {headers:{token}})
        setData(response.data.data);
    }

    const cancelOrder = async (orderId) => {
        try {
            console.log("order id: ", orderId)
            const response = await axios.post(url + "/api/order/cancel", { orderId }, {
                headers: { token }
            });
            console.log("error: ", response.data.message)
            if (response.data.success) {
                // toast.success("Order canceled successfully");
                fetchOrders(); // Refresh the orders list
            }
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    };


    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

    useEffect(() => {
        const pendingOrApprovedOrders = data.filter(order => order.status === "Order Pending" || order.status === "Order Approved");
        if (pendingOrApprovedOrders.length > 0) {
            toast.info("Reminder: Please make the payment for your pending or approved orders.");
        }
    }, [data]);

    // removing orders with status 'Canceled'
    const filteredOrders = data
          .filter(data => data.status !== "Canceled")
    
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {filteredOrders.map((order, index)=>{
            return (
                <div key={index} className='my-orders-order'>
                    <span className="icon"><GoPackage /></span>
                    <p>{order.items.map((item, index)=>{
                        if (index === order.items.length - 1) {
                            return item.name + " x " + item.quantity;
                        } else {
                            return item.name + " x " + item.quantity + ", ";
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span><b> {order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                    {order.status === "Order Pending" && (
                        <button onClick={() => cancelOrder(order._id)}>Cancel</button>
                    )}
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders
