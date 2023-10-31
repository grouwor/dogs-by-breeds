import { createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import useDogList from '../hooks/useDogList';
import { ImageData } from '../services/DogAPI.service';

type DogListContextType = {
  /**
   * An array of dog breeds.
   */
  breeds: string[];
  /**
   * An array of sub-breeds.
   */
  subBreeds: string[];
  /**
   * The currently selected breed.
   */
  selectedBreed: string;
  /**
   * The currently selected sub-breed.
   */
  selectedSubBreed: string;
  /**
   * A function to handle the change of the selected breed.
   */
  handleBreedChange: Dispatch<SetStateAction<number>>;
  /**
   * A function to handle the change of the selected sub-breed.
   */
  handleSubBreedChange: Dispatch<SetStateAction<number>>;
  /**
   * The random image by breed.
   */
  randomImageByBreed: ImageData | null;
  /**
   * The random image by breed and sub-breed.
   */
  randomImageBySubBreed: ImageData | null;
  /**
   * An array of images by breed.
   */
  imagesByBreed: ImageData[];
  /**
   * An array of images by breed and sub-breed.
   */
  imagesBySubBreed: ImageData[];
  /**
   * Checks if a breed has sub-breeds.
   * @param breed - The breed to check.
   * @returns `true` if the breed has sub-breeds, `false` otherwise.
   */
  hasSubBreeds: (breed: string) => boolean;
}

/**
 * The context for dog list information.
 */
const DogListContext = createContext<DogListContextType | null>(null);

/**
 * The provider component for the DogListContext.
 * @param children - The children components.
 */
export function DogListProvider({ children }: { children: ReactNode }) {
  const dogsInfo = useDogList();

  return (
    <DogListContext.Provider value={dogsInfo}>
      {children}
    </DogListContext.Provider>
  );
}

export default DogListContext;