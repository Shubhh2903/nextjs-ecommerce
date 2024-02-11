import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
const LoginForm = () => {
  const router = useRouter();

  const handleSignup = () => router.push("/signup");
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3 text-center">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-3 text-center">
            <p>
              Don't have an account? <Span onClick={handleSignup}>Sign Up</Span>
            </p>{" "}
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

const Span = styled.span`
  color: #0b5ed7;
  cursor: pointer;
`;
