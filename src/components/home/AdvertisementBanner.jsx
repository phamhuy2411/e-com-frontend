import React from 'react';
import PropTypes from 'prop-types';

const AdvertisementBanner = ({ title, description, imageUrl, buttonText, buttonLink }) => {
    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 my-8">
            <div className="px-6 py-8 sm:px-12 sm:py-12 md:flex md:items-center md:justify-between">
                <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-lg text-blue-100">
                        {description}
                    </p>
                    <div className="mt-8">
                        <a
                            href={buttonLink}
                            className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50"
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
                {imageUrl && (
                    <div className="mt-8 md:mt-0 md:ml-8 md:flex-shrink-0">
                        <img
                            className="h-32 w-32 object-cover rounded-lg shadow-lg"
                            src={imageUrl}
                            alt="Advertisement"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

AdvertisementBanner.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    buttonLink: PropTypes.string.isRequired,
};

export default AdvertisementBanner; 