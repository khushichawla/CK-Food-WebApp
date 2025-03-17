import React, { useEffect, useState } from 'react';
import './Summary.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Summary = ({url}) => {
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

    useEffect(() => {
        fetchAllOrders();
    }, []); // Run once on mount

    const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(order => order.status === filter);

    const summarizeOrders = () => {
        const summary = {};
        let totalPrice = 0;

        filteredOrders.forEach(order => {
            order.items.forEach(item => {
                if (summary[item.name]) {
                    summary[item.name].count += item.quantity;
                } else {
                    summary[item.name] = { count: item.quantity, price: item.price };
                }
                totalPrice += item.price * item.quantity; // Assuming item.price is defined
            });
        });

        return { summary, totalPrice };
    };

    const { summary, totalPrice } = summarizeOrders();

    return (
        <div className="summary-container">
            <h3>Order Summary</h3>
            <table className='summary-table'>
                <thead>
                    <tr>
                        <th>Food Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(summary).map(([foodItem, { count }]) => (
                        <tr key={foodItem}>
                            <td>{foodItem}</td>
                            <td>{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
    );
}

export default Summary;