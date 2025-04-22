import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getCart, updateQuantity } from '../services/cartApi';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      getCart(user.primaryEmailAddress.emailAddress).then((res) => {
        setCartItems(res || []);
      });
    }
  }, [isSignedIn, user]);
  const handleIncrement = async (itemId) => {
    const updated = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    const updatedQty = updated.find(i => i._id === itemId).quantity;
    await updateQuantity(itemId, updatedQty);
  };
  
  const handleDecrement = async (itemId) => {
    const item = cartItems.find(i => i._id === itemId);
    if (item.quantity > 1) {
      const updated = cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updated);
      const updatedQty = updated.find(i => i._id === itemId).quantity;
      await updateQuantity(itemId, updatedQty);
    }
  };
  

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.product.discountPrice, 0);
  const gst = subtotal * 0.18;
  const discount = subtotal * 0.10;
  const total = subtotal + gst - discount;

  if (!isLoaded) return <h1>Loading...</h1>;
  if (!isSignedIn) return <h1>Please Sign In</h1>;

  return (
    <div style={{ backgroundColor: "#fcf5f3", minHeight: "100vh", padding: "2rem" }}>
      <div className="container">
        <h3 className="mb-4">🛒 Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover bg-white">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.product.imageUrl1} alt={item.product.title} width="60" height="80" />
                      </td>
                      <td>{item.product.title}</td>
                      <td>₹{item.product.discountPrice}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleDecrement(item._id)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleIncrement(item._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>₹{item.product.discountPrice * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="mt-4">
              <h5>🧾 Summary</h5>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <strong>₹{subtotal.toFixed(2)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>GST (18%):</span>
                  <strong>₹{gst.toFixed(2)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Discount (10%):</span>
                  <strong>- ₹{discount.toFixed(2)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <span>Total:</span>
                  <strong>₹{total.toFixed(2)}</strong>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
