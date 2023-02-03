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

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  // const [name,setName] = useState("");
  // const [email,setEmail] = useState("")
  // const [password,setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { email, name, password } = formData;
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword
        (auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user
      formData.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formData);
      navigate("/")
    } catch (error) {
      toast.error("Something went wromg with the registration")
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        Sign Up
      </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12
      max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={process.env.PUBLIC_URL + '/key.jpg'} alt="key"
            className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={handleSubmit}>
            <input className='w-full px-4 py-2 text-xl text-gray-700 mb-6 bg-white
            rounded border-gray-300 transition ease-in-out'
              type="text"
              placeholder="Full name"
              id="name"
              value={name}
              onChange={onChange} />
            <input className='w-full px-4 py-2 text-xl text-gray-700 mb-6 bg-white
            rounded border-gray-300 transition ease-in-out'
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange} />
            <div className="relative mb-6">
              <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white
            rounded border-gray-300 transition ease-in-out'
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange} />
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap
             text-sm sm:text-lg">
              <p className="mb-6">Have an account?
                <Link to="/sign-in"
                  className="text-red-600 hover:text-red-700 
                transition duration-200 ease-in-out ml-1"
                >
                  Sign in
                </Link>
              </p>
              <p>
                <Link to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 
                transition duration-200 ease-in-out">Forgot
                  password</Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 text-white px-7 py-3
          text-sm font-medium uppercase rounded shadow-md 
          hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg
          active:bg-blue-800"
              type="submit">
              Sign up
            </button>
            <div className="flex items-center my-4 
          before:border-t before:flex-1 before:border-gray-300
          after:border-t after:flex-1 aftere:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
