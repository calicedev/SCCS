import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import mainBanner1 from 'assets/img/main_banner_1.png'
import mainBanner2 from 'assets/img/main_banner_2.png'
import mainBanner3 from 'assets/img/main_banner_3.png'

/*
 메인 배너이미지 캐러셀
*/

export default function MainCarousel() {
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
    >
      <div>
        <img src={mainBanner1} alt="배너이미지1" />
      </div>
      <div>
        <img src={mainBanner2} alt="배너이미지2" />
      </div>
      <div>
        <img src={mainBanner3} alt="배너이미지3" />
      </div>
    </Carousel>
  )
}
