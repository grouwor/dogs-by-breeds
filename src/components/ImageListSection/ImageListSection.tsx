import React, { ReactElement } from "react";

type ImageListSectionProps = {
  /**
   * The title of the image section.
   */
  title: string;

  /**
   * The number of images in the section.
   */
  numberOfImages: number;

  /**
   * The child elements to be rendered inside the section.
   */
  children: ReactElement;
};

/**
 * A component that represents a section of images with a title and an optional count.
 *
 * @param {ImageListSectionProps} props - The props for the ImageListSection component.
 * @returns {React.ReactElement} - The rendered ImageListSection component.
 */
const ImageListSection: React.FC<ImageListSectionProps> = ({ title, numberOfImages, children }) => {
  return (
    <div className="breed-section row-item">
      {/* Title of the image section */}
      <div className="breed-title">
        {title} {numberOfImages > 1 && `(${numberOfImages})`}
      </div>

      {/* Images */}
      {children}
    </div>
  );
};

export default ImageListSection;