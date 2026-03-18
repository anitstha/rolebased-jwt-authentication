import React, { useState } from "react";
import axios from "axios";
import { UserPlus, ArrowLeft, ShieldCheck, School } from "lucide-react";

const CreateSchoolAdmin = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    schoolId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 

    try {
      const response = await axios.post(
        "http://91.108.111.41:8082/api/super-admin/create/school-admin",
        formData,
        {
          headers: {
            // Verify if your backend requires the 'Bearer ' prefix
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error("Full Error Object:", error.response);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create School Admin</h2>
              <p className="text-blue-100 text-xs">
                Register a new administrator for a specific school
              </p>
            </div>
          </div>
          <button className="text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="fullname"
                placeholder="Anit Shrestha"
                className="w-full bg-[#1a1a1a] border border-white/5 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all pl-11"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
              <ShieldCheck
                className="absolute left-4 top-3.5 text-gray-600"
                size={18}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="admin_anit"
              className="w-full bg-[#1a1a1a] border border-white/5 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-300"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full bg-[#1a1a1a] border border-white/5 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              School ID
            </label>
            <div className="relative">
              <input
                type="text"
                name="schoolId"
                placeholder="SCH-2024-001"
                className="w-full bg-[#1a1a1a] border border-white/5 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all pl-11"
                value={formData.schoolId}
                onChange={handleChange}
                required
              />
              <School
                className="absolute left-4 top-3.5 text-gray-600"
                size={18}
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-blue-500/20 active:scale-[0.99]"
            >
              {loading ? "Registering..." : "Register Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSchoolAdmin;
