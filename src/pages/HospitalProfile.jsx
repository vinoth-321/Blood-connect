import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function HospitalProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    api
      .get(`hospitals/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
      .then((res) => setHospital(res.data));
  }, [id]);

  if (!hospital)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );

  const deleteHospital = async () => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;

    await api.delete(`hospitals/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });

    alert("Hospital deleted");
    navigate("/admin/hospitals");
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(10,10,10,0.55), rgba(0,90,130,0.55)), url('https://images.unsplash.com/photo-1587351021759-3e566b6af7cc')",
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
            onClick={deleteHospital}
            className="mt-6 w-full py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition shadow-lg"
          >
            Delete Hospital
          </button>
        </div>

        {/* ================= RIGHT DETAILS ================= */}
        <div className="lg:col-span-2 space-y-6 text-white">

          {/* ADDRESS INFO */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Address Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
              <p><b>Street:</b> {hospital.address.street}</p>
              <p><b>City:</b> {hospital.address.city}</p>
              <p><b>State:</b> {hospital.address.state}</p>
              <p><b>Pincode:</b> {hospital.address.pincode}</p>
            </div>
          </div>

          {/* BLOOD STOCK */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Stock</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(hospital.bloodStock || {}).map(
                ([group, units]) => (
                  <div
                    key={group}
                    className="bg-white/20 border border-white/30 rounded-xl p-4 text-center shadow"
                  >
                    <p className="font-semibold">{group}</p>
                    <p className="text-xl font-bold text-red-300">
                      {units}
                    </p>
                    <p className="text-xs text-white/70">Units</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
