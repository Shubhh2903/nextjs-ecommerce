import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../api/api";
import { setCookie } from "nookies";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = await login(formData);
      if (data.message === "Login successful" && data.user?.role) {
        localStorage.setItem("role", data.user.role);
        setCookie(null, "token", data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        if (data.user.role === "admin") {
          router.push("/admin/product");
        } else {
          router.push("/product");
        }
      } else {
        console.error("Unexpected response or missing user role:", data);
        alert("Login failed. Please try again later.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please try again later.");
    }
  };

  const handleSignup = () => router.push("/signup");

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3 text-center">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formData.email}
            required="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>
        <div className="mb-3 text-center">
          <p>
            Don't have an account? <Span onClick={handleSignup}>Sign Up</Span>
          </p>{" "}
        </div>
        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

const Span = styled.span`
  color: #0b5ed7;
  cursor: pointer;
`;
