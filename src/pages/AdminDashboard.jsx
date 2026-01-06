export default function AdminDashboard() {
  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(10,10,10,0.55), rgba(0,90,130,0.55)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-10 text-white">
        <h1 className="text-4xl font-bold">
          👋 Welcome, Admin
        </h1>
        <p className="text-white/80 mt-2">
          Manage hospitals, donors, requests, and more from one central place.
        </p>
      </div>

      {/* ================= DASHBOARD GRID ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* ================= HOSPITAL MANAGEMENT ================= */}
        <div
          onClick={() => (window.location.href = "/admin/hospitals")}
          className="cursor-pointer bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-2xl hover:bg-white/30 transition"
        >
          <div className="flex items-center space-x-4 text-white">
            <div className="p-4 bg-blue-500/30 rounded-full text-3xl shadow">
              🏥
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Hospital Management
              </h2>
              <p className="text-sm text-white/80">
                Create, view and manage hospitals.
              </p>
            </div>
          </div>
        </div>

        {/* ================= DONOR MANAGEMENT ================= */}
        <div
          onClick={() => (window.location.href = "/admin/Donors")}
          className="cursor-pointer bg-white/20 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-2xl hover:bg-white/30 transition"
        >
          <div className="flex items-center space-x-4 text-white">
            <div className="p-4 bg-red-500/30 rounded-full text-3xl shadow">
              🩸
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Donor Management
              </h2>
              <p className="text-sm text-white/80">
                Manage donors and donation records.
              </p>
            </div>
          </div>
        </div>

        {/* ================= COMING SOON ================= */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-inner flex items-center justify-center text-white/60">
          <span className="text-lg">🚀 More modules coming soon…</span>
        </div>

      </div>
    </div>
  );
}
