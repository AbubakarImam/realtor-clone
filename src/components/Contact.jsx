import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getPublicProfile } from "../api/users";
import { sendMessage } from "../api/messages";
import { ApiError } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Contact({ listingId, userRef, listing }) {
  const { user } = useAuth();
  const [landlord, setLandlord] = useState(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!user) {
      setNeedsSignIn(true);
      return;
    }
    getPublicProfile(userRef)
      .then((data) => setLandlord(data))
      .catch((error) => {
        if (error instanceof ApiError && error.status === 401) {
          setNeedsSignIn(true);
        } else {
          toast.error("Could not get landlord data");
        }
      });
  }, [userRef, user]);

  function onChange(e) {
    setMessage(e.target.value);
  }

  async function onSend() {
    setSending(true);
    try {
      await sendMessage(listingId, message);
      toast.success("Message sent");
      setMessage("");
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Could not send message");
    } finally {
      setSending(false);
    }
  }

  if (needsSignIn) {
    return (
      <div className="flex flex-col w-full border-t border-paper-line pt-4 mt-4">
        <p className="field-label text-ink-faint mb-2">Record Request</p>
        <p className="text-ink-soft">
          <a href="/sign-in" className="text-registry hover:text-registry-dark font-semibold">Sign in</a>
          {" "}to contact the owner of {listing.name.toLowerCase()}.
        </p>
      </div>
    );
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
          <button
            type="button"
            onClick={onSend}
            disabled={sending || !message.trim()}
            className="w-full px-7 py-3 bg-registry text-paper font-mono font-semibold text-xs uppercase tracking-stamped rounded-sm hover:bg-registry-dark transition-colors duration-150 ease-in-out disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send message"}
          </button>
        </div>
      )}
    </>
  );
}
