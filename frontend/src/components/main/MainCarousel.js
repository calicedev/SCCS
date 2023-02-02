import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import mainBanner1 from 'assets/img/main_banner_1.png'
import mainBanner2 from 'assets/img/main_banner_2.png'

export default function MainCarousel() {
  return (
    <Carousel showThumbs={false} infiniteLoop={true} interval={2000}>
      <div>
        <img src={mainBanner1} />
      </div>
      <div>
        <img src={mainBanner2} />
      </div>
    </Carousel>
  )
}
