import { useState } from "react";

/**
 * Drop-in replacement for a plain <img> that falls back to an in-world
 * "no photo filed" placeholder when the source fails to load — a broken
 * object-store URL, a listing with no images yet, or any other load failure.
 */
export default function RecordPhoto({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 parcel-grid-bg-deep ${className}`}
      >
        <svg
          viewBox="0 0 40 40"
          className="h-7 w-7 text-ink-faint"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="4" y="6" width="32" height="28" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="13" cy="15" r="2.4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 28l9-9 6 6 5-5 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M4 6l32 28" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <p className="field-label text-ink-faint">No photo filed</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
