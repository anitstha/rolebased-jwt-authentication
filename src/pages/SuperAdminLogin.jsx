import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react"; // Icons for better UX

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://91.108.111.41:8082/api/auth/sup-admin/login",
        formData,
      );

      const data = response.data;
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("role", data.role);

        // Use a subtle success toast/feedback instead of a blocking alert if possible
        navigate("/create-schoolform");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials. Please try again.");
    } finally {
      setIsLoading(false);
      setFormData({ username: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 font-sans">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-[#111111]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-full mb-4">
              <Lock className="text-blue-500" size={28} />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Portal Access
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Super Admin authentication required
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                Email
              </label>
              <div className="relative group">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="admin_root"
                  className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-gray-200 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-gray-200 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Authorize Session"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              sochau pvt. ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
