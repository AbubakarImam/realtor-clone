const RegistryMark = ({ className = "h-9 w-9" }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="1.6 2.4" />
    <path d="M20 10V30M10 20H30" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="20" cy="20" r="3.2" fill="#B3261E" />
  </svg>
);

export default RegistryMark;
