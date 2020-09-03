import 'bootstrap';
import 'slick-carousel/slick/slick';

// Components
// import { responsiveTable } from './components/ui/responsive_table/responsive_table';
// Page
// import main from './pages/main/main';

import bannerSlider from './components/blocks/banner-section/banner-section';

$(document).ready(() => {
    bannerSlider.initSlider();
    // responsiveTable();
    // main.addHandlers();
});
