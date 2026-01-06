export default function Input({ label, type = "text", value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-md border border-gray-4 bg-gray-2 focus:outline-none focus:ring-2 focus:ring-blue-6"
      />
    </div>
  );
}
