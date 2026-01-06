import { useEffect, useState } from "react";
import { api } from "../api";

export default function HospitalProfile() {
  const [hospital, setHospital] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("hospitalToken");

    api
      .get("/hospital/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHospital(res.data);
        setForm({
          phone: res.data.phone,
          street: res.data.address.street,
          city: res.data.address.city,
          state: res.data.address.state,
          pincode: res.data.address.pincode,
        });
      })
      .catch(() => {
        alert("Session expired");
        window.location.href = "/hospital/login";
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const token = localStorage.getItem("hospitalToken");

    try {
      await api.put("/hospital/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully");
      setEdit(false);
      window.location.reload();
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  if (!hospital) return null;

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(10,10,10,0.65), rgba(0,80,120,0.55)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT GLASS PROFILE ================= */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 text-center text-white">

          <div className="relative w-32 h-32 mx-auto">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2967/2967350.png"
              alt="Hospital"
              className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-xl bg-white"
            />
            <span className="absolute inset-0 rounded-full ring-4 ring-blue-400/30 animate-pulse"></span>
          </div>

          <h2 className="mt-4 text-2xl font-bold">{hospital.name}</h2>
          <p className="text-blue-200 font-medium">🏥 Registered Hospital</p>

          <div className="mt-6 text-left space-y-2 text-sm text-white/80">
            <p>📞 {hospital.phone}</p>
            <p>
              📍 {hospital.address.street}, {hospital.address.city}
            </p>
            <p>📮 {hospital.address.pincode}</p>
          </div>

          <button
            onClick={() => setEdit(!edit)}
            className="mt-6 w-full py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 transition shadow-lg"
          >
            {edit ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>

        {/* ================= RIGHT DETAILS ================= */}
        <div className="lg:col-span-2 space-y-6 text-white">

          {/* CONTACT INFO */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

            <div className="space-y-4 text-sm">
              <div>
                <label className="text-white/70">Phone Number</label>
                {edit ? (
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="mt-1">{hospital.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* ADDRESS INFO */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Address Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {["street", "city", "state", "pincode"].map((field) => (
                <div key={field}>
                  <label className="capitalize text-white/70">{field}</label>
                  {edit ? (
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  ) : (
                    <p className="mt-1">{hospital.address[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SAVE BUTTON */}
          {edit && (
            <button
              onClick={handleUpdate}
              className="w-full py-3 rounded-xl bg-green-600/80 hover:bg-green-600 transition shadow-lg"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
