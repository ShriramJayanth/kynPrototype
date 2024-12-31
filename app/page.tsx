"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  dotenv.config();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://172.31.14.4:3003/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert("User created successfully!");
        setIsRegistering(false); // Switch to login form
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://172.31.14.4:3003/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Login successful!");
        router.push("/home"); // Redirect to home page
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          {isRegistering ? "Register" : "Login"}
        </h1>

        {isRegistering ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Login
            </button>
          </form>
        )}

        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
