import React from 'react';
import Slider from 'react-slick';
import './ImageSlider.css'

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerPadding: '0',  // 中心模式的填充
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
    <Slider {...settings}>
      <div className="slick-slide img">
        <img src={process.env.PUBLIC_URL + '/images/wave.png'} alt="Slide 1" />
      </div>
      <div className="slick-slide img">
        <img src={process.env.PUBLIC_URL + '/images/test.jpg'} alt="Slide 2" />
      </div>
      {/* Add more slides as needed */}
    </Slider>
    </div>
  );
};

export default ImageSlider;
