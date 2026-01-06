import { useEffect, useState } from "react";
import { api } from "../api";

export default function HospitalRequests() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("hospitalToken");

  /* ============================
     LOAD HOSPITAL REQUESTS
  ============================ */
  const fetchRequests = () => {
    api
      .get("blood-requests/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRequests(res.data))
      .catch(() => {
        alert("Session expired");
        window.location.href = "/hospital/login";
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* ============================
     DELETE REQUEST
  ============================ */
  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await api.delete(`blood-requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchRequests();
    } catch {
      alert("Failed to delete request");
    }
  };

  /* ============================
     COMPLETE REQUEST
  ============================ */
  const completeRequest = async (id) => {
    if (!window.confirm("Mark donation as completed?")) return;

    try {
      await api.post(
        `/donor/requests/${id}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Donation marked as completed");
      fetchRequests();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed");
    }
  };

  /* ============================
     GOOGLE MAP LINK
  ============================ */
  const getMapLink = (donor) => {
    if (!donor?.location?.coordinates) return null;

    const [lng, lat] = donor.location.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blood Requests</h1>

        <button
          onClick={() => (window.location.href = "/hospital/requests/create")}
          className="px-5 py-2 bg-red-600 text-white rounded-lg"
        >
          + New Request
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          No blood requests yet
        </div>
      ) : (
        <div className="grid gap-5">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-6 rounded-xl shadow space-y-4">

              {/* HEADER */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {req.bloodGroup.replace("_", " ")} • {req.units} units
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {req.status}
                </span>
              </div>

              {/* ACCEPTED DONOR */}
              {req.acceptedDonor && (
                <div className="bg-green-50 border p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700">
                    ✅ Accepted Donor
                  </h3>
                  <p><b>Name:</b> {req.acceptedDonor.name}</p>
                  <p><b>Phone:</b> {req.acceptedDonor.phone}</p>

                  {getMapLink(req.acceptedDonor) && (
                    <a
                      href={getMapLink(req.acceptedDonor)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline block mt-2"
                    >
                      📍 Track Donor Location
                    </a>
                  )}
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                {req.status === "accepted" && (
                  <button
                    onClick={() => completeRequest(req._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Mark Completed
                  </button>
                )}

                <button
                  onClick={() => deleteRequest(req._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
