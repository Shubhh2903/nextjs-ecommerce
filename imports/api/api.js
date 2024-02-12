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

export const updateProductStatus = async (productId, data) => {
  const fetchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`/api/products/${productId}`, fetchOptions);
  if (response.status !== 200) {
    const err = await response.text();
    throw new Error(err);
  }
  return response.json();
};
