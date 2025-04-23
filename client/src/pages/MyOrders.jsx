import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getOrderByUser, deleteOrderById } from '../services/orderApi';

function MyOrders() {
  const { isLoaded, user, isSignedIn } = useUser();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const userEmail = user.primaryEmailAddress.emailAddress;
      async function fetchOrders() {
        const response = await getOrderByUser(userEmail);
        setOrderList(response || []);
      }
      fetchOrders();
    }
  }, [user, isLoaded, isSignedIn]);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure to cancel this order?");
    if (confirmDelete) {
      await deleteOrderById(orderId);
      setOrderList(orderList.filter((order) => order._id !== orderId));
    }
  };

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 My Orders</h2>
      {orderList.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orderList.map((order) => {
          const isPending = order.delivery === 'Pending';
          const isComplete = order.delivery === 'Complete';

          return (
            <div key={order._id} className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span><strong>Order ID:</strong> {order._id}</span>
                <span className={`badge ${order.status === 'paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {order.status}
                </span>
              </div>

              <div className="card-body">
                {isPending ? (
                  <>
                    {order.products.map((item) => (
                      <div key={item._id} className="row mb-3 align-items-center border-bottom pb-2">
                        <div className="col-md-2">
                          <img src={item.productId.imageUrl1} alt={item.productId.title} className="img-fluid rounded" />
                        </div>
                        <div className="col-md-6">
                          <h5>{item.productId.title}</h5>
                          <p className="mb-0">Quantity: {item.quantity}</p>
                          <p className="mb-0">Price: ₹{item.productId.discountPrice}</p>
                        </div>
                        <div className="col-md-4 text-end">
                          <p className="fw-bold mb-0 text-warning">
                            {order.delivery}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between mt-3">
                      <h5>Total: ₹{order.totalAmount}</h5>
                      <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>
                        Cancel Order
                      </button>
                    </div>
                  </>
                ) : isComplete ? (
                  <>
                    <table className="table table-sm table-bordered mb-3">
                      <thead className="table-light">
                        <tr>
                          <th>Image</th>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((item) => (
                          <tr key={item._id}>
                            <td style={{ width: '60px' }}>
                              <img
                                src={item.productId.imageUrl1}
                                alt={item.productId.title}
                                className="img-fluid rounded"
                              />
                            </td>
                            <td>{item.productId.title}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.productId.discountPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0"><strong>Delivery:</strong> <span className="text-success">Complete</span></h6>
                      <h6 className="mb-0"><strong>Total:</strong> ₹{order.totalAmount}</h6>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyOrders;
