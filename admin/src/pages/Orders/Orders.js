import React, {useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const Orders = ({url}) => {
  const [orders, setOrders] = useState([])
  
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(orderId)
    console.log(event.target.value)
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status:event.target.value
    })
    console.log(response.data.success)
    console.log(response.data.message)
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  })

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className='order-item-name'>
                User's name
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Order Pending">Order Pending</option>
              <option value="Order Approved">Order Approved</option>
              <option value="Order Cancelled">Order Cancelled</option>
              <option value="Payment Received">Payment Received</option>
              <option value="Delivered">Delivered</option>
            </select>
           </div> 
        ))}
      </div>
    </div>
  )
}

export default Orders
