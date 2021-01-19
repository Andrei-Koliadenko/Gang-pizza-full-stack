import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import pic1 from '../util/images/Promotions/1.jpg';
import pic2 from '../util/images/Promotions/2.jpg';
import pic3 from '../util/images/Promotions/3.jpg';
import pic4 from '../util/images/Promotions/4.jpg';
import pic5 from '../util/images/Promotions/5.jpg';

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            fade: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 5000,
            cssEase: "linear"
        };
        return (

                <div className={'sliderBox'}>
                    <Slider  {...settings}>
                        <div>
                            <img src={pic1} className={'slider'}/>
                        </div>
                        <div>
                            <img src={pic2} className={'slider'}/>
                        </div>
                        <div>
                            <img src={pic3} className={'slider'}/>
                        </div>
                        <div>
                            <img src={pic4} className={'slider'}/>
                        </div>
                        <div>
                            <img src={pic5} className={'slider'}/>
                        </div>
                        <div>
                            <img src={pic5} className={'slider'}/>
                        </div>
                    </Slider>
                </div>

        );
    }
}