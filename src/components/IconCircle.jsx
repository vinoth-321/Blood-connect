export default function IconCircle({ children, bg, className = "" }) {
  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${className}`}
    >
      {children}
    </div>
  );
}
