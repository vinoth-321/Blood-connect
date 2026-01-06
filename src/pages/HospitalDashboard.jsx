import { useEffect, useState } from "react";
import { api } from "../api";

/* ================= BLOOD GROUP CONFIG ================= */
const BLOOD_GROUPS = [
  { key: "A_Positive", label: "A+" },
  { key: "A_Negative", label: "A-" },
  { key: "B_Positive", label: "B+" },
  { key: "B_Negative", label: "B-" },
  { key: "AB_Positive", label: "AB+" },
  { key: "AB_Negative", label: "AB-" },
  { key: "O_Positive", label: "O+" },
  { key: "O_Negative", label: "O-" },
];

export default function HospitalDashboard() {
  const token = localStorage.getItem("hospitalToken");

  const [hospital, setHospital] = useState(null);
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState("home");

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const dash = await api.get("/hospital/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const req = await api.get("/blood-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHospital(dash.data.hospital || dash.data);
      setRequests(req.data);
    } catch {
      alert("Session expired");
      logout();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    window.location.href = "/hospital/login";
  };

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard…
      </div>
    );
  }

  /* ================= FILTERS ================= */
  const unaccepted = requests.filter(
    r => r.status === "pending" || r.status === "searching"
  );
  const accepted = requests.filter(r => r.status === "accepted");

  /* ================= MAP ================= */
  const getMapLink = donor => {
    if (!donor?.location?.coordinates) return null;
    const [lng, lat] = donor.location.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  /* ================= ACTIONS ================= */
  const deleteRequest = async id => {
    if (!window.confirm("Delete this request?")) return;
    await api.delete(`/blood-requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const completeRequest = async id => {
    if (!window.confirm("Mark donation completed?")) return;
    await api.post(
      `/donor/requests/${id}/complete`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ================= TOP BAR ================= */}
      <header className="h-16 bg-white/90 backdrop-blur shadow flex items-center justify-between px-6 sticky top-0 z-20">
        <div>
          <h1 className="text-xl font-bold text-red-600">
            🏥 {hospital.name}
          </h1>
          <p className="text-xs text-gray-500">
            {hospital.email} • {hospital.address?.city}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.href = "/hospital/profile")}
            className="px-4 py-1.5 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            👤 Profile
          </button>

          <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
            {hospital.name[0]}
          </div>

          <button
            onClick={logout}
            className="px-4 py-1.5 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="flex flex-1">

        {/* ================= SIDEBAR ================= */}
        <aside className="w-56 bg-white/85 backdrop-blur border-r p-4 space-y-2 sticky top-16 h-[calc(100vh-4rem)]">
          <button
            onClick={() => setPage("home")}
            className={`w-full px-4 py-2 rounded-lg text-left transition ${
              page === "home"
                ? "bg-red-600 text-white shadow"
                : "hover:bg-gray-100"
            }`}
          >
            🏠 Home
          </button>

          <button
            onClick={() => setPage("requests")}
            className={`w-full px-4 py-2 rounded-lg text-left transition ${
              page === "requests"
                ? "bg-red-600 text-white shadow"
                : "hover:bg-gray-100"
            }`}
          >
            📋 Requests
          </button>

          <button
            onClick={() => (window.location.href = "/hospital/profile")}
            className="w-full px-4 py-2 rounded-lg text-left hover:bg-gray-100 transition"
          >
            👤 Profile
          </button>
        </aside>

        {/* ================= CONTENT ================= */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">

          {/* ================= HOME ================= */}
          {page === "home" && (
            <>
              {/* TOP GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* BLOOD STOCK */}
                <div className="bg-white/85 backdrop-blur rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">🩸 Blood Stock</h2>
                    <button
                      onClick={() =>
                        (window.location.href = "/hospital/stock")
                      }
                      className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full shadow hover:scale-105 transition"
                    >
                      ✏️ Edit Stock
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {BLOOD_GROUPS.map(bg => {
                      const units = hospital.bloodStock?.[bg.key] || 0;
                      const color =
                        units < 5
                          ? "bg-red-100 text-red-700"
                          : units < 10
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700";

                      return (
                        <div
                          key={bg.key}
                          className={`${color} rounded-xl p-4 text-center shadow hover:scale-105 transition`}
                        >
                          <p className="font-bold text-lg">{bg.label}</p>
                          <p className="text-2xl font-extrabold">{units}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* UNACCEPTED */}
                <div className="bg-white/85 backdrop-blur rounded-2xl shadow-lg p-6">
                  <h2 className="font-semibold mb-3">
                    🔍 Searching Requests
                  </h2>

                  <div className="max-h-[260px] overflow-y-auto space-y-3 pr-2">
                    {unaccepted.length === 0 && (
                      <p className="text-gray-500 text-sm">
                        No active searching requests
                      </p>
                    )}

                    {unaccepted.map(req => (
                      <div
                        key={req._id}
                        className="border-l-4 border-red-500 bg-red-50 p-3 rounded-lg"
                      >
                        <p className="font-semibold">
                          {req.bloodGroup.replace("_", " ")} • {req.units} units
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(req.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACCEPTED */}
              <div className="bg-white/85 backdrop-blur rounded-2xl shadow-lg p-6">
                <h2 className="font-semibold mb-4">
                  ✅ Accepted Donations
                </h2>

                <div className="max-h-[320px] overflow-y-auto space-y-4 pr-2">
                  {accepted.length === 0 && (
                    <p className="text-gray-500 text-sm">
                      No accepted donations yet
                    </p>
                  )}

                  {accepted.map(req => (
                    <div
                      key={req._id}
                      className="bg-green-50 border border-green-200 rounded-xl p-4"
                    >
                      <p className="font-semibold">
                        {req.bloodGroup.replace("_", " ")} • {req.units}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p><b>Donor:</b> {req.acceptedDonor?.name}</p>
                          <p className="text-sm">
                            📞 {req.acceptedDonor?.phone}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {getMapLink(req.acceptedDonor) && (
                            <a
                              href={getMapLink(req.acceptedDonor)}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full shadow hover:scale-105 transition"
                            >
                              📍 Track
                            </a>
                          )}

                          <button
                            onClick={() => completeRequest(req._id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow hover:scale-105 transition"
                          >
                            ✔ Complete
                          </button>

                          <button
                            onClick={() => deleteRequest(req._id)}
                            className="px-4 py-2 border border-red-400 text-red-600 rounded-full hover:bg-red-50 transition"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ================= REQUESTS PAGE ================= */}
          {page === "requests" && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📋 All Requests</h2>
                <button
                  onClick={() =>
                    (window.location.href = "/hospital/requests/create")
                  }
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow hover:scale-105 transition"
                >
                  + Create Request
                </button>
              </div>

              {requests.map(req => (
                <div
                  key={req._id}
                  className="bg-white/85 backdrop-blur p-6 rounded-xl shadow space-y-3"
                >
                  <div className="flex justify-between">
                    <p className="font-semibold">
                      {req.bloodGroup.replace("_", " ")} • {req.units}
                    </p>
                    <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                      {req.status}
                    </span>
                  </div>

                  <div className="flex justify-end gap-3">
                    {req.status === "accepted" && (
                      <button
                        onClick={() => completeRequest(req._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-full"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => deleteRequest(req._id)}
                      className="px-4 py-2 border border-red-400 text-red-600 rounded-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
