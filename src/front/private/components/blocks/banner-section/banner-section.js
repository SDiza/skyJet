const bannerSlider = {
    initSlider() {
        $('.js--banner-section__slider').slick({
            arrows: true,
            dots: true,
            prevArrow: '<button class="banner-section__slider-btn banner-section__slider-btnprev"><img src="img/arrow-left.svg" alt=""></button>',
            nextArrow: '<button class="banner-section__slider-btn banner-section__slider-btnnext"><img src="img/arrow-right.svg" alt=""></button>',
        });
    },
}

export default bannerSlider;