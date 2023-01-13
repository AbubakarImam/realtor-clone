import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function SignIn() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  // const {formData,setFormData} = useState({
  //   email: "",
  //   password: "",
  // });
  // const {email,password} = formData;

  // const onChange = (e) => {
  //   setFormData
  // }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        Sign In
      </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12
      max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={process.env.PUBLIC_URL + '/key.jpg'} alt="key" 
          className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
            <input className='w-full px-4 py-2 text-xl text-gray-700 mb-6 bg-white
            rounded border-gray-300 transition ease-in-out' 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}/>
            <div className="relative mb-6">
              <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white
            rounded border-gray-300 transition ease-in-out' 
            type={showPassword ? "text":"password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}/>
            {showPassword ? (
              <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer"
              onClick={()=>setShowPassword(!showPassword)} />
            ): (
              <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" 
              onClick={()=>setShowPassword(!showPassword)}/>
            )}
            </div>
            <div className="flex justify-between whitespace-nowrap
             text-sm sm:text-lg">
              <p className="mb-6">Don't have a account?
                <Link to="/sign-up"
                className="text-red-600 hover:text-red-700 
                transition duration-200 ease-in-out ml-1"
                >Register</Link>
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
            Sign in
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
