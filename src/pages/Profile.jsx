import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FcHome } from 'react-icons/fc'

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const { name, email } = formData;
  const onLogOut = () => {
    auth.signOut()
    navigate("/")
  }

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        /// Update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        /// Update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name
        })
      }
      toast.success("Profile updated")
    } catch (error) {
      toast.error("Could not update profile detail")

    }
  }
  return (
    <section className="max-w-6xl mx-auto flex items-center justify-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">
        My Profile
      </h1>
      <div className="w-full md:[50%] mt-6 px-3">
        <form>
          {/* Name input */}

          <input
            type="text" id='name'
            value={name} disabled={!changeDetail}
            onChange={onChange}
            className={`w-full rounded px-4 py-2 text-xl text-gray-500 border border-gray-300 
            bg-white transition ease-in-out mb-6 
            ${changeDetail && 'bg-red-200 focus:bg-red-200'}`} />
          {/* Email input */}

          <input type="email" id='email' value={email} disabled
            className='w-full rounded px-4 py-2 text-xl text-gray-500 border border-gray-300 
            bg-white transition ease-in-out mb-6' />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className='flex items-center'>Do you want to change your name?
              <span onClick={() => {
                changeDetail && onSubmit();
                setChangeDetail((prev) => !prev)
              }}
                className='text-red-600 hover:text-red-700
              transition ease-in-out duration-200 ml-1 cursor-pointer'>
                {changeDetail ? "Apply Change" : "Edit"}
              </span>
            </p>
            <p onClick={onLogOut} className='text-blue-600 hover:text-blue-800
            transition ease-in-out duration-200 cursor-pointer'>Sign out</p>
          </div>
        </form>
        <button type="submit" className='w-full bg-blue-600 px-7
        uppercase text-white py-3 hover:bg-blue-700 active:bg-blue-800
        rounded shadow-sm'>
          <Link to={'/create-listing'} className='flex items-center justify-center text-sm
          font-medium'>
            <FcHome className='mr-2 text-3xl bg-red-200 p-1 border-2 rounded-full' />
            sell or rent your home
          </Link>
        </button>
      </div>
    </section>
  )
}
