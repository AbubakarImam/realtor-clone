const DeedIllustration = ({ className = "" }) => (
  <svg
    viewBox="0 0 420 420"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Illustration of a stamped property record"
  >
    <rect width="420" height="420" fill="#EAEBE2" />
    {Array.from({ length: 11 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 42} y1="0" x2={i * 42} y2="420" stroke="#C7CBBF" strokeWidth="1" />
    ))}
    {Array.from({ length: 11 }).map((_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 42} x2="420" y2={i * 42} stroke="#C7CBBF" strokeWidth="1" />
    ))}

    <g transform="translate(70,60)">
      <rect
        width="280"
        height="320"
        fill="#FCFCFA"
        stroke="#1B1F1B"
        strokeWidth="1.5"
      />
      <line x1="24" y1="40" x2="220" y2="40" stroke="#1B1F1B" strokeWidth="2.5" />
      <line x1="24" y1="64" x2="180" y2="64" stroke="#4B5147" strokeWidth="1.4" />

      <line x1="24" y1="110" x2="256" y2="110" stroke="#C7CBBF" strokeWidth="1" />
      <line x1="24" y1="134" x2="256" y2="134" stroke="#C7CBBF" strokeWidth="1" />
      <line x1="24" y1="158" x2="230" y2="158" stroke="#C7CBBF" strokeWidth="1" />
      <line x1="24" y1="182" x2="256" y2="182" stroke="#C7CBBF" strokeWidth="1" />
      <line x1="24" y1="206" x2="200" y2="206" stroke="#C7CBBF" strokeWidth="1" />

      <path
        d="M24 244 L124 244 L104 264 L124 284 L24 284 Z"
        fill="none"
        stroke="#4B5147"
        strokeWidth="1.2"
      />

      <line x1="24" y1="300" x2="150" y2="300" stroke="#C7CBBF" strokeWidth="1" />

      <g transform="translate(215,240) rotate(-10)">
        <circle r="46" fill="none" stroke="#B3261E" strokeWidth="2.5" />
        <circle r="34" fill="none" stroke="#B3261E" strokeWidth="1.2" strokeDasharray="2 3" />
        <text
          x="0"
          y="-4"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1"
          fill="#B3261E"
        >
          FILED
        </text>
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="6.5"
          letterSpacing="0.5"
          fill="#B3261E"
        >
          GIDALISTING
        </text>
      </g>
    </g>
  </svg>
);

export default DeedIllustration;
