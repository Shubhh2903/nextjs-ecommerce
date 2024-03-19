export const signUp = async (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/api/auth/signup", fetchOptions);
  if (response.status !== 201) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};

export const login = async (data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch("/api/auth/login", fetchOptions);
  if (response.status !== 200) {
    const err = await response.json();
    return err;
  }
  return response.json();
};

export const addProduct = async (formData, token) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const response = await fetch("/api/addProduct", fetchOptions);
  if (response.status !== 201) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};

export const getProducts = async (token) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/api/getProduct", fetchOptions);
  if (response.status !== 200) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};

export const updateOrderStatus = async (orderID, data) => {
  const fetchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`/api/order/${orderID}`, fetchOptions);
  if (response.status !== 200) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};

export const PlaceOrderAPI = async (token, data) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`/api/placeOrder`, fetchOptions);
  if (response.status !== 200) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};

export const getOrdersAPI = async (token) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/api/getOrder", fetchOptions);
  if (response.status !== 200) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};

export const getAllOrdersAPI = async () => {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/api/admin/getAllOrder", fetchOptions);
  if (response.status !== 200) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};

export const DeleteProduct = async (data) => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: data }),
  };

  const response = await fetch(`/api/admin/deleteProduct`, fetchOptions);
  if (response.status !== 200) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};
