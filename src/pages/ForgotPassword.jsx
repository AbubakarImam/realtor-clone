import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import DeedIllustration from "../components/DeedIllustration";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent')
    } catch (error) {
      toast.error('Reset email not sent')
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="border-b-2 border-ink pb-4 pt-8 mb-8 px-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink">Reset your password</h1>
      </div>
      <div className='flex justify-center flex-wrap items-start gap-10 lg:gap-16 pb-16'>
        <div className='w-full md:w-[60%] lg:w-[42%]'>
          <DeedIllustration className="w-full rounded-sm ledger-card p-0" />
        </div>
        <div className='w-full md:w-[60%] lg:w-[38%]'>
          <form onSubmit={onSubmit} className="ledger-card p-6 sm:p-7 space-y-5">
            <div>
              <p className="field-label mb-2">Email</p>
              <input className='ledger-input'
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex justify-between flex-wrap gap-2 text-sm">
              <p className="text-ink-soft">Don't have an account?
                <Link to="/sign-up"
                  className="text-stamp hover:text-stamp-dark font-semibold transition-colors duration-150 ease-in-out ml-1"
                >Register</Link>
              </p>
              <Link to="/sign-in"
                className="text-registry hover:text-registry-dark font-semibold transition-colors duration-150 ease-in-out">
                Sign in instead
              </Link>
            </div>
            <button className="w-full bg-stamp text-paper px-7 py-3
          font-mono text-xs font-semibold uppercase tracking-stamped rounded-sm shadow-stamp
          hover:bg-stamp-dark transition-colors duration-150 ease-in-out"
              type="submit">
              Send reset link
            </button>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-paper-line" />
              <p className="field-label text-ink-faint">Or</p>
              <div className="flex-1 h-px bg-paper-line" />
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
