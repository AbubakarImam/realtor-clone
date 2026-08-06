import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  getAuth, createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth"
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeedIllustration from "../components/DeedIllustration";

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { email, name, password } = formData;

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/")
    } catch (error) {
      toast.error("Something went wromg with the registration")
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="border-b-2 border-ink pb-4 pt-8 mb-8 px-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink">Register with the registry</h1>
      </div>
      <div className='flex justify-center flex-wrap items-start gap-10 lg:gap-16 pb-16'>
        <div className='w-full md:w-[60%] lg:w-[42%]'>
          <DeedIllustration className="w-full rounded-sm ledger-card p-0" />
        </div>
        <div className='w-full md:w-[60%] lg:w-[38%]'>
          <form onSubmit={handleSubmit} className="ledger-card p-6 sm:p-7 space-y-5">
            <div>
              <p className="field-label mb-2">Full name</p>
              <input className='ledger-input'
                type="text"
                placeholder="Full name"
                id="name"
                value={name}
                onChange={onChange} />
            </div>
            <div>
              <p className="field-label mb-2">Email</p>
              <input className='ledger-input'
                type="email"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={onChange} />
            </div>
            <div>
              <p className="field-label mb-2">Password</p>
              <div className="relative">
                <input className='ledger-input pr-11'
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange} />
                {showPassword ? (
                  <AiFillEyeInvisible className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lg text-ink-faint cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <AiFillEye className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lg text-ink-faint cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
            </div>
            <div className="flex justify-between flex-wrap gap-2 text-sm">
              <p className="text-ink-soft">Have an account?
                <Link to="/sign-in"
                  className="text-stamp hover:text-stamp-dark font-semibold transition-colors duration-150 ease-in-out ml-1"
                >
                  Sign in
                </Link>
              </p>
              <Link to="/forgot-password"
                className="text-registry hover:text-registry-dark font-semibold transition-colors duration-150 ease-in-out">
                Forgot password
              </Link>
            </div>
            <button className="w-full bg-stamp text-paper px-7 py-3
          font-mono text-xs font-semibold uppercase tracking-stamped rounded-sm shadow-stamp
          hover:bg-stamp-dark transition-colors duration-150 ease-in-out"
              type="submit">
              Sign up
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
