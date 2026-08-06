import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import StatusStamp from "../components/ui/StatusStamp";
import RecordPhoto from "../components/RecordPhoto";

const SPECS = [
  { key: "bedrooms", Icon: FaBed, label: (v) => (v > 1 ? `${v} Beds` : "1 Bed") },
  { key: "bathrooms", Icon: FaBath, label: (v) => (v > 1 ? `${v} Baths` : "1 Bath") },
];

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }

  const price = listing.offer ? listing.discountedPrice : listing.regularPrice;
  const formattedPrice = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <main className="pb-16">
      <div className="relative">
        <p className="absolute top-4 left-4 z-10 field-label bg-paper/90 px-2 py-1 rounded-sm text-ink-soft">
          Exhibit &mdash; {listing.name}
        </p>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3500 }}
        >
          {listing.imgUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full overflow-hidden h-[320px] sm:h-[420px]">
                <RecordPhoto
                  className="h-full w-full object-cover"
                  src={url}
                  alt={`${listing.name} — photo ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute top-4 right-4 z-10 bg-paper cursor-pointer border border-ink/20 rounded-sm h-11 w-11 flex justify-center items-center shadow-ledger hover:bg-paper-deep transition-colors duration-150"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}
          aria-label="Copy link to this record"
        >
          <FaShare className="text-sm text-ink-soft" />
        </button>
        {shareLinkCopied && (
          <p className="absolute top-[70px] right-4 z-10 field-label bg-ink text-paper rounded-sm px-3 py-2">
            Link copied
          </p>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-6 flex flex-col lg:flex-row gap-6">
        <div className="ledger-card w-full lg:w-3/5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <h1 className="text-2xl font-semibold text-ink max-w-md">{listing.name}</h1>
            <p className="record-number text-2xl font-semibold text-stamp shrink-0">
              ${formattedPrice}
              {listing.type === "rent" && (
                <span className="text-sm font-sans font-normal text-ink-faint"> / month</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <p className="flex items-center gap-1.5 text-ink-soft font-medium">
              <FaMapMarkerAlt className="text-seal-available" />
              {listing.address}
            </p>
            <p className="record-number text-xs text-ink-faint">
              Record No. {params.listingId?.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-6">
            <StatusStamp tone={listing.type === "rent" ? "rent" : "sale"}>
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </StatusStamp>
            {listing.offer && (
              <StatusStamp tone="available">
                ${(+listing.regularPrice - +listing.discountedPrice).toLocaleString()} discount
              </StatusStamp>
            )}
          </div>

          <div className="border-t border-paper-line pt-4 mb-6">
            <p className="field-label text-ink-faint mb-2">Description</p>
            <p className="text-ink-soft leading-relaxed">{listing.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {SPECS.map(({ key, Icon, label }) => (
              <div key={key} className="border border-paper-line rounded-sm px-3 py-2.5 text-center">
                <Icon className="mx-auto mb-1 text-ink-faint" />
                <p className="text-xs font-semibold text-ink">{label(+listing[key])}</p>
              </div>
            ))}
            <div className="border border-paper-line rounded-sm px-3 py-2.5 text-center">
              <FaParking className="mx-auto mb-1 text-ink-faint" />
              <p className="text-xs font-semibold text-ink">
                {listing.parking ? "Parking" : "No parking"}
              </p>
            </div>
            <div className="border border-paper-line rounded-sm px-3 py-2.5 text-center">
              <FaChair className="mx-auto mb-1 text-ink-faint" />
              <p className="text-xs font-semibold text-ink">
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </p>
            </div>
          </div>

          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <button
              onClick={() => setContactLandlord(true)}
              className="w-full px-7 py-3 bg-stamp text-paper font-mono font-semibold text-xs uppercase tracking-stamped rounded-sm shadow-stamp hover:bg-stamp-dark transition-colors duration-150 ease-in-out"
            >
              Request this record
            </button>
          )}
          {contactLandlord && <Contact userRef={listing.userRef} listing={listing} />}
        </div>

        <div className="w-full lg:w-2/5 flex flex-col">
          <div className="ledger-card p-0 overflow-hidden flex-1 flex flex-col">
            <p className="field-label text-ink-soft px-4 py-3 border-b border-paper-line">
              Parcel Diagram
            </p>
            <div className="w-full h-[260px] lg:h-full">
              <MapContainer
                center={[9.061642954351017, 7.421741821547859]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[9.061642954351017, 7.421741821547859]}>
                  <Popup>{listing.address}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
