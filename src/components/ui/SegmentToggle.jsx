const SegmentToggle = ({ id, value, options, onSelect }) => {
  return (
    <div className="flex border border-ink/15 rounded-sm overflow-hidden">
      {options.map(({ label, val }, index) => {
        const active = value === val;
        return (
          <button
            type="button"
            key={val.toString()}
            id={id}
            value={val}
            onClick={onSelect}
            aria-pressed={active}
            className={`flex-1 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-stamped
              transition-colors duration-150 ease-in-out
              ${index > 0 ? "border-l border-ink/15" : ""}
              ${active ? "bg-ink text-paper" : "bg-white text-ink-soft hover:bg-paper-deep"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentToggle;
