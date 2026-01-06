import { useState } from "react";
import { api } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    setError("");
    if (!form.email || !form.password) {
      return setError("Both fields are required");
    }

    try {
      setLoading(true);

      const res = await api.post("/login", form);

      if (!res.data.token) {
        return setError(res.data.msg || "Login failed");
      }

      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.userId);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            try {
              await api.put(
                "/location",
                {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
            } catch {
              console.warn("Location update failed");
            }
          },
          () => {
            console.warn("User denied location");
          }
        );
      }
    const navigate = useNavigate();
     navigate(
      res.data.profileCompleted ? "/home" : "/complete-profile"
    );

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 px-6 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE — FULL IMAGE */}
        <div
          className="hidden md:block relative"
          style={{
            backgroundImage:
              "url(https://www.goodnet.org/photos/620x0/26772_hd.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/45 to-pink-300/55"></div>

          <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Welcome Back,<br />Life Saver
            </h2>
            <p className="text-white/90 max-w-sm text-lg">
              Login to manage your donor profile and help save lives.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — LOGIN FORM */}
        <div className="flex items-center justify-center px-10 py-16">
          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Donor Login
            </h2>
            <p className="text-gray-500 mb-8">
              Sign in to your donor account
            </p>

            <div className="space-y-5">
              <Input
                label="Email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <Input
                label="Password"
                type="password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <Error message={error} />

              <Button
                text={loading ? "Logging in..." : "Login"}
                onClick={loginUser}
                disabled={loading}
              />
            </div>

            <p className="text-center text-sm text-gray-600 mt-8">
              New donor?{" "}
              <Link
                to="/register"
                className="text-red-600 font-semibold hover:underline"
              >
                Register
              </Link>

            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
