// /admin/product.js
import { getProducts, updateProductStatus } from "@/imports/api/api";
import React, { useState, useEffect } from "react";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import styled from "styled-components";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const { token } = nookies.get({});
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole !== "admin") {
      router.push("/product");
    }
    !token && router.push("/");
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsResponse = await getProducts(token);
      setProducts(productsResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      await updateProductStatus(productId, { status: newStatus });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const handleLogout = () => {
    destroyCookie({}, "token", { path: "/" });
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div className="container mt-4">
      <BTnWrap>
        <div className="mb-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </BTnWrap>
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.status}</td>
                  <td>
                    {product.imagePath && (
                      <img
                        src={product.imagePath}
                        alt={`Product: ${product.name}`}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </td>
                  <td>
                    <select
                      value={product.status}
                      onChange={(e) =>
                        handleStatusChange(product._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p>No Data Found</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProduct;

const BTnWrap = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;
