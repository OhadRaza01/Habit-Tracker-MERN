export default function DecorativeCircle({ size, color, className = "" }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none opacity-70 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}
