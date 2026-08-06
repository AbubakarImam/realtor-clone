import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import { db } from "../firebase";

function LedgerBook({ number, title, viewAllPath, viewAllLabel, listings }) {
  return (
    <section className="mb-14">
      <div className="flex items-end justify-between border-b-2 border-ink pb-3 mb-1 px-1">
        <div className="flex items-baseline gap-3">
          <span className="record-number text-xs text-ink-faint">{number}</span>
          <h2 className="text-xl sm:text-2xl font-semibold text-ink">{title}</h2>
        </div>
        <Link
          to={viewAllPath}
          className="field-label text-registry hover:text-registry-dark transition-colors duration-150 whitespace-nowrap"
        >
          {viewAllLabel} &rarr;
        </Link>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  const noListings =
    offerListings?.length === 0 &&
    rentListings?.length === 0 &&
    saleListings?.length === 0;

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-10">
        {offerListings && offerListings.length > 0 && (
          <LedgerBook
            number="Bk. I"
            title="Recent offers"
            viewAllPath="/offers"
            viewAllLabel="Full ledger"
            listings={offerListings}
          />
        )}
        {rentListings && rentListings.length > 0 && (
          <LedgerBook
            number="Bk. II"
            title="Places for rent"
            viewAllPath="/category/rent"
            viewAllLabel="Full ledger"
            listings={rentListings}
          />
        )}
        {saleListings && saleListings.length > 0 && (
          <LedgerBook
            number="Bk. III"
            title="Places for sale"
            viewAllPath="/category/sale"
            viewAllLabel="Full ledger"
            listings={saleListings}
          />
        )}
        {noListings && (
          <div className="text-center py-20">
            <p className="field-label text-ink-faint mb-2">Registry Empty</p>
            <p className="text-ink-soft">No records have been filed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
