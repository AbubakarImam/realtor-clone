import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { login } from "../api/auth";
import { ApiError } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import DeedIllustration from "../components/DeedIllustration";


export default function SignIn() {

  const navigate = useNavigate();
  const { login: setSession } = useAuth();

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ email, password });
      setSession(user);
      navigate('/')
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not sign in')
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="border-b-2 border-ink pb-4 pt-8 mb-8 px-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink">Sign in to GidaListing</h1>
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
              <p className="text-ink-soft">Don't have an account?
                <Link to="/sign-up"
                  className="text-stamp hover:text-stamp-dark font-semibold transition-colors duration-150 ease-in-out ml-1"
                >Register</Link>
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
              Sign in
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
