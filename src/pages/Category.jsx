import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getListings } from "../api/listings";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const params = useParams();
  const isRent = params.categoryName === "rent";

  useEffect(() => {
    setLoading(true);
    getListings({ type: params.categoryName, limit: 8 })
      .then((res) => {
        setListings(res.items);
        setNextCursor(res.nextCursor);
        setLoading(false);
      })
      .catch(() => toast.error("Could not fetch listing"));
  }, [params.categoryName]);

  async function onFetchMoreListings() {
    try {
      const res = await getListings({
        type: params.categoryName,
        cursor: nextCursor,
        limit: 4,
      });
      setListings((prevState) => [...prevState, ...res.items]);
      setNextCursor(res.nextCursor);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6">
      <div className="border-b-2 border-ink pb-4 pt-8 mb-1 px-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink">
          {isRent ? "Places for rent" : "Places for sale"}
        </h1>
      </div>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </main>
          {nextCursor && (
            <div className="flex justify-center items-center py-8">
              <button
                onClick={onFetchMoreListings}
                className="ledger-card px-6 py-2.5 field-label text-ink-soft hover:bg-paper-deep transition-colors duration-150"
              >
                Load more records
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="field-label text-ink-faint mb-2">No Records Found</p>
          <p className="text-ink-soft">
            There are no current {isRent ? "places for rent" : "places for sale"}.
          </p>
        </div>
      )}
    </div>
  );
}
