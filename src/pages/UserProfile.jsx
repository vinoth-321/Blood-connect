import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    api.get(`/user/me/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await api.post("/user/delete", {
        userId: id,
        password,
      });

      alert(res.data.msg);
      if (res.data.msg === "Account deleted successfully") {
        navigate("/");
      }
    } catch {
      alert("Delete failed");
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Loading...
      </div>
    );

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(10,10,10,0.65), rgba(120,0,0,0.55)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT GLASS PROFILE ================= */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 text-center text-white">

          <div className="relative w-32 h-32 mx-auto">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-red-400 shadow-xl"
            />
            <span className="absolute inset-0 rounded-full ring-4 ring-red-400/30 animate-pulse"></span>
          </div>

          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-red-200 font-medium">
            🩸 {user.bloodType} Donor
          </p>
          <p className="text-sm text-white/70 mt-1">
            {user.city}, {user.state}
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <button className="px-5 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition shadow">
              Follow
            </button>
            <button className="px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition shadow">
              Message
            </button>
          </div>

          <div className="mt-6 text-left space-y-2 text-sm text-white/80">
            <p>📞 {user.phone}</p>
            <p>📍 {user.address}</p>
            <p>📮 {user.pincode}</p>
          </div>
        </div>

        {/* ================= RIGHT DETAILS ================= */}
        <div className="lg:col-span-2 space-y-6 text-white">

          {/* PERSONAL INFO */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
              <p><b>Name:</b> {user.name}</p>
              <p><b>Phone:</b> {user.phone}</p>
              <p><b>City:</b> {user.city}</p>
              <p><b>State:</b> {user.state}</p>
              <p><b>Pincode:</b> {user.pincode}</p>
            </div>
          </div>

          {/* BLOOD INFO */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
              <p><b>Blood Type:</b> {user.bloodType}</p>
              <p><b>Weight:</b> {user.weight} kg</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/profile/edit/${id}`)}
              className="flex-1 py-3 rounded-xl bg-blue-600/80 hover:bg-blue-600 transition shadow-lg"
            >
              Edit Profile
            </button>

            <button
              onClick={() => setShowDelete(true)}
              className="flex-1 py-3 rounded-xl bg-red-600/80 hover:bg-red-600 transition shadow-lg"
            >
              Delete Account
            </button>
          </div>

          {/* DELETE CONFIRM */}
          {showDelete && (
            <div className="bg-red-500/20 backdrop-blur-xl border border-red-400/40 rounded-2xl p-6 shadow-xl">
              <p className="text-red-200 mb-3 font-medium">
                Enter password to confirm deletion
              </p>

              <input
                type="password"
                className="w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleDelete}
                className="w-full mt-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition shadow"
              >
                Confirm Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
