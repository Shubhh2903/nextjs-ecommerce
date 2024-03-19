import React, { useEffect, useState } from "react";
import { PlaceOrderAPI, getOrdersAPI, getProducts } from "../api/api";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import styled from "styled-components";

function ProductForm() {
  const { token } = nookies.get({});
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [myOrder, setMyOrder] = useState([]);
  const [field, setField] = useState({
    qty: "",
  });

  const handleChange = (productId, value) => {
    setField((prevField) => ({
      ...prevField,
      qty: {
        ...prevField.qty,
        [productId]: value,
      },
    }));
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

  const handleLogout = () => {
    destroyCookie({}, "token", { path: "/" });
    localStorage.removeItem("role");
    router.push("/");
  };

  const getAllOrder = async () => {
    const resp = await getOrdersAPI(token);
    setMyOrder(resp);
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleAddToCart = (product) => async () => {
    const allData = {
      productId: product._id,
      quantity: field.qty[product._id] || 0,
    };
    await PlaceOrderAPI(token, allData);
    getAllOrder();
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
      <div className="mt-5">
        <h2>Product List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
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
                  <Wrap>
                    <Input
                      type="number"
                      value={field.qty[product._id] || 0}
                      onChange={(e) =>
                        handleChange(product._id, e.target.value)
                      }
                    />
                    <AddToCartBtn onClick={handleAddToCart(product)}>
                      Add to cart
                    </AddToCartBtn>
                  </Wrap>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h2>My Order List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>quantity</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {myOrder?.orders?.map((item) => (
              <tr key={item.product._id}>
                <td>{item.product.name}</td>
                <td>{item.product.description}</td>
                <td>{item.product.quantity}</td>

                <td>{item.status}</td>
                <td>
                  {item.product.imagePath && (
                    <img
                      src={item.product.imagePath}
                      alt={`item: ${item.product.name}`}
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

const AddToCartBtn = styled.div`
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
`;

const Wrap = styled.div`
  gap: 10px;
  display: flex;
`;

const BTnWrap = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

const Input = styled.input`
  max-width: 50px;
  width: 100%;
`;
