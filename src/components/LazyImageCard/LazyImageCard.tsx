import React, { useState } from 'react';
import DogImagePlaceholder from '../../assets/imgs/dog-placeholder.png';

type LazyImageCardProps = {
  /**
   * The URL of the image to be displayed.
   */
  src: string;
};

/**
 * A component that displays an image with a placeholder until the actual image has loaded.
 *
 * @param {LazyImageCardProps} props - The props for the LazyImageCard component.
 * @returns {React.ReactElement} - The rendered LazyImageCard component.
 */
const LazyImageCard: React.FC<LazyImageCardProps> = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Handles the image load event.
   */
  const handleLoad = () => {
    setIsLoading(false);
  };

  /**
   * Handles the image error event.
   */
  const handleError = () => {
    setIsLoading(true);
  };

  return (
    <div className='image-box'>
      {isLoading && (
        <img src={DogImagePlaceholder} alt="Loading placeholder" />
      )}
      <img
        src={src}
        style={{ display: isLoading ? 'none' : 'block' }}
        alt="Dog Image"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default LazyImageCard;