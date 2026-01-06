import { useState } from "react";
import { api } from "../api";

const BLOOD_GROUPS = [
  { value: "A_Positive", label: "A+" },
  { value: "A_Negative", label: "A-" },
  { value: "B_Positive", label: "B+" },
  { value: "B_Negative", label: "B-" },
  { value: "AB_Positive", label: "AB+" },
  { value: "AB_Negative", label: "AB-" },
  { value: "O_Positive", label: "O+" },
  { value: "O_Negative", label: "O-" },
];

export default function HospitalCreateRequest() {
  const [form, setForm] = useState({
    bloodGroup: "",
    units: 1,
    urgency: "normal",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("hospitalToken");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ============================
     📍 CREATE REQUEST + LOCATION
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // 🔗 GOOGLE MAPS LINK (WhatsApp-style)
          const hospitalLiveLocation = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;

          await api.post(
            "/blood-requests/",
            {
              ...form,
              hospitalLiveLocation, // ✅ SEND LOCATION LINK
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Blood request created successfully");
          window.location.href = "/hospital/dashboard";
        } catch (err) {
          alert(
            err?.response?.data?.message ||
              "Failed to create blood request"
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location permission is required to create request");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Blood Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Blood Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Blood Group</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg.value} value={bg.value}>
                  {bg.label}
                </option>
              ))}
            </select>
          </div>

          {/* Units */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Units Required
            </label>
            <input
              type="number"
              name="units"
              min="1"
              value={form.units}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Urgency
            </label>
            <select
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="normal">Normal</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Creating..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
