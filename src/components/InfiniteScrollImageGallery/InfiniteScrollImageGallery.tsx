import React, { useState, useEffect, useRef } from 'react';
import ImageCard from '../LazyImageCard/LazyImageCard';
import { ImageData } from '../../services/DogAPI.service';

type InfiniteScrollImageGalleryProps = {
  images: Array<ImageData>;
};

/**
 * Component for displaying an infinite scroll image gallery.
 *
 * @component
 * @param {InfiniteScrollImageGalleryProps} props - The props for the InfiniteImageScroll component.
 * @returns {React.ReactElement} The InfiniteImageScroll component.
 */
export default function InfiniteScrollImageGallery({ images }: InfiniteScrollImageGalleryProps): React.ReactElement {
  const [displayedImages, setDisplayedImages] = useState<Array<ImageData>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const counter = useRef<number>(2);

  useEffect(() => {
    const container = containerRef.current!;

    /**
     * Event handler for the scroll event on the container element.
     * Loads more images when the user reaches the bottom of the container.
     */
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setDisplayedImages((prevImages) =>
          prevImages.concat(images.slice(prevImages.length, prevImages.length + counter.current))
        );
      }
    };

    // Initial setup
    setDisplayedImages(images.slice(0, counter.current * 2));
    container.scrollTop = 0;

    // Add scroll event listener and clean up on component unmount
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [images]);

  return (
    <div
      className="image-container"
      ref={containerRef}
      style={displayedImages.length < 2 ? {
        justifyContent: 'space-around',
        alignItems: 'center',
      } : undefined
      }
    >
      {displayedImages.length === 0 ? (
        'No Images To Preview'
      ) : (
        displayedImages.map((image) => <ImageCard key={image.id} src={image.src}></ImageCard>)
      )}
    </div>
  );
}