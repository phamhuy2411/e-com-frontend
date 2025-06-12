// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

import { bannerLists } from '../../utils/bannerData';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import PropTypes from 'prop-types';

const HeroBanner = memo(() => {
  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        slidesPerView={1}
        aria-label="Hero banner carousel"
        className="rounded-3xl shadow-xl overflow-hidden"
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div 
              className={`carousel-item sm:h-[500px] h-[320px] ${item.bgColor} transition-all duration-500 backdrop-blur-sm bg-opacity-90`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${bannerLists.length}`}
            >
              <div className="flex items-center justify-center h-full px-4 sm:px-10">
                <div className="hidden lg:flex flex-col justify-center w-1/2 p-10 space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl text-white font-medium tracking-wide">
                      {item.title}
                    </h3>
                    <h1 className="text-4xl text-white font-bold leading-tight">
                      {item.subtitle}
                    </h1>
                    <p className="text-white/90 text-lg leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                    <div className="pt-6">
                      <Link 
                        className="inline-flex items-center px-8 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-white/20"
                        to="/products"
                        aria-label={`Khám phá ${item.title}`}
                      >
                        Khám phá ngay
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-lg transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform -rotate-3"></div>
                    <img 
                      src={item.image} 
                      alt={`${item.title} - ${item.subtitle}`}
                      loading="lazy"
                      className="relative w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

HeroBanner.propTypes = {
  bannerLists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

HeroBanner.defaultProps = {
  bannerLists: [],
};

HeroBanner.displayName = 'HeroBanner';

export default HeroBanner;