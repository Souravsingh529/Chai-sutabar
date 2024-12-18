import React, { useContext, useState } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: Order placement failed.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="Title">Delivery Information</p>
        <div className="multi-fields">
          <InputField
            name="firstName"
            type="text"
            placeholder="First Name"
            value={data.firstName}
            onChange={onChangeHandler}
          />
          <InputField
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={data.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <InputField
          name="email"
          type="email"
          placeholder="Email Address"
          value={data.email}
          onChange={onChangeHandler}
        />
        <InputField
          name="street"
          type="text"
          placeholder="Street"
          value={data.street}
          onChange={onChangeHandler}
        />
        <div className="multi-fields">
          <InputField
            name="city"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
          />
          <InputField
            name="state"
            type="text"
            placeholder="State"
            value={data.state}
            onChange={onChangeHandler}
          />
        </div>
        <div className="multi-fields">
          <InputField
            name="zipcode"
            type="text"
            placeholder="Zip Code"
            value={data.zipcode}
            onChange={onChangeHandler}
          />
          <InputField
            name="country"
            type="text"
            placeholder="Country"
            value={data.country}
            onChange={onChangeHandler}
          />
        </div>
        <InputField
          name="phone"
          type="tel"
          placeholder="Phone"
          value={data.phone}
          onChange={onChangeHandler}
          pattern="[0-9]{10}"
          title="Please enter a valid 10-digit phone number."
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </form>
  );
};

const InputField = ({ name, type, placeholder, value, onChange, ...props }) => (
  <input
    required
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    {...props}
  />
);

export default Placeorder;
