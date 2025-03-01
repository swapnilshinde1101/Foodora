import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from "./CarouselItem";
import { topMeels } from "./topMeel"; 

const MultiItemCarousel = () =>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:false,
        responsive: [
            {
              breakpoint: 768,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 480,
              settings: { slidesToShow: 1 },
            },
          ],
          
          
      };
    return(
        <div>
           <Slider {...settings}>
            {topMeels.map((item) => <CarouselItem image={item.image} 
                                                  title={item.title}
            />)}
           </Slider>
        </div>
    )
}
export default MultiItemCarousel