export default function Error({ message }) {
  if (!message) return null;

  return (
    <p className="text-red-500 text-sm font-semibold text-center mt-2">
      {message}
    </p>
  );
}
