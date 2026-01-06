import { useState } from "react";
import { api } from "../api";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("otpEmail");

  const handleVerify = async () => {
    setError("");

    if (!otp || otp.length !== 6) {
      return setError("Please enter a valid 6-digit OTP");
    }

    try {
      setLoading(true);

      const res = await api.post("register/verify-otp", {
        email,
        otp,
      });

      alert(res.data.msg);

      // Cleanup
      localStorage.removeItem("otpEmail");

      // Redirect to login
      window.location.href = "/login";

    } catch (err) {
      setError(err?.response?.data?.msg || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        {/* OTP INPUT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            One-Time Password
          </label>

          <input
            type="text"
            value={otp}
            maxLength={6}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            className="w-full text-center text-xl tracking-widest p-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="••••••"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500">
          Didn’t receive OTP?{" "}
          <a
            href="/resend-otp"
            className="text-red-600 font-medium hover:underline"
          >
            Resend
          </a>
        </p>

      </div>
    </div>
  );
}
