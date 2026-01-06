import { Link } from "react-router-dom";
import { Droplet, HeartPulse, User, Building2 } from "lucide-react";
import Card from "../components/card";
import IconCircle from "../components/IconCircle";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 overflow-hidden">

      {/* ================= TOP DECORATIVE GLOW ================= */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[520px] h-[520px]
          bg-red-300 rounded-full
          blur-[140px] opacity-40
          z-0 pointer-events-none
        "
      />

      {/* ================= HEADER ================= */}
      <header className="px-8 py-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-full">
              <Droplet className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-xl font-semibold text-red-600">
              BloodConnect
            </h1>
          </div>

          {/* TOP ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              User Login
            </Link>

            <Link
              to="/hospital/login"
              className="px-4 py-2 text-sm rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Hospital Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main className="max-w-7xl mx-auto px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN */}
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm">
              <HeartPulse className="w-4 h-4" />
              Save Lives, Donate Blood
            </div>

            <h2 className="mt-6 text-5xl font-extrabold text-gray-900">
              Every Drop <span className="text-red-600">Counts</span>
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              Join our community of heroes. Connect donors with those in need
              and make a difference today.
            </p>

            {/* LOGIN CARDS */}
            <div className="mt-10">
              <h3 className="font-medium text-gray-800 mb-4">
                Login as:
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 max-w-xl">

                <Card className="p-6">
                  <IconCircle bg="bg-red-100">
                    <User className="w-6 h-6 text-red-600" />
                  </IconCircle>

                  <h4 className="mt-4 font-semibold text-gray-900">
                    Blood Donor
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    Login to manage your donation history
                  </p>

                  <Link
                    to="/login"
                    className="block mt-4 text-center bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                  >
                    Donor Login
                  </Link>
                </Card>

                <Card className="p-6">
                  <IconCircle bg="bg-blue-100">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </IconCircle>

                  <h4 className="mt-4 font-semibold text-gray-900">
                    Hospital
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    Login to request blood donations
                  </p>

                  <Link
                    to="/hospital/login"
                    className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Hospital Login
                  </Link>
                </Card>
              </div>
            </div>

            {/* REGISTER CTA */}
            <div className="mt-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white max-w-xl">
              <h3 className="text-xl font-semibold">
                New to BloodConnect?
              </h3>

              <p className="mt-2">
                Create an account and join thousands of donors making
                a difference in their communities.
              </p>

              <Link
                to="/register"
                className="inline-block mt-4 bg-white text-red-600 px-6 py-2 rounded-md hover:bg-gray-100"
              >
                Register Now
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-3 gap-10 pt-6 border-t max-w-xl">
              <div>
                <div className="text-3xl font-bold text-red-600">10K+</div>
                <p className="text-sm text-gray-600">Active Donors</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">500+</div>
                <p className="text-sm text-gray-600">Hospitals</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">25K+</div>
                <p className="text-sm text-gray-600">Lives Saved</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-xl">
              <img
                src="https://images.unsplash.com/photo-1697192156499-d85cfe1452c0"
                alt="Blood donation"
                className="w-full h-[460px] object-cover rounded-3xl shadow-2xl"
              />

              <Card className="absolute bottom-6 left-6 p-4 flex items-center gap-3 shadow-lg">
                <IconCircle bg="bg-red-100">
                  <Droplet className="w-5 h-5 text-red-600 fill-red-600" />
                </IconCircle>

                <div>
                  <div className="font-semibold text-lg">A+</div>
                  <div className="text-sm text-gray-500">
                    Blood Type Available
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* ================= FEATURES (RESTORED) ================= */}
        <section className="mt-32 text-center">
          <h3 className="text-3xl font-bold text-gray-900">
            Why Choose BloodConnect?
          </h3>
          <p className="text-gray-600 mt-2">
            Making blood donation simple, safe, and impactful
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <IconCircle bg="bg-red-100" className="mx-auto">
                <HeartPulse className="w-6 h-6 text-red-600" />
              </IconCircle>
              <h4 className="mt-4 font-semibold">Real-time Matching</h4>
              <p className="text-sm text-gray-600 mt-2">
                Instantly connect with hospitals and recipients
              </p>
            </Card>

            <Card className="p-8">
              <IconCircle bg="bg-blue-100" className="mx-auto">
                <Building2 className="w-6 h-6 text-blue-600" />
              </IconCircle>
              <h4 className="mt-4 font-semibold">Verified Hospitals</h4>
              <p className="text-sm text-gray-600 mt-2">
                All partner hospitals are verified and certified
              </p>
            </Card>

            <Card className="p-8">
              <IconCircle bg="bg-green-100" className="mx-auto">
                <User className="w-6 h-6 text-green-600" />
              </IconCircle>
              <h4 className="mt-4 font-semibold">Track Your Impact</h4>
              <p className="text-sm text-gray-600 mt-2">
                Monitor your donation history and see lives saved
              </p>
            </Card>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mt-24 py-6 border-t text-center text-sm text-gray-500 relative z-10">
        © 2025 BloodConnect. Saving lives, one donation at a time.
      </footer>
    </div>
  );
}
