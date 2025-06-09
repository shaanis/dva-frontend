import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdminApi } from "./services/allApi";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!data.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Email is invalid";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const result = await loginAdminApi(data);
      if (result.status >= 200 && result.status < 300) {
        localStorage.setItem("token", result.data.token);
        navigate("/dashboard");
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (e) {
      setLoginError("Login failed. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and clear the specific error for that input
  const handleChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });

    // Clear error message for the field as user types
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Also clear loginError when typing
    if (loginError) setLoginError("");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#121212] p-8 rounded-xl shadow-xl border border-[#333]">
        <h2 className="text-3xl font-semibold text-[#F5DEB3] text-center mb-6">
          Admin Login
        </h2>
        <form className="space-y-6" onSubmit={handleLogin} noValidate>
          <div>
            <label className="block text-sm font-medium text-[#F5DEB3] mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={handleChange("email")}
              value={data.email}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 bg-[#1a1a1a] border rounded-md text-white focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-[#F5DEB3]"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5DEB3] mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange("password")}
              value={data.password}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 bg-[#1a1a1a] border rounded-md text-white focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-[#F5DEB3]"
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {loginError && (
            <p className="text-red-500 text-center mb-3">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-transparent text-[#F5DEB3] border border-[#F5DEB3] rounded-md hover:bg-[#F5DEB3] hover:text-black transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-[#F5DEB3]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
