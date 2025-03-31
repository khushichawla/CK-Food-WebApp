import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartQuantity,
    resetCart,
    url,
    token,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const placeOrder = async (event) => {
    const confirmPlaceOrder = window.confirm(
      "Are you sure you want to place this order?"
    );

    if (confirmPlaceOrder) {
      event.preventDefault();
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item };
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });

      // console.log(orderItems);
      let orderData = {
        items: orderItems,
        amount: getTotalCartAmount(),
      };

      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // const {session_url} = response.data;
        // window.location.replace(session_url);
        resetCart();
        toast.success("Order Placed Successfully");
        navigate("/myorders");
      } else {
        alert("Please Sign Up or Login.");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>
            Cart Total: <b>$ {getTotalCartAmount()}</b>
          </h2>
          <h2>
            Total Items: <b>{getTotalCartQuantity()}</b>
          </h2>
          <div className="cart-buttons">
            <button onClick={placeOrder}>PLACE ORDER</button>
            <button
              className="continue-button"
              onClick={() => navigate("/#explore-menu")}
            >
              {getTotalCartQuantity() === 0
                ? "ADD ITEMS TO CART"
                : "CONTINUE BROWSING"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
