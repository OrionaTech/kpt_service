"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import Image from "next/image"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function ProductImageSlider({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className="rounded-lg overflow-hidden"
    >
      {images.map((img) => (
        <SwiperSlide key={img}>
          <Image
            src={img}
            alt={name}
            width={800}
            height={500}
            className="w-full h-[400px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
