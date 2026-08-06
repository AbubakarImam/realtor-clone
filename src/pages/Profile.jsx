import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, query, where, orderBy, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner';

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
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
        await updateProfile(auth.currentUser, {
          displayName: name
        })
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
  useEffect(() => {
    async function fetchUserListing() {
      const listingRef = collection(db, 'listings');
      const q = query(listingRef, where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      });
      setListings(listings);
      setLoading(false)
    }
    fetchUserListing();
  }, [auth.currentUser.uid])
  const onDelete = async (listingID) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, 'listings', listingID))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success('Succesfully deleted the listing')
    }
  }
  const onEdit = (listingID) => {
    navigate(`/edit-listing/${listingID}`)
  }
  return (
    <>
      <section className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="border-b-2 border-ink pb-4 pt-8 mb-8 px-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-ink">Your account</h1>
        </div>

        <div className="ledger-card p-5 sm:p-8">
          <form className="space-y-5">
            <div>
              <p className="field-label mb-2">Full name</p>
              <input
                type="text" id='name'
                value={name} disabled={!changeDetail}
                onChange={onChange}
                className={`ledger-input ${changeDetail ? 'bg-paper-deep' : 'text-ink-soft'}`} />
            </div>
            <div>
              <p className="field-label mb-2">Email</p>
              <input type="email" id='email' value={email} disabled
                className='ledger-input text-ink-faint' />
            </div>

            <div className="flex justify-between items-center flex-wrap gap-3 text-sm pt-1">
              <p className='flex items-center gap-1 text-ink-soft'>
                Change your name?
                <button
                  type="button"
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prev) => !prev)
                  }}
                  className='text-stamp hover:text-stamp-dark font-semibold transition-colors duration-150 ease-in-out ml-1'>
                  {changeDetail ? "Apply change" : "Edit"}
                </button>
              </p>
              <button
                type="button"
                onClick={onLogOut}
                className='text-registry hover:text-registry-dark font-semibold transition-colors duration-150 ease-in-out'>
                Sign out
              </button>
            </div>
          </form>
        </div>

        <Link
          to={'/create-listing'}
          className='mt-4 flex items-center justify-center gap-2 w-full bg-stamp text-paper
          font-mono font-semibold text-xs uppercase tracking-stamped py-3.5 rounded-sm shadow-stamp
          hover:bg-stamp-dark transition-colors duration-150 ease-in-out'>
          File a new record &mdash; sell or rent your home
        </Link>
      </section>

      <div className="max-w-6xl px-3 sm:px-6 mt-12 mx-auto">
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <div className="flex items-baseline gap-3 border-b-2 border-ink pb-3 mb-1 px-1">
              <span className="record-number text-xs text-ink-faint">Bk. My</span>
              <h2 className="text-xl sm:text-2xl font-semibold text-ink">Your filed records</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)} />
              ))}
            </ul>
          </>
        ) : (
          listings && (
            <div className="text-center py-16">
              <p className="field-label text-ink-faint mb-2">Registry Empty</p>
              <p className="text-ink-soft">You haven't filed any records yet.</p>
            </div>
          )
        )}
      </div>
    </>
  )
}
