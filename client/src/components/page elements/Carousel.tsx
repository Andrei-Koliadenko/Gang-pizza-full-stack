import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import {boolean, number} from "@storybook/addon-knobs";
import {pizzaBanner1, pizzaBanner2, pizzaBanner3, pizzaBanner4, pizzaBanner5} from "../../config/imageBanner";
// import pic1 from '../util/images/Promotions/1.jpg';
// import pic2 from '../util/images/Promotions/2.jpg';
// import pic3 from '../util/images/Promotions/3.jpg';
// import pic4 from '../util/images/Promotions/4.jpg';
// import pic5 from '../util/images/Promotions/5.jpg';
// import pizzaBaner1 from '../../util/images/Promotions/PizzaBaner1.jpg';
// import pizzaBaner2 from '../../util/images/Promotions/PizzaBaner2.jpg';
// import pizzaBaner3 from '../../util/images/Promotions/PizzaBaner3.jpg';
// import pizzaBaner4 from '../../util/images/Promotions/PizzaBaner4.jpg';
// import pizzaBaner5 from '../../util/images/Promotions/PizzaBaner5.jpg';

const createCarouselItemImage = (picture: any) => (
    <div key={picture}>
        <img src={picture} alt="banner" className={'slider'}/>
    </div>
);
const baseChildren = <div>{[pizzaBanner1, pizzaBanner2, pizzaBanner5, pizzaBanner3, pizzaBanner4].map(createCarouselItemImage)}</div>;
const tooglesGroupId = 'Toggles';
const valuesGroupId = 'Values';
const mainGroupId = 'Main';
const getConfigurableProps = () => ({
    showArrows: boolean('showArrows', true, tooglesGroupId),
    showStatus: boolean('showStatus', false, tooglesGroupId),
    showIndicators: boolean('showIndicators', true, tooglesGroupId),
    infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
    showThumbs: boolean('showThumbs', false, tooglesGroupId),
    useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    autoPlay: boolean('autoPlay', true, tooglesGroupId),
    stopOnHover: boolean('stopOnHover', false, tooglesGroupId),
    swipeable: boolean('swipeable', true, tooglesGroupId),
    dynamicHeight: boolean('dynamicHeight', false, tooglesGroupId),
    emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    interval: number('interval', 5000, {}, valuesGroupId),
    transitionTime: number('transitionTime', 2000, {}, valuesGroupId),
    swipeScrollTolerance: number('swipeScrollTolerance', 0, {}, valuesGroupId),
});
export const CarouselLoop = () => (
    <div style={{alignmentBaseline: "central"}}>
        <Carousel width={'100%'}
                  infiniteLoop
                  centerSlidePercentage={number('centerSlidePercentage', 40, {}, mainGroupId)}
                  {...getConfigurableProps()}>{baseChildren.props.children}
        </Carousel>
    </div>
);
