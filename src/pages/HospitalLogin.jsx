import { useState } from "react";
import { api } from "../api";

export default function HospitalLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/hospital/login", form);

      localStorage.setItem("hospitalToken", data.token);
      localStorage.setItem("hospitalData", JSON.stringify(data.hospital));

      window.location.href = "/hospital/dashboard";
    } catch (err) {
      console.error("Login error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE – FULL IMAGE */}
        <div
          className="hidden md:block relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1586773860418-d37222d8fce3)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Soft overlay */}
          <div className="absolute inset-0 bg-blue-900/30"></div>

          <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Hospital<br />Management System
            </h2>
            <p className="text-white/90 max-w-sm text-lg">
              Secure access to hospital analytics, donor records, and emergency requests.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE – LOGIN FORM */}
        <div className="flex items-center justify-center px-10 py-16">
          <div className="w-full max-w-sm">

            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Hospital Login
            </h1>
            <p className="text-gray-500 mb-8">
              Sign in to access your dashboard
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-700 font-medium">
                  Hospital Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Hospital"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Login"}
              </button>

              

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
