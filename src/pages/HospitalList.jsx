import { useEffect, useState } from "react";
import { api } from "../api";

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    api
      .get("/hospitals", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
      .then((res) => setHospitals(res.data));
  }, []);

  return (
    <div
      className="min-h-screen px-8 py-10"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(10,10,10,0.55), rgba(0,90,130,0.55)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10 text-white">
        <h1 className="text-4xl font-bold">🏥 Hospitals</h1>

        <button
          onClick={() => (window.location.href = "/admin/hospitals/create")}
          className="px-6 py-3 bg-blue-600/80 hover:bg-blue-600 text-white rounded-xl shadow-lg transition"
        >
          + Create Hospital
        </button>
      </div>

      {/* ================= HOSPITAL CARDS ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((h) => (
          <div
            key={h._id}
            onClick={() =>
              (window.location.href = `/admin/hospitals/${h._id}`)
            }
            className="cursor-pointer bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-2xl hover:bg-white/30 transition text-white"
          >
            <h2 className="text-xl font-semibold">{h.name}</h2>
            <p className="text-white/80 mt-1">📞 {h.phone}</p>

            <p className="text-white/90 mt-2">
              📍 {h.address.city}, {h.address.state}
            </p>

            <p className="text-white/60 text-sm mt-2">
              Created on:{" "}
              {new Date(h.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
