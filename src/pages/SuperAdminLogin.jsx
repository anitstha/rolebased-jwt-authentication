import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Add your auth logic here
    try {
      const response = await axios.post(
        "http://91.108.111.41:8082/api/auth/sup-admin/login",
        formData,
      );
      const data = response.data;
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("role", data.role);
      }
      alert("Login Successful..");

      //navigate to create school admin dashboard page after login sucess
      navigate("/createschooladmin");
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }

    // clear form data
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Super Admin</h1>
          <p className="text-gray-500 text-sm">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="admin_root"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-400 uppercase tracking-widest">
          Secure Access Only
        </p>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
