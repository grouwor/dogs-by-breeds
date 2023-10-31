import React, { useContext } from 'react';
import Select from '../ui/Select/Select';
import InfiniteImageScroll from '../InfiniteScrollImageGallery/InfiniteScrollImageGallery';
import DogListContext from '../../contexts/DogListContext';
import ImageListSection from '../ImageListSection/ImageListSection';
import { ImageData } from '../../services/DogAPI.service';

type DogDashboardProps = {
  /**
   * The title of the dashboard.
   */
  title: string;
};

/**
 * A component that represents the dashboard for displaying dog images.
 *
 * @param {DogDashboardProps} props - The props for the DogDashboard component.
 * @returns {React.ReactElement} - The rendered DogDashboard component.
 */
const DogDashboard: React.FC<DogDashboardProps> = ({ title }) => {
  const {
    breeds,
    subBreeds,
    selectedBreed,
    selectedSubBreed,
    handleBreedChange,
    handleSubBreedChange,
    randomImageByBreed,
    randomImageBySubBreed,
    imagesByBreed,
    imagesBySubBreed,
    hasSubBreeds
  } = useContext(DogListContext)!;

  /**
   * Generates breed options for the Select component.
   */
  const breedsOptions = breeds.map(breed => ({
    label: breed.toUpperCase() + (hasSubBreeds(breed) ? ' *' : ''),
    value: breed
  }));

  /**
   * Generates sub-breed options for the Select component.
   */
  const subBreedOptions = subBreeds.map(breed => ({
    label: breed.toUpperCase(),
    value: breed
  }));

  /**
   * Helper function to generate the ImageListSection component with the InfiniteImageScroll component.
   */
  const generateImageSections = (title: string, images: ImageData[], numberOfImages: number) => (
    <ImageListSection title={title} numberOfImages={numberOfImages}>
      <InfiniteImageScroll images={images} />
    </ImageListSection>
  );

  return (
    <div className="container">
      {/* Dashboard header */}
      <h1 className="header">{title}</h1>

      {/* Select components for breed and sub-breed selection */}
      <div className="row">
        <Select label="Breed: " onChange={handleBreedChange} value={selectedBreed} options={breedsOptions}></Select>
        <Select label="Sub Breed: " onChange={handleSubBreedChange} value={selectedSubBreed} options={subBreedOptions}></Select>
      </div>

      {/* Random image sections */}
      <div className="row">
        {/* Random image by breed */}
        {generateImageSections('Random Image By Breed', randomImageByBreed ? [randomImageByBreed] : [], randomImageByBreed ? 1 : 0)}
        {/* Random image by breed and sub bree */}
        {generateImageSections('Random Image By Sub Breed', randomImageBySubBreed ? [randomImageBySubBreed] : [], randomImageBySubBreed ? 1 : 0)}
      </div>

      {/* Image List Sections */}
      <div className="row">
        {/* Images by breed */}
        {generateImageSections('Image List By Breed', imagesByBreed, imagesByBreed.length)}
        {/* Images by sub breed */}
        {generateImageSections('Image List By Sub Breed', imagesBySubBreed, imagesBySubBreed.length)}
      </div>
    </div>
  );
};

export default DogDashboard;