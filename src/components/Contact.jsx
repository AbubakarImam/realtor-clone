import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full border-t border-paper-line pt-4 mt-4">
          <p className="field-label text-ink-faint mb-2">Record Request</p>
          <p className="text-ink-soft mb-3">
            Contact <span className="font-semibold text-ink">{landlord.name}</span> about{" "}
            {listing.name.toLowerCase()}
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Write your message..."
            className="ledger-input mb-4"
          ></textarea>
          <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
            <button
              type="button"
              className="w-full px-7 py-3 bg-registry text-paper font-mono font-semibold text-xs uppercase tracking-stamped rounded-sm hover:bg-registry-dark transition-colors duration-150 ease-in-out"
            >
              Send message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
