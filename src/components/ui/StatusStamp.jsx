const TONES = {
  available: "text-seal-available",
  pending: "text-seal-pending",
  sold: "text-seal-sold",
  rent: "text-registry",
  sale: "text-stamp",
};

const StatusStamp = ({ tone = "available", children, className = "" }) => {
  return (
    <span className={`stamp-seal ${TONES[tone] ?? TONES.available} ${className}`}>
      {children}
    </span>
  );
};

export default StatusStamp;
