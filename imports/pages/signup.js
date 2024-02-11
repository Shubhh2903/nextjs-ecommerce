import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { signUp } from "../api/api";
import { setCookie } from "nookies";

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleLogin = () => router.push("/");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const data = await signUp(formData);
    console.log("data", data);
    setCookie(null, "token", data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    router.push("/product");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3 text-center">Sign Up</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
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
            Already Have an account? <Span onClick={handleLogin}>Login</Span>
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

export default SignUpForm;

const Span = styled.span`
  color: #0b5ed7;
  cursor: pointer;
`;
