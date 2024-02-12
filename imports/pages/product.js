import React, { useEffect, useState } from "react";
import { addProduct, getProducts } from "../api/api";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import styled from "styled-components";
function ProductForm() {
  const { token } = nookies.get({});
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    description: "",
    productImage: null,
  });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("status", "pending");
    if (formData.productImage) {
      formDataToSend.append("productImage", formData.productImage);
    }

    try {
      const response = await addProduct(formDataToSend, token);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsResponse = await getProducts(token);
      setProducts(productsResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  const handleLogout = () => {
    destroyCookie({}, "token", { path: "/" });
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div className="container mt-5">
      <BTnWrap>
        <div className="mb-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </BTnWrap>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            name="productImage"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>
      <div className="mt-5">
        <h2>Product List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductForm;

const BTnWrap = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;
