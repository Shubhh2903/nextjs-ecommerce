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
