import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";

export default function DonorProfile() {
  const { id } = useParams();
  const [Donor, setDonor] = useState(null);

  useEffect(() => {
    api.get(`user/me/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    }).then((res) => setDonor(res.data));
  }, []);

  if (!Donor) return <h2 className="text-center mt-10">Loading...</h2>;

  const deleteDonor = async () => {
    if (!window.confirm("Are you sure you want to delete this Donor?")) return;

    await api.delete(`user/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });

    alert("Donor deleted");
    window.location.href = "/admin/Donors";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT PROFILE CARD ================= */}
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto"
          />

          <h2 className="mt-4 text-xl font-bold">{Donor.name}</h2>
          <p className="text-gray-500">{Donor.bloodType} Donor</p>
          <p className="text-sm text-gray-400 mt-1">
            {Donor.city}, {Donor.state}
          </p>

          <div className="mt-4 flex justify-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              Follow
            </button>
            <button className="px-4 py-2 border rounded-lg text-sm">
              Message
            </button>
          </div>

          {/* CONTACT */}
          <div className="mt-6 text-left space-y-3 text-sm">
            <p>📧 {Donor.email}</p>
            <p>📞 {Donor.phone}</p>
            <p>📍 {Donor.address}</p>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* BASIC INFO */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><strong>Full Name:</strong> {Donor.name}</p>
              <p><strong>Email:</strong> {Donor.email}</p>
              <p><strong>Phone:</strong> {Donor.phone}</p>
              <p><strong>Pincode:</strong> {Donor.pincode}</p>
            </div>
          </div>

          {/* BLOOD DETAILS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Blood Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><strong>Blood Type:</strong> {Donor.bloodType}</p>
              <p><strong>Weight:</strong> {Donor.weight} kg</p>
              <p><strong>DOB:</strong> {Donor.dob ? new Date(Donor.dob).toDateString() : "Not added"}</p>
              <p><strong>Age:</strong> {Donor.age}</p>
            </div>
          </div>

          {/* DONATION STATUS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Donation Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Availability:</strong>{" "}
                <span className={Donor.isAvailable ? "text-green-600" : "text-red-600"}>
                  {Donor.isAvailable ? "Available" : "Not Available"}
                </span>
              </p>
              <p>
                <strong>Last Donation:</strong>{" "}
                {Donor.lastDonationDate
                  ? new Date(Donor.lastDonationDate).toDateString()
                  : "No donation yet"}
              </p>
              <p>
                <strong>Profile Status:</strong>{" "}
                {Donor.profileCompleted ? "✔ Completed" : "❌ Not Completed"}
              </p>
            </div>
          </div>

          {/* DELETE */}
          <button
            onClick={deleteDonor}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow"
          >
            Delete Donor
          </button>

        </div>
      </div>
    </div>
  );
}
