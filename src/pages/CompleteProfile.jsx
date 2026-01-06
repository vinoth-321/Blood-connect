import { useState } from "react";
import { api } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";

const BLOOD_MAP = {
  "A+": "A_Positive",
  "A-": "A_Negative",
  "B+": "B_Positive",
  "B-": "B_Negative",
  "AB+": "AB_Positive",
  "AB-": "AB_Negative",
  "O+": "O_Positive",
  "O-": "O_Negative",
};

export default function CompleteProfile() {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    bloodType: "",
    weight: "",
    dob: "",
  });

  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const [liveWeightError, setLiveWeightError] = useState("");

  /* ================= LOGIC (UNCHANGED) ================= */

  const calculateAge = (dob) => {
    if (!dob) return;
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    setAge(currentYear - birthYear);
  };

  const validateWeight = (value) => {
    if (Number(value) < 50) {
      setLiveWeightError("Minimum weight required is 50 kg.");
    } else {
      setLiveWeightError("");
    }
  };

  const submitProfile = async () => {
    setError("");

    if (
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode ||
      !form.bloodType ||
      !form.weight ||
      !form.dob
    ) {
      return setError("All fields are required!");
    }

    if (age < 18) {
      return setError("You must be at least 18 years old to donate blood.");
    }

    if (Number(form.weight) < 50) {
      return setError("Weight must be at least 50 kg to donate blood.");
    }

    try {
      const res = await api.post(
        "/profile/complete",
        {
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          bloodType: BLOOD_MAP[form.bloodType],
          weight: form.weight,
          dob: form.dob,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.msg);
      window.location.href = "/home";
    } catch {
      setError("Profile update failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, rgba(10,10,10,0.55), rgba(120,0,0,0.55)), url('https://images.unsplash.com/photo-1615461066841-6116e61058f4')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-10 space-y-8">

        {/* ================= HEADER ================= */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-red-600">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Help us verify your eligibility to donate blood safely
          </p>
        </div>

        {/* ================= ADDRESS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Address"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
          <Input
            label="City"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <Input
            label="State"
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />
          <Input
            label="Pincode"
            onChange={(e) =>
              setForm({ ...form, pincode: e.target.value })
            }
          />
        </div>

        {/* ================= BLOOD + HEALTH ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BLOOD TYPE */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Blood Group
            </label>
            <select
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setForm({ ...form, bloodType: e.target.value })
              }
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          {/* WEIGHT */}
          <Input
            label="Weight (kg)"
            onChange={(e) => {
              setForm({ ...form, weight: e.target.value });
              validateWeight(e.target.value);
            }}
          />
        </div>

        <Error message={liveWeightError} />

        {/* ================= DOB + AGE ================= */}
        <Input
          label="Date of Birth"
          type="date"
          onChange={(e) => {
            setForm({ ...form, dob: e.target.value });
            calculateAge(e.target.value);
          }}
        />

        {age && (
          <div
            className={`text-sm font-medium ${
              age >= 18 ? "text-green-600" : "text-red-600"
            }`}
          >
            Age: {age} years {age < 18 && "(Not Eligible)"}
          </div>
        )}

        <Error message={error} />

        {/* ================= ACTION ================= */}
        <Button
          text="Save & Continue"
          onClick={submitProfile}
          disabled={liveWeightError !== "" || age < 18}
        />

        <p className="text-xs text-gray-500 text-center">
          🔒 Your information is safe and used only for blood donation purposes
        </p>
      </div>
    </div>
  );
}
