import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase"


const OAuth = () => {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        });
      }
      navigate('/')
    } catch (error) {
      toast.error("Could not authorize with google")
    }
  }
  return (
    <button type="button" onClick={onGoogleClick}
      className="flex items-center justify-center gap-2.5
    w-full bg-white border border-ink/20 text-ink px-7 py-3
    font-mono uppercase text-xs font-semibold tracking-stamped hover:bg-paper-deep
    transition-colors duration-150 ease-in-out rounded-sm">
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  )
}

export default OAuth
