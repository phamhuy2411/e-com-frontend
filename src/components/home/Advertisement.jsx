import { memo } from 'react';
import PropTypes from 'prop-types';

const SIDE_AD_HEIGHT = 320; // px

const Advertisement = memo(({ leftAds, rightAds, bottomAd, children }) => {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-8">
      {/* Main ad section with left, banner, and right ads */}
      <div className="flex justify-between gap-x-4 items-start">
        {/* Left ads */}
        <div className={`flex flex-col h-[${SIDE_AD_HEIGHT}px] gap-y-2 flex-[0_0_180px] max-w-[180px]`}>
          {leftAds?.map((ad, index) => (
            <div 
              key={index}
              className="flex-1 min-h-0 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] relative group cursor-pointer"
            >
              {/* Image container with zoom effect */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={ad.image} 
                  alt="Advertisement"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                  loading="lazy"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner section */}
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <div className="rounded-lg overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] w-full h-[320px] flex items-center justify-center border border-gray-100/50 backdrop-blur-sm">
            {children}
          </div>
        </div>

        {/* Right ads */}
        <div className={`flex flex-col h-[${SIDE_AD_HEIGHT}px] gap-y-2 flex-[0_0_180px] max-w-[180px]`}>
          {rightAds?.map((ad, index) => (
            <div 
              key={index}
              className="flex-1 min-h-0 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] relative group cursor-pointer"
            >
              {/* Image container with zoom effect */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={ad.image} 
                  alt="Advertisement"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                  loading="lazy"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom ad */}
      {bottomAd && (
        <div className="w-full mt-4 flex justify-center">
          <div className="w-[1200px] h-[64px] overflow-hidden relative group cursor-pointer p-0 m-0 rounded-lg transition-all duration-500">
            <img 
              src={bottomAd.image} 
              alt="Advertisement"
              className="w-full h-full object-cover transition-all duration-500 rounded-lg group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-2xl"
              loading="lazy"
            />
            {/* Shine sweep effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-80 -translate-x-full group-hover:translate-x-full transition-all duration-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Advertisement.propTypes = {
  leftAds: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    })
  ),
  rightAds: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
    })
  ),
  bottomAd: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
};

Advertisement.defaultProps = {
  leftAds: [],
  rightAds: [],
  bottomAd: null,
  children: null,
};

Advertisement.displayName = 'Advertisement';

export default Advertisement; 