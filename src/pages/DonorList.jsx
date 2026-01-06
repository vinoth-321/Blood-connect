import { useEffect, useState } from "react";
import { api } from "../api";

export default function DonorList() {
  const [Donors, setDonors] = useState([]);

  useEffect(() => {
    api
      .get("user/donors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
      .then((res) => setDonors(res.data));
  }, []);

  return (
    <div
      className="min-h-screen px-8 py-10"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(10,10,10,0.55), rgba(120,0,0,0.55)), url('https://images.unsplash.com/photo-1615461066841-6116e61058f4')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-10 text-white">
        <h1 className="text-4xl font-bold">🩸 Donors</h1>
        <p className="text-white/80 mt-2">
          View and manage registered blood donors
        </p>
      </div>

      {/* ================= DONOR CARDS ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Donors.map((h) => (
          <div
            key={h._id}
            onClick={() =>
              (window.location.href = `/admin/Donors/${h._id}`)
            }
            className="cursor-pointer bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-2xl hover:bg-white/30 transition text-white"
          >
            <h2 className="text-xl font-semibold">{h.name}</h2>
            <p className="text-white/80 mt-1">📞 {h.phone}</p>

            <p className="text-white/90 mt-2">
              🩸 Blood Group:{" "}
              <span className="font-bold text-red-300">
                {h.bloodType}
              </span>
            </p>

            <p className="text-white/60 text-sm mt-2">
              🎂 DOB: {new Date(h.dob).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
