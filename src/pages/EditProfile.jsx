import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    api.get(`/user/me/${id}`)
      .then((res) => {
        const { name, phone, address, city, state, pincode } = res.data;
        setForm({ name, phone, address, city, state, pincode });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/user/update/${id}`, form);
      alert(res.data.msg || "Profile updated successfully");
      navigate(`/profile/${id}`);
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-6 bg-slate-100">

    {/* MAIN CONTAINER */}
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2
      rounded-2xl overflow-hidden shadow-2xl bg-white">

      {/* ================= LEFT IMAGE SECTION ================= */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
        }}
      >
        {/* Dark overlay for hospital feel */}
        <div className="w-full h-full bg-sky-900/40"></div>
      </div>

      {/* ================= RIGHT FORM (GLASS) ================= */}
      <div className="relative p-10 bg-white/80 backdrop-blur-xl">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Profile
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Update your donor & contact information
        </p>

        {/* FORM */}
        <form onSubmit={handleUpdate} className="mt-8 space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg
                border border-gray-300
                focus:border-sky-600 focus:ring-2 focus:ring-sky-100
                outline-none transition"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg
                border border-gray-300
                focus:border-sky-600 focus:ring-2 focus:ring-sky-100
                outline-none transition"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-lg
                border border-gray-300
                focus:border-sky-600 focus:ring-2 focus:ring-sky-100
                outline-none transition"
            />
          </div>

          {/* CITY */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              City
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg
                border border-gray-300
                focus:border-sky-600 focus:ring-2 focus:ring-sky-100
                outline-none transition"
            />
          </div>

          {/* STATE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              State
            </label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg
                border border-gray-300
                focus:border-sky-600 focus:ring-2 focus:ring-sky-100
                outline-none transition"
            />
          </div>

          {/* PINCODE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Pincode
            </label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg
                border border-gray-300
                focus:border-sky-600 focus:ring-2 focus:ring-sky-100
                outline-none transition"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border
                border-gray-300 text-gray-700
                hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-lg
                bg-sky-600 text-white font-medium
                hover:bg-sky-700 transition"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);

}
