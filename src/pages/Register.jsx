import { useState } from "react";
import { api } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";

export default function Register() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const registerUser = async () => {
    if (!form.name || !form.email || !form.password)
      return setError("All fields are required!");

    if (!/^[0-9]{10}$/.test(form.phone))
      return setError("Phone number must be exactly 10 digits");

    if (!/\S+@\S+\.\S+/.test(form.email))
      return setError("Invalid email format");

    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      const res = await api.post("/register", form);
      alert(res.data.msg);
      localStorage.setItem("otpEmail", form.email);
      window.location.href = "/verify-otp";
    } catch (error) {
      setError("Registration failed");
      console.log(error);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 px-6 py-12">

    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE — FULL IMAGE */}
        <div
          className="hidden md:flex relative"
          style={{
            backgroundImage:
              "url(https://ourbloodinstitute.org/site/assets/files/14532/blood_donation.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/55 to-pink-400/55"></div>

          {/* Text Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Donate Blood,<br />Save Lives
            </h2>
            <p className="text-white/90 text-lg max-w-sm">
              Join our blood donor community and help people when they need it the most.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="flex justify-center px-10 py-16">
          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Create Account
            </h2>
            <p className="text-gray-500 mb-10">
              Register to become a blood donor
            </p>

            <div className="space-y-5">
              <Input
                label="Full Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <Input
                label="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <Input
                label="Phone Number"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <Input
                label="Password"
                type="password"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  validatePassword(e.target.value);
                }}
              />

              <Error message={passwordError} />
              <Error message={error} />

              <Button text="Register" onClick={registerUser} />
            </div>

            <p className="text-center text-sm text-gray-600 mt-8">
              Already have an account?{" "}
              <a href="/login" className="text-red-600 font-semibold hover:underline">
                Login
              </a>
            </p>

          </div>
        </div>

      </div>
    </div>
  </div>
);

}
