import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [activeRequest, setActiveRequest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  /* ================= INIT ================= */
  useEffect(() => {
    const init = async () => {
      const userRes = await api.get(`/user/me/${userId}`);
      setUser(userRes.data);

      const active = await api.get("/donor/requests/active", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveRequest(active.data);

      const hist = await api.get("/donor/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(hist.data);

      const req = await api.get("/donor/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(req.data);

      setLoading(false);
    };
    init();
  }, []);

  const acceptRequest = async (id) => {
    await api.post(
      `/donor/requests/${id}/accept`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Request accepted. Thank you for saving lives.");
    window.location.reload();
  };

  if (!user || loading) return <p className="p-10 text-center">Loading...</p>;

  const donationCount = history.length;

  /* ================= ANALYTICS DATA ================= */
  const yearMap = {};
  history.forEach((h) => {
    const y = new Date(h.donatedAt).getFullYear();
    yearMap[y] = (yearMap[y] || 0) + 1;
  });
  const maxVal = Math.max(...Object.values(yearMap), 1);

  return (
          <div
        className="h-screen flex flex-col"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgba(241, 235, 235, 0.55), rgba(14, 135, 227, 0.55)), url('https://images.unsplash.com/photo-1615461066841-6116e61058f4')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      {/* ================= HEADER ================= */}
      <div className="bg-white/70 backdrop-blur-xl shadow px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-lg font-bold text-red-600">
            Blood Connect
          </h1>
          <p className="text-xs text-gray-500">
            Every drop matters
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate(`/profile/${userId}`)}
            className="cursor-pointer text-right"
          >
            <p className="font-semibold text-gray-800 hover:underline">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
            {user.bloodType}
          </div>

          <button
            onClick={logout}
            className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded-lg hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
     <div className="bg-white/60 backdrop-blur-xl px-6 py-3 flex gap-4 border-b">

        {["overview", "requests", "history", "analytics", "rewards"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              tab === t
                ? "bg-red-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* ================= OVERVIEW ================= */}
        {tab === "overview" && (
          <>
            <div className="grid grid-cols-4 gap-6">
              <Stat title="Donations" value={donationCount} color="red" />
              <Stat title="Lives Saved" value={donationCount * 3} color="pink" />
              <Stat title="Next Eligible" value="Feb 15" color="orange" />
              <Stat title="Member Since" value="2022" color="green" />
            </div>

            {/* ===== ACTIVE ACCEPTED REQUEST (ENHANCED ONLY) ===== */}
            {activeRequest && (
              <div
                className={`rounded-xl p-6 border shadow space-y-4 ${
                  activeRequest.urgency === "emergency"
                    ? "bg-red-50 border-red-400"
                    : "bg-green-50 border-green-400"
                }`}
              >
                <h2 className="font-bold text-lg">
                  🏥 Active Accepted Request{" "}
                  {activeRequest.urgency === "emergency" ? "🚨" : "🩸"}
                </h2>

                <p className="font-semibold">
                  🩸 {activeRequest.bloodGroup.replace("_", " ")} •{" "}
                  {activeRequest.units} units
                </p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>🏥 <b>{activeRequest.hospital?.name}</b></p>
                  <p>📞 {activeRequest.hospital?.phone}</p>
                  <p>
                    📍 {activeRequest.hospital?.address?.street},{" "}
                    {activeRequest.hospital?.address?.city},{" "}
                    {activeRequest.hospital?.address?.state} –{" "}
                    {activeRequest.hospital?.address?.pincode}
                  </p>
                </div>

                {activeRequest.hospitalLiveLocation && (
  <div className="space-y-2">
    <iframe
      title="Hospital Location"
      src={`https://www.google.com/maps?q=${encodeURIComponent(
        activeRequest.hospitalLiveLocation
      )}&output=embed`}
      className="w-full h-[250px] rounded-lg border"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    <a
      href={activeRequest.hospitalLiveLocation}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-blue-600 hover:underline"
    >
      🗺️ Open in Google Maps
    </a>
  </div>
)}

              </div>
            )}

            <div className="grid grid-cols-2 gap-6 h-[360px]">
              <ScrollCard title="Donation History">
                {history.length === 0 && (
                  <p className="text-sm text-gray-500">No donations yet</p>
                )}
                {history.map((h, i) => (
                  <Item
                    key={i}
                    text={`${h.bloodGroup} • ${h.units} units`}
                  />
                ))}
              </ScrollCard>

              <ScrollCard title="Available Requests">
                {requests.length === 0 && (
                  <p className="text-sm text-gray-500">No requests available</p>
                )}
                {requests.map((r) => (
                  <div
                    key={r._id}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >
                    <span>{r.bloodGroup.replace("_", " ")}</span>
                    <button
                      onClick={() => acceptRequest(r._id)}
                      className="text-green-600 font-semibold"
                    >
                      Accept
                    </button>
                  </div>
                ))}
              </ScrollCard>
            </div>
          </>
        )}

        {/* ================= REQUESTS TAB ================= */}
        {tab === "requests" && (
          <ScrollCard title="All Blood Requests">
            {requests.length === 0 && (
              <p className="text-sm text-gray-500">No requests available</p>
            )}
            {requests.map((r) => (
              <div
                key={r._id}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <div>
                  <p className="font-semibold">
                    {r.bloodGroup.replace("_", " ")} • {r.units} units
                  </p>
                  <p className="text-sm text-gray-500">
                    {r.hospital?.name}
                  </p>
                </div>
                <button
                  onClick={() => acceptRequest(r._id)}
                  className="text-green-600 font-semibold"
                >
                  Accept
                </button>
              </div>
            ))}
          </ScrollCard>
        )}

        {/* ================= HISTORY TAB ================= */}
        {tab === "history" && (
          <ScrollCard title="Donation History">
            {history.length === 0 && (
              <p className="text-sm text-gray-500">
                No donation history found
              </p>
            )}
            {history.map((h, i) => (
              <div key={i} className="border rounded-lg p-4">
                <p className="font-semibold">
                  {h.bloodGroup} • {h.units} units
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(h.donatedAt).toDateString()}
                </p>
              </div>
            ))}
          </ScrollCard>
        )}

        {/* ================= ANALYTICS ================= */}
        {tab === "analytics" && (
          <>
            <div className="grid grid-cols-4 gap-6">
              <Stat title="Total Volume (L)" value={(donationCount * 0.45).toFixed(2)} color="red" />
              <Stat title="Hospitals Served" value="4" color="blue" />
              <Stat title="Consistency" value="95%" color="green" />
              <Stat title="Growth" value="+20%" color="purple" />
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">Year-wise Donations</h2>
              {Object.entries(yearMap).map(([year, count]) => (
                <div key={year} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{year}</span>
                    <span>{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{ width: `${(count / maxVal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= REWARDS ================= */}
        {tab === "rewards" && (
          <div className="bg-white p-10 rounded-xl shadow space-y-6">
            <Reward title="🥉 Bronze Donor" need={3} count={donationCount} />
            <Reward title="🥈 Silver Donor" need={6} count={donationCount} />
            <Reward title="🥇 Gold Donor" need={10} count={donationCount} />
            <Reward title="💎 Platinum Hero" need={15} count={donationCount} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Stat = ({ title, value, color }) => (
  <div className={`bg-white/1 backdrop-blur-xl border-l-4 border-${color}-600 p-6 rounded-xl shadow`}>
    <p className="text-sm text-gray100">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);


const ScrollCard = ({ title, children }) => (
  <div className="bg-white/50 backdrop-blur-xl rounded-xl shadow flex flex-col h-full">
    <h2 className="p-4 font-bold border-b border-white/40">{title}</h2>
    <div className="p-4 space-y-3 overflow-y-auto">{children}</div>
  </div>
);


const Item = ({ text }) => (
  <div className="border rounded-lg p-3">{text}</div>
);

const Reward = ({ title, need, count }) => {
  const percent = Math.min((count / need) * 100, 100);
  return (
    <div className="border rounded-xl p-6">
      <p className="font-bold">{title}</p>
      <div className="bg-white/70 backdrop-blur-xl p-10 rounded-xl shadow space-y-6">

        <div
          className="bg-yellow-400 h-3 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm mt-2">
        {count >= need
          ? "Unlocked"
          : `${need - count} more donations needed`}
      </p>
    </div>
  );
};
