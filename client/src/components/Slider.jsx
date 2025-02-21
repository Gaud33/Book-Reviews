import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/swiper-bundle.css";
import BookCard from "./BookCard";

function Slider(props) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      spaceBetween={10}
      loop={true} // Infinite scrolling
      autoplay={{
        delay: 4000, // 4 seconds delay
        disableOnInteraction: true,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      modules={[Autoplay, EffectCoverflow, Navigation, Pagination, A11y]}
      className="category-swiper"
    >
      {props.books.map((book, index) => (
        <SwiperSlide key={index} style={{ width: "auto" }}>
          <BookCard bookData={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
