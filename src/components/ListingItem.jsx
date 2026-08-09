import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash, FaBed, FaBath } from "react-icons/fa";
import StatusStamp from "./ui/StatusStamp";
import RecordPhoto from "./RecordPhoto";

const ListingItem = ({ listing, id, onEdit, onDelete }) => {
  const price = listing.offer ? listing.discountedPrice : listing.regularPrice;
  const formattedPrice = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <li className="ledger-card m-2.5 flex flex-col overflow-hidden group">
      <Link to={`/category/${listing.type}/${id}`} className="flex flex-col flex-1">
        <div className="relative">
          <div className="relative overflow-hidden aspect-[4/3] border-b border-paper-line">
            <RecordPhoto
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              src={listing.imgUrls[0]}
              alt={listing.name}
            />
          </div>
          <StatusStamp
            tone={listing.type === "rent" ? "rent" : "sale"}
            className="absolute top-3 left-3 bg-paper/95"
          >
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </StatusStamp>
          <Moment
            className="absolute top-3 right-3 record-number text-[10px] font-semibold uppercase tracking-stamped bg-ink/80 text-paper px-2 py-1 rounded-sm"
            fromNow
          >
            {listing.timestamp}
          </Moment>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-1 text-ink-faint">
            <MdLocationOn className="h-3.5 w-3.5 shrink-0 text-seal-available" />
            <p className="field-label truncate normal-case tracking-normal font-sans font-medium text-xs">
              {listing.address}
            </p>
          </div>

          <p className="font-semibold text-lg text-ink truncate leading-snug">
            {listing.name}
          </p>

          <p className="record-number text-xl font-semibold text-stamp">
            ${formattedPrice}
            {listing.type === "rent" && (
              <span className="text-xs text-ink-faint font-sans font-normal"> / month</span>
            )}
          </p>

          <div className="flex items-center gap-4 pt-1 border-t border-paper-line mt-1">
            <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <FaBed className="text-ink-faint" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : "1 bed"}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <FaBath className="text-ink-faint" />
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}
            </span>
          </div>
        </div>
      </Link>

      {(onDelete || onEdit) && (
        <div className="flex border-t border-paper-line">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold uppercase tracking-stamped font-mono text-registry hover:bg-paper-deep transition-colors duration-150"
            >
              <MdEdit className="h-3.5 w-3.5" /> Edit
            </button>
          )}
          {onEdit && onDelete && <div className="w-px bg-paper-line" />}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold uppercase tracking-stamped font-mono text-stamp hover:bg-paper-deep transition-colors duration-150"
            >
              <FaTrash className="h-3 w-3" /> Delete
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default ListingItem;
