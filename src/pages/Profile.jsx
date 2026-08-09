import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { updateMe } from '../api/users';
import { getListings, deleteListing } from '../api/listings';
import { ApiError } from '../api/client';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });
  const { name, email } = formData;
  const onLogOut = () => {
    logout()
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
      if (user.name !== name) {
        await updateMe({ name })
        await refreshUser()
      }
      toast.success("Profile updated")
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Could not update profile detail")
    }
  }
  useEffect(() => {
    getListings({ ownerId: user.id, limit: 50 })
      .then((res) => setListings(res.items))
      .finally(() => setLoading(false))
  }, [user.id])
  const onDelete = async (listingID) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteListing(listingID)
        const updatedListings = listings.filter(
          (listing) => listing.id !== listingID
        );
        setListings(updatedListings);
        toast.success('Succesfully deleted the listing')
      } catch (error) {
        toast.error(error instanceof ApiError ? error.message : 'Could not delete the listing')
      }
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
              <p className="field-label text-ink-faint mb-2">Ledger Empty</p>
              <p className="text-ink-soft">You haven't filed any records yet.</p>
            </div>
          )
        )}
      </div>
    </>
  )
}
