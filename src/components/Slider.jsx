import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { getListings } from "../api/listings";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
import RecordPhoto from "./RecordPhoto";

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
    getListings({ limit: 5 })
      .then((res) => setListings(res.items))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <div className="relative border-b border-paper-line">
        <p className="absolute top-4 left-4 z-10 field-label bg-paper/90 px-2 py-1 rounded-sm text-ink-soft">
          Exhibit A &mdash; Featured Records
        </p>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 4000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
              className="cursor-pointer"
            >
              <div className="relative w-full h-[340px] sm:h-[420px] overflow-hidden">
                <RecordPhoto
                  className="absolute inset-0 h-full w-full object-cover"
                  src={data.imgUrls[0]}
                  alt={data.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              </div>
              <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-8 flex items-end justify-between gap-4">
                <div>
                  <p className="stamp-seal text-paper border-paper/70 mb-2">
                    {data.type === "rent" ? "For Rent" : "For Sale"}
                  </p>
                  <p className="text-paper text-xl sm:text-2xl font-semibold max-w-md truncate">
                    {data.name}
                  </p>
                </div>
                <p className="record-number text-2xl sm:text-3xl font-semibold text-paper shrink-0">
                  ${(data.discountedPrice ?? data.regularPrice)
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {data.type === "rent" && (
                    <span className="text-sm font-normal font-sans text-paper/70">/mo</span>
                  )}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
}
