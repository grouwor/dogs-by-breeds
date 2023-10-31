import { useState, useEffect } from 'react';
import DogAPIService, { ImageData } from '../services/DogAPI.service';

/**
 * Custom React Hook for synchronizing with the Dog's API.
 * Features:
 * - Fetches data for breeds, sub-breeds, and images from the Dog's API.
 * - Tracks selected breed and sub-breed indices.
 * - Retrieves random images by breed and sub-breed.
 * - Manages lists of images by breed and sub-breed.
 * - Provides functions to handle breed and sub-breed changes.
 * @returns An object containing the necessary data and functions for the Dog List.
 */
export default function useDogList() {
  const [breedsMap, setBreedsMap] = useState<Map<string, string[]>>(new Map());
  const [selectedBreedIndex, setSelectedBreedIndex] = useState<number>(0);
  const [selectedSubBreedIndex, setSelectedSubBreedIndex] = useState<number>(0);
  const [randomImageByBreed, setRandomImageByBreed] = useState<ImageData | null>(null);
  const [randomImageBySubBreed, setRandomImageBySubBreed] = useState<ImageData | null>(null);
  const [imagesByBreed, setImagesByBreed] = useState<ImageData[]>([]);
  const [imagesBySubBreed, setImagesBySubBreed] = useState<ImageData[]>([]);

  const breeds = Array.from(breedsMap.keys());
  const selectedBreed = breeds[selectedBreedIndex] || '';
  const subBreeds = breedsMap.get(selectedBreed) || [];
  const selectedSubBreed = subBreeds[selectedSubBreedIndex] || '';

  /**
   * Checks if a breed has sub-breeds.
   * @param breed - The breed to check.
   * @returns `true` if the breed has sub-breeds, `false` otherwise.
   */
  const hasSubBreeds = (breed: string) => {
    return breedsMap.get(breed)!.length > 0 ?? false;
  };

  useEffect(() => {
    let loading = true;

    (async () => {
      try {
        const breedsData = await DogAPIService.getAllBreedsData();
        if (loading) {
          setBreedsMap(new Map(Object.entries(breedsData)));
        }
        // Process the data or update the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();

    return () => {
      loading = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedBreed) return;

    let loading = true;
    (async () => {
      try {
        const [randomImage, imagesByBreed] = await Promise.all([
          DogAPIService.getRandomImageByBreed(selectedBreed),
          DogAPIService.getImagesByBreed(selectedBreed),
        ]);

        if (loading) {
          setRandomImageByBreed(randomImage);
          setImagesByBreed(imagesByBreed);
          setSelectedSubBreedIndex(0);
        }
        // Process the data or update the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();

    return () => {
      loading = false;
    };
  }, [selectedBreed]);

  useEffect(() => {
    if (!selectedSubBreed) {
      setRandomImageBySubBreed(null);
      setImagesBySubBreed([]);
      return;
    }

    let loading = true;

    (async () => {
      try {
        const [randomImage, imagesBySubBreed] = await Promise.all([
          DogAPIService.getRandomImageBySubBreed(selectedBreed, selectedSubBreed),
          DogAPIService.getImagesBySubBreed(selectedBreed, selectedSubBreed),
        ]);

        if (loading) {
          setRandomImageBySubBreed(randomImage);
          setImagesBySubBreed(imagesBySubBreed);
        }
        // Process the data or update the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();

    return () => {
      loading = false;
    };
  }, [selectedSubBreed]);

  /**
   * Return the necessary data and functions.
   */
  return {
    breeds,
    subBreeds,
    selectedBreed,
    selectedSubBreed,
    handleBreedChange: setSelectedBreedIndex,
    handleSubBreedChange: setSelectedSubBreedIndex,
    randomImageByBreed,
    randomImageBySubBreed,
    imagesByBreed,
    imagesBySubBreed,
    hasSubBreeds,
  };
}