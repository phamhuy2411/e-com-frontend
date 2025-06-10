import { memo } from "react";
import PropTypes from "prop-types";

const SkeletonItem = memo(({ width, flex, className = "" }) => (
  <div 
    className={`h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 ${width} ${flex} ${className}`}
    aria-hidden="true"
  />
));

SkeletonItem.propTypes = {
  width: PropTypes.string,
  flex: PropTypes.string,
  className: PropTypes.string,
};

SkeletonItem.displayName = 'SkeletonItem';

const Skeleton = memo(() => {
  return (
    <div 
      role="status" 
      className="space-y-2.5 animate-pulse w-full"
      aria-label="Loading content"
    >
      {Array.from({ length: 14 }).map((_, index) => (
        <div key={index} className="flex items-center w-full">
          {index % 3 === 0 ? (
            <>
              <SkeletonItem width="w-32" className="bg-gray-200 dark:bg-gray-700" />
              <SkeletonItem width="w-24" className="ms-2" />
              <SkeletonItem flex="flex-1" className="ms-2" />
            </>
          ) : index % 3 === 1 ? (
            <>
              <SkeletonItem flex="flex-1" className="bg-gray-200 dark:bg-gray-700" />
              <SkeletonItem flex="flex-1" className="ms-2" />
              <SkeletonItem width="w-24" className="ms-2" />
            </>
          ) : (
            <>
              <SkeletonItem flex="flex-1" />
              <SkeletonItem width="w-80" className="ms-2 bg-gray-200 dark:bg-gray-700" />
              <SkeletonItem flex="flex-1" className="ms-2" />
            </>
          )}
        </div>
      ))}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;