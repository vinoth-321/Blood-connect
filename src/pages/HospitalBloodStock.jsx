import { useEffect, useState } from "react";
import { api } from "../api";

const BLOOD_GROUPS = [
  "A_Positive", "A_Negative",
  "B_Positive", "B_Negative",
  "AB_Positive", "AB_Negative",
  "O_Positive", "O_Negative",
];

export default function HospitalBloodStock() {
  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("hospitalToken");

  useEffect(() => {
    api
      .get("/hospital/stock", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStock(res.data))
      .catch(() => {
        alert("Session expired");
        window.location.href = "/hospital/login";
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (group, value) => {
    setStock({ ...stock, [group]: Number(value) });
  };

 const handleSave = async () => {
  try {
    await api.put("/hospital/stock", stock, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Blood stock updated successfully");

    // ✅ Redirect to Hospital Dashboard
    window.location.href = "/hospital/dashboard";

  } catch {
    alert("Update failed");
  }
};


  if (loading) {
    return <div className="p-10 text-center">Loading blood stock...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Blood Stock Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOOD_GROUPS.map((group) => (
            <div
              key={group}
              className="flex items-center justify-between p-4 border rounded-xl"
            >
              <span className="text-lg font-semibold text-red-600">
                {group.replace("_", " ")}
              </span>

              <input
                type="number"
                min="0"
                value={stock[group] || 0}
                onChange={(e) => handleChange(group, e.target.value)}
                className="w-24 p-2 border rounded-lg text-center"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
        >
          Save Blood Stock
        </button>
      </div>
    </div>
  );
}
