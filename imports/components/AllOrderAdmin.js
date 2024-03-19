import React, { useEffect, useState } from "react";
import { updateOrderStatus } from "../api/api";

const AllOrderAdmin = ({ data }) => {
  const [updatedOrders, setUpdatedOrders] = useState([]);

  useEffect(() => {
    if (data && data.orders) {
      setUpdatedOrders(data.orders);
    }
  }, [data]);

  const handleStatusChange = async (orderID, newStatus) => {
    const response = await updateOrderStatus(orderID, { status: newStatus });
    const newOrders = updatedOrders.map((order) =>
      order._id === orderID
        ? { ...order, status: response.product.status }
        : order
    );
    setUpdatedOrders(newOrders);
  };

  return (
    <div className="mt-5">
      <h2>All Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>quantity</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {updatedOrders?.map((item) => (
            <tr key={item.product._id}>
              <td>{item.product.name}</td>
              <td>{item.product.description}</td>
              <td>{item.product.quantity}</td>
              <td>
                {item.product.imagePath && (
                  <img
                    src={item.product.imagePath}
                    alt={`item: ${item.product.name}`}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrderAdmin;
