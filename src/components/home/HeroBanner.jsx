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
    <div className="w-full h-[400px] flex items-center font-['Plus_Jakarta_Sans']">
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: rgba(255, 255, 255, 0.9) !important;
            background: rgba(255, 255, 255, 0.1);
            width: 40px !important;
            height: 40px !important;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 18px !important;
          }
          .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5) !important;
            opacity: 0.5 !important;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: rgba(255, 255, 255, 0.9) !important;
            opacity: 1 !important;
            transform: scale(1.2);
          }
          .swiper-button-disabled {
            opacity: 0.5 !important;
            cursor: not-allowed !important;
          }
        `}
      </style>
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
        className="h-[400px]"
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div 
              className={`carousel-item h-full flex items-center px-4 sm:px-8 ${item.bgColor} transition-all duration-500 bg-opacity-90`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${bannerLists.length}`}
            >
              <div className="flex items-center w-full h-full relative">
                <div className="flex flex-col justify-center items-center w-[58%] pr-2 pl-8 sm:pl-14 space-y-4 relative z-10 text-center">
                  <div className="space-y-3 w-full max-w-[560px]">
                    <div className="relative">
                      <h3 className={`text-lg font-medium tracking-[0.25em] uppercase relative inline-block ${
                        item.id === 'laptop-banner' ? 'text-white/95' :
                        item.id === 'camera-banner' ? 'text-white/90' :
                        'text-white/95'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="min-h-[4rem] relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                      <h1 className={`text-3xl sm:text-4xl font-black leading-[1.1] line-clamp-2 whitespace-normal tracking-tight relative ${
                        item.id === 'laptop-banner' ? 'text-white' :
                        item.id === 'camera-banner' ? 'text-white' :
                        'text-white'
                      }`}>
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                          item.id === 'laptop-banner' ? 'from-white via-white/95 to-white/90' :
                          item.id === 'camera-banner' ? 'from-white via-white/90 to-white/85' :
                          'from-white via-white/95 to-white/90'
                        }`}>
                          {item.subtitle}
                        </span>
                      </h1>
                    </div>
                  </div>
                  <p className={`text-base leading-relaxed w-full max-w-[560px] line-clamp-2 font-light tracking-wide ${
                    item.id === 'laptop-banner' ? 'text-white/90' :
                    item.id === 'camera-banner' ? 'text-white/85' :
                    'text-white/90'
                  }`}>
                    {item.description}
                  </p>
                  <div className="pt-2">
                    <Link 
                      className={`group relative inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 ${
                        item.id === 'laptop-banner' ? 'bg-white/15 text-white hover:bg-white/25' :
                        item.id === 'camera-banner' ? 'bg-white/20 text-white hover:bg-white/30' :
                        'bg-white/15 text-white hover:bg-white/25'
                      }`}
                      to="/products"
                      aria-label={`Khám phá ${item.title}`}
                    >
                      <span className="relative z-10 flex items-center">
                        Khám phá ngay
                        <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                    </Link>
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[57%] h-[140%] flex items-center justify-end">
                  <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                    <img 
                      src={item.image} 
                      alt={`${item.title} - ${item.subtitle}`}
                      loading="lazy"
                      className="relative w-full h-full object-contain transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
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