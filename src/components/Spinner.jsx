const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-3 ledger-card px-8 py-6">
        <svg
          className="h-9 w-9 animate-spin text-stamp"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="70 30"
          />
        </svg>
        <p className="field-label text-ink-soft">Processing record</p>
      </div>
    </div>
  );
};

export default Spinner;
