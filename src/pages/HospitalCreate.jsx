import { useState, useEffect } from "react";
import { api } from "../api";

export default function HospitalCreate() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    latitude: null,
    longitude: null,
  });

  const [locationError, setLocationError] = useState("");
  const [locationStatus, setLocationStatus] = useState("Detecting location...");

  /* =========================
     📍 GET HOSPITAL LOCATION
  ========================= */
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      setLocationStatus("❌ Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLocationStatus("✅ Location detected");
      },
      () => {
        setLocationError("Location permission is required");
        setLocationStatus("❌ Location permission denied");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.latitude || !form.longitude) {
      return alert("Hospital location not detected");
    }

    try {
      await api.post("/hospitals/create", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      });

      alert("Hospital created successfully");
      window.location.href = "/admin/hospitals";
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-xl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create Hospital
        </h1>
        <p className="text-gray-500 mb-6">
          Register a new hospital with location for donor matching
        </p>

        {/* LOCATION STATUS */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700">
            📍 Location Status:
            <span className="ml-2 font-semibold">{locationStatus}</span>
          </p>
          {locationError && (
            <p className="text-red-600 text-sm mt-1">{locationError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Hospital Name" name="name" onChange={handleChange} />
            <Input label="Phone Number" name="phone" onChange={handleChange} />
          </div>

          {/* PASSWORDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Password" name="password" type="password" onChange={handleChange} />
            <Input label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} />
          </div>

          {/* ADDRESS */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Address Details
            </h2>

            <Input label="Street" name="street" onChange={handleChange} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input label="City" name="city" onChange={handleChange} />
              <Input label="State" name="state" onChange={handleChange} />
              <Input label="Pincode" name="pincode" onChange={handleChange} />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Create Hospital
          </button>

        </form>
      </div>
    </div>
  );
}

/* =========================
   REUSABLE INPUT
========================= */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
